import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export default function useSession() {
  const [account, setAccount] = useState<any>();

  const getAccount = useCallback(async () => {
    const session = await AsyncStorage.getItem("session");
    setAccount(session);
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
  };
}
