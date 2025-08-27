import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import Container from "../components/ui/Container";
import Dropdown from "../components/ui/CustomDropDown";
import ButtonRegister from "../components/ui/GenericButton";
import GenericNavbar from "../components/ui/GenericNavbarGoback";
import LabelField from "../components/ui/LabelField";
import TextFiel from "../components/ui/TextField";
import { useAuth } from "../services/authProvider";
import { supabase } from "../utils/supabase";


const SignIn = () => {
  const { signInCustom } = useAuth();
  const [IdType, setIdType] = useState<string | null>(null);
  const [codigoter, setCodigoter] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

    const idcard = [
    { label: 'Cédula de Ciudadania', value: 'C' },
    { label: 'Tarjeta de Identidad', value: 'T' },
    { label: 'Cédula de Extranjeria', value: 'E' },
    { label: 'Nit', value: 'N' },
    { label: 'Pasaporte', value: 'P' },
    { label: 'Registro Civil', value: 'R' },
  ];

  const handleSubmit = async () => {
    if (loading) return; 
    const _cod = codigoter.trim();
    const _pwd = password.trim();

    if (!IdType || !_cod || !_pwd ){
      alert("Completa los campos obligatorios");
      return;
    }
    if (!/^\d+$/.test(_cod)){
      alert("El número de identificación debe ser numérico.")
      return;
    }

      try{
    setLoading(true);

    // Verifica que exista el usuario
    const { data: user, error: errrUsu} = await supabase
    .from("sys_usuarios")
    .select("codigoter, tipo_id, password")
    .eq("codigoter", Number(_cod))
    .eq("tipo_id", IdType)
    .maybeSingle();

    if (errrUsu) throw errrUsu;
    if (!user){
      alert("Usuario no registrado");
      return;
    }

    if (user.password !== _pwd) {
      alert("Contraseña incorrecta");
      return;
    }

    await signInCustom({
      codigoter: String(user.codigoter),
      tipo_id: String(user.tipo_id),

    });
    
   } catch (error) {
    console.error(error);
    alert("Error al iniciar sesion. Intente de nuevo")
   }finally {
    setLoading(false);
   }
  }

    return(
      <>
        <View style={styles.screen}>
          <GenericNavbar
            title="REGISTRATE"
            iconName="arrow.back"
            onPress={() => router.back()}/>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

              <ScrollView style={styles.scrollContainer}>
                <Container>
                  <LabelField label="TIPO DE IDENTIFICACIÓN *" />
                  <Dropdown 
                   options={idcard}
                   selectedValue={IdType}
                   onSelect={setIdType}/>
                  
                  <LabelField label="NÚMERO DE IDENTIFICACION *" />
                  <TextFiel holder="Número de identificación" value={codigoter} onChangeText={setCodigoter} keyboardType="numeric" />
                  
                  <LabelField label="CONTRASEÑA*" />
                  <TextFiel holder="Ingresa una contraseña" value={password} onChangeText={setPassword} secureTextEntry={true}/>

                  <View>
                    <ButtonRegister title={loading ? "Ingresando..." : "INICIA SESIÓN"} onPress={handleSubmit} />
                  </View>
                </Container>
              </ScrollView>

          </KeyboardAvoidingView>

        </View>
      </>
    );
};

const styles = StyleSheet.create({
screen:{
  flex: 1
},
scrollContainer:{
  paddingTop: 100
},
})

export default SignIn;