import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function useSession() {
  const [account, setAccount] = useState<any>();

  const getAccount = useCallback(async () => {
    const session = await AsyncStorage.getItem("session");
    setAccount(session);
  }, []);

  const onLoggedIn = useCallback(() => {}, []);
  const onLoggedOut = useCallback(() => {
    setSession(null);
    router.replace("/login");
  }, []);

  const setSession = useCallback((session: any) => {
    const data = JSON.stringify(session);
    AsyncStorage.setItem("session", data);
  }, []);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  return {
    account,
    setSession,
    onLoggedOut,
  };
}
