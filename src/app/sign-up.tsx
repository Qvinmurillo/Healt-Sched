import { supabase } from '@/src/utils/supabase/index';
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import Dropdown from "../components/ui/CustomDropDown";
import ButtonRegister from "../components/ui/GenericButton";
import GenericNavbar from "../components/ui/GenericNavbarGoback";
import LabelField from "../components/ui/LabelField";
import TextFiel from "../components/ui/TextField";

export default function signUp () {
const [IdType, setIdType] = useState<string | null>(null);
const [codigoter, setCodigoter] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmEmail, setConfirmEmail] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
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
  const _email = email.trim().toLowerCase();
  const _confirmEmail = confirmEmail.trim().toLowerCase();
  const _cod = codigoter.trim();
  const _pwd = password.trim();
  const _pwd2 = confirmPassword.trim();

  if (!IdType || !_cod || !_email || !_confirmEmail || !_pwd || !_pwd2) {
    alert("Completa todos los campos obligatorios.");
    return;
  }
  if (!/^\d+$/.test(_cod)) {
    alert("El número de identificación debe ser numérico.");
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_email);
  if (!emailOk) {
    alert("Correo inválido.");
    return;
  }
  if (_email !== _confirmEmail) {
    alert("Los correos no coinciden.");
    return;
  }
  if (_pwd.length < 8) {
    alert("La contraseña debe tener mínimo 8 caracteres.");
    return;
  }
  if (_pwd !== _pwd2) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    setLoading(true);

    {/* Verifica que exista el afiliado */}
    const { data: afiliado, error: errAfi } = await supabase
      .from("sys_afiliaciones")
      .select("codigoter, tipo_id")
      .eq("codigoter", _cod)
      .eq("tipo_id", IdType)
      .maybeSingle();

    if (errAfi) throw errAfi;
    if (!afiliado) {
      alert("No encontramos una afiliación con ese tipo y número de identificación. Afíliate primero.");
      return;
    }

    {/* Verifica que no exista el usuario */}
    const { data: yaUser, error: errUser } = await supabase
      .from("sys_usuarios")
      .select("codigoter")
      .or(`codigoter.eq.${_cod},email.eq.${_email}`)
      .maybeSingle();

    if (errUser) throw errUser;
    if (yaUser) {
      alert("Ya existe un usuario registrado con ese documento o correo.");
      return;
    }

    {/* inserta los datos a la tabla */}
    const { error: insErr } = await supabase
      .from("sys_usuarios")
      .insert([
        {
          codigoter: _cod,
          tipo_id: IdType,
          email: _email,
          password: _pwd, //todo: hashear/encriptar en el futuro
        },
      ]);

    if (insErr) throw insErr;

    alert("¡Registro exitoso! Ya puedes iniciar sesión.");
    //router.push("/s");
  } catch (e: any) {
    console.error(e);
    alert("Ocurrió un error registrando. Intenta de nuevo.");
  } finally {
    setLoading(false);
  }
};


    return(
        <>
        <View style={styles.screen}>
          <GenericNavbar
          title="REGISTRATE"
          iconName="arrow.back"
          onPress={() => router.back()}/>
          
          <Container>
            <Text style={styles.text1}>
              Si eres nuevo afiliado o aún no cuentas con
            </Text>
            <Text style={styles.text2}>
              usuario o contraseña
            </Text>
          </Container>
          
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

              <ScrollView style={styles.scrollContent}>
                <Container>
                  <LabelField label="TIPO DE IDENTIFICACIÓN *" />
                  <Dropdown 
                  options={idcard}
                  selectedValue={IdType}
                  onSelect={setIdType}/>

                  <LabelField label="NÚMERO DE IDENTIFICACION *" />
                  <TextFiel holder="Número de identificación" value={codigoter} onChangeText={setCodigoter} keyboardType="numeric" />

                  <LabelField label="CORREO ELECTRÓNICO *" />
                  <TextFiel holder="Ingresa tu correo" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
                  <LabelField label="CONFIRMA TU CORREO ELECTRÓNICO *" />
                  <TextFiel holder="Cofirma tu correo" value={confirmEmail} onChangeText={setConfirmEmail} />

                  <LabelField label="CONTRASEÑA*" />
                  <TextFiel holder="Ingresa una contraseña" value={password} onChangeText={setPassword} secureTextEntry={true}/>
                  <LabelField label="VALIDA CONTRASEÑA *" />
                  <TextFiel holder="Confirma la contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>

                </Container>
 
                      <View style={styles.btnSent}>
                        <ButtonRegister title={loading ? "Registrando..." : "REGISTRARSE"} onPress={handleSubmit} />
                      </View>
              </ScrollView>

          </KeyboardAvoidingView>
        
        </View>
        </>
    )};

    const styles = StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: "#fff",
      },
      scrollContent:{

      },
      text1:{
        paddingTop: 90,
        fontSize: 12
      },
      text2:{
        fontSize: 12
      },
      btnSent:{
        padding: 40
      }
    });