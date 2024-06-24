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
  const {account} = useSession();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      onAppLoaded()
    }
  }, [account, loaded]);

  const onAppLoaded = useCallback(()=>{    
    if (!account || !account?.access_token) {
      router.replace('/login')
      return;
    }

    registerForPushNotificationsAsync().then(token=>{
      console.log(token);
    }).catch(e=>{
      console.log(e);
    })
  },[account])

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
