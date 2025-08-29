# 📱 Health-Sched App

Aplicación móvil construida con **React Native Expo + Supabase** para la gestión de **Citas médicas**.  

<p align="center">
<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmIzdzRoa2lpZnBqZHl3OW1oMmdoZ3NibTBhdG9zMW94Y3Y0aG8xNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WL6gYh5txUx8wNNwYr/giphy.gif" width="200">
<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmYzNDVkamJ4OTcxZTltZ2dhbzc4ZjNlanI0eGF4aXQzOThpb2J5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gXc7a00Jvy1qC8dQLs/giphy.gif" width="200">
</p>
## ✨ Características

- 📋 Registro e inicio de sesión con Supabase (Auth).  
- 🗓️ Gestión de **Citas médicas** con guardado en **AsyncStorage** (local).  
- 📌 Sección de **Radicados** con soporte para subir imágenes (ImagePicker).  
- 📅 **DateTimePicker** para seleccionar fecha y hora de la cita.  
- 🧑‍⚕️ Selección de **especialidades** mediante `Dropdown`.  
- 🪪 Tipos de documento con opciones predefinidas.  


---

## Inicia tu Proyecto

Instalacion de dependencias
```bash
npm install
# o
yarn install
```

Ejecucion
```bash
# con npm
npm run android

# con yarn
yarn android
```

---

## 🔑 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Supabase: [`Supabase-documentation`](https://supabase.com/docs) 

```bash
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```


Proyecto creado con [Expo](https://expo.dev) project created with [`expo-documentation`](https://docs.expo.dev).
