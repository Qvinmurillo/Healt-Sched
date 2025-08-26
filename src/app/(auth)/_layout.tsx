import { useAuth } from "@/src/services/authProvider";
import { Redirect, Stack } from "expo-router";


//const isAuth = false;

const AuthLayout = () =>{
//Espera de autenticacion desde supabase

const {isAuth, loading} = useAuth();

if(loading) return null;
// Redirecciona al index.tsx que se encuentra a nivel de App
if(!isAuth) return <Redirect href="/sign-in" />

return (
    <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="not-found" />
    </Stack>
)};

export default AuthLayout;


