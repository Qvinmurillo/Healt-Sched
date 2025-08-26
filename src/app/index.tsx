import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import BtnEntry from "../components/ui/BtnToEntry";
import BtnTab from "../components/ui/TabBarLog";


const HomeScreen = () => {
    return(
      <>
  <View style={styles.homeContainer}>
    <ParallaxScrollView
    headerBackgroundColor={{light: '#FFFFFF', dark: '#1D3D47'}}
    headerImage={
        <Image
        //source={require('@/assets/images/hero-section.png')}
        source={require('@/assets/images/hero-section.png')}
        style={styles.heroSection}
        />
    }>
   
    <View style={{ padding: 1 }}>
      <BtnEntry iconName="log.in" text="Inicia Sesión" subtext="Si ya cuentas con usuario y contraseña" onPress={() => router.push('/sign-in')}/>
    </View>

    <View style={{ padding: 1 }}>
      <BtnEntry iconName="regs.ter" text="Registrate" subtext="Si eres un nuevo afiliado o aún no cuentas con usuario y contraseña" onPress={() => router.push('/sign-up')}/>
    </View>

    </ParallaxScrollView>

    <View style={styles.tabBarContainer}>
      <BtnTab iconName="afil.create" title="Afiliaciones" onPress={()=> router.push('/afiliation')} />
      <BtnTab iconName="newspaper.fill" title="Noticias" onPress={() => router.push('/news')}/>
    </View>

</View>
    </>
    );
};

const styles = StyleSheet.create({
  homeContainer:{
    flex: 1,
  },
  heroSection: {
    height: 320,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
tabBarContainer: {
  flexDirection: 'row',
  height: 80,
  backgroundColor: '#417584',
  borderRadius: 5,
}


})

export default HomeScreen;