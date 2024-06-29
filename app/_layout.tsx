import ErrorBoundary from '@/components/Error';
import Colors from '@/constants/Colors';
import useSession from '@/hooks/useSession';
import { useFonts } from 'expo-font';
import { Stack,router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import usePushNotification from '@/hooks/usePushNotification';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const {registerForPushNotificationsAsync} = usePushNotification()
  const {getAccount} = useSession();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      onAppLoaded()
    }
  }, [loaded]);

  const onAppLoaded = useCallback(async()=>{  

    const account = await getAccount();    
    
    if (!account || !account?.access_token) {
      router.replace('/login')
      return;
    }

    registerForPushNotificationsAsync()
  },[getAccount])

  if (!loaded) {
    return null;
  }

  return (
    <View style={style.container} >
      <ErrorBoundary>
        <StatusBar translucent={false} backgroundColor={Colors.primary} style='light' />
        <Stack>
          <Stack.Screen name="index" options={{headerShown:false}} />

          <Stack.Screen name="technician/index" options={{title:'Teknisi',headerBackTitle:'Dashboard'}} />
          <Stack.Screen name="technician/[id]/edit" options={{title:'Ubah Teknisi'}} />
          <Stack.Screen name="technician/add" options={{title:'Tambahkan Teknisi'}} />

          <Stack.Screen name="installation/index" options={{title:'Tugas Pemasangan',headerBackTitle:'Kembali'}} />
          <Stack.Screen name="installation/request" options={{title:'Ajukan Pemasangan',headerBackTitle:'Kembali'}} />
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
