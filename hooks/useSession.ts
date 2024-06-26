import { accountModel } from "@/models/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mutate } from "swr";

export default function useSession() {

  const [account,setAccount] = useState<any>();

  const getAccount = useCallback(async () => {
    const session:any = await AsyncStorage.getItem("session");
    setAccount(accountModel(JSON.parse(session)))
    return accountModel(JSON.parse(session))
  }, []);

  const onLoggedOut = useCallback(() => {
    setSession(null);
    mutate((key:any) =>
      key[0].startsWith('/api'),
      undefined,
      {
        revalidate:true,
      }
    ).then(()=>{
      router.replace("/login");
    })
  }, []);

  const setSession = useCallback((session: any) => {
    const data = JSON.stringify(session);
    AsyncStorage.setItem("session", data);
  }, []);

  useEffect(()=>{
    getAccount()
  },[])

  return {
    account,
    getAccount,
    setSession,
    onLoggedOut,
  };
}
