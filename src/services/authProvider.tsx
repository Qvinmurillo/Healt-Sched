import { supabase } from "@/src/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
  codigoter: string;
  tipo_id: string;
};

type AuthData = {
  loading: boolean;
  session: Session | null;     // Sesión Supabase
  appUser: AuthUser | null;    // Sesión custom
  isAuth: boolean;
  signInCustom: (u: AuthUser) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
  appUser: null,
  isAuth: false,
  signInCustom: async () => {},
  signOut: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [appUser, setAppUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        // Sesión desde supabase
        const { error, data } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          setSession(data.session);
          return;
        }

        // Sesión propia
        const raw = await AsyncStorage.getItem("app_session");
        if (raw) {
          const parsed: AuthUser = JSON.parse(raw);
          setAppUser(parsed);
        }
      } catch (err) {
        console.log("Auth bootstrap error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();

    // Llamada desde supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setLoading(false);

        if (session) {
          // Limpiar sesión custom si viene de supabase
          await AsyncStorage.removeItem("app_session");
          setAppUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signInCustom = async (u: AuthUser) => {
    await AsyncStorage.setItem("app_session", JSON.stringify(u));
    setAppUser(u);
    router.replace("/(auth)/(tabs)"); // entra directo al grupo de tabs
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error(err);
    }
    await AsyncStorage.removeItem("app_session");
    setAppUser(null);
    setSession(null);
    router.replace("/sign-in"); // salir al login
  };

  const isAuth = !!session || !!appUser;

  return (
    <AuthContext.Provider
      value={{ loading, session, appUser, isAuth, signInCustom, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
