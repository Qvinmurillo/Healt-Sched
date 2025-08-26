import { supabase } from '@/src/utils/supabase/index';
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import Dropdown from "../components/ui/CustomDropDown";
import ButtonSent from "../components/ui/GenericButton";
import GenericNavbar from "../components/ui/GenericNavbarGoback";
import LabelField from "../components/ui/LabelField";
import TextFiel from "../components/ui/TextField";


export default function AfiliacionScreen() {
const [nombre, setNombres] = useState('');
const [apellido, setApellidos] = useState('');
const [codigoter, setCodigoter] = useState('');
const [telefono, setTelefono] = useState('');
const [email, setEmail] = useState('');
const [IdType, setIdType] = useState<string | null>(null);
const [city, setCity] = useState<string | null>(null);

const idcard = [
    { label: 'Cédula de Ciudadania', value: 'C' },
    { label: 'Tarjeta de Identidad', value: 'T' },
    { label: 'Cédula de Extranjeria', value: 'E' },
    { label: 'Nit', value: 'N' },
    { label: 'Pasaporte', value: 'P' },
    { label: 'Registro Civil', value: 'R' },
  ];
  const citys = [
    { label: 'Cali', value: '76001'},
    { label: 'Bogotá', value: '11001'},
    { label: 'Medellín', value: '5001'},
    { label: 'Cartagena', value: '13001'},
    { label: 'Barranquilla', value: '8001'},
    { label: 'Valledupar', value: '20001'},
    { label: 'Manizales', value: '17001'},
    { label: 'Armenia', value: '63001'},
    { label: 'Pereira', value: '66001'},
  ];

   const handleSubmit = async () => {
    if (!nombre || !apellido || !IdType || !codigoter || !telefono || !email || !city) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const { error } = await supabase
      .from("sys_afiliaciones")
      .insert([
        {
          nombre,
          apellido,
          tipo_id: IdType,
          codigoter,
          telefono,
          email,
          ciudad: city,
        },
      ]);

    if (error) {
      console.error("Error al guardar:", error.message);
      alert("Hubo un error al guardar tus datos.");
    } else {
      alert("Afiliación registrada con éxito.");
      router.push('/sign-up');
    }
  };

  return (
    <View style={styles.screen}>
      {/* Navbar esta fijo */}
      <GenericNavbar
        title="AFÍLIATE"
        iconName="arrow.back"
        onPress={() => router.back()}
      />

      {/* Contenido scrolleable */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.scrollContent}>
          <Container>
            <LabelField label="NOMBRES *" />
            <TextFiel holder="Ingresa tus nombres" value={nombre} onChangeText={setNombres} />

            <LabelField label="APELLIDOS *" />
            <TextFiel holder="Ingresa tus apellidos" value={apellido} onChangeText={setApellidos} />

            <LabelField label="SELECCIONE EL TIPO DE IDENTIFICACIÓN *" />
            <Dropdown 
            options={idcard}
            selectedValue={IdType}
            onSelect={setIdType}
            />

            <LabelField label="INGRESA EL NUMERO DE IDENTIFICACIÓN *" />
            <TextFiel holder="Número de identificación" value={codigoter} onChangeText={setCodigoter} keyboardType="numeric"/>

            <LabelField label="TÉLEFONO *" />
            <TextFiel holder="Ingresa tu número de telefono" value={telefono} onChangeText={setTelefono} keyboardType="numeric" />

            <LabelField label="CORREO ELECTRÓNICO *" />
            <TextFiel holder="Ingresa tu correo" value={email} onChangeText={setEmail} />

            <LabelField label="CIUDAD *" />
            <Dropdown 
            options={citys}
            selectedValue={city}
            onSelect={setCity}
            />
          </Container>

      <View style={styles.finalContainer}>
        <Text style={styles.obilgatory}>Los campos marcados con * son obligatorios</ Text>

      </View>
      <View style={styles.btnSent}>
        <ButtonSent title="ENVIAR" onPress={handleSubmit} />
      </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 30,
    paddingTop: 100,
  },
  finalContainer: {
    padding: 14,

  },
  obilgatory:{
    fontSize: 10,
    fontWeight: 'bold'
  },
  btnSent:{
    padding: 40
  }
});
