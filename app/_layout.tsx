import ErrorBoundary from '@/components/Error';
import Colors from '@/constants/Colors';
import useSession from '@/hooks/useSession';
import { useFonts } from 'expo-font';
import { Stack,router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const {account} = useSession();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (!account || account == null) {
        router.replace('/login')
      }
    }
  }, [account, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={style.container} >
      <ErrorBoundary>
        <StatusBar translucent={false} backgroundColor={Colors.primary} style='light' />
        <Stack>
          <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
      </ErrorBoundary>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex:1,
  }
})
