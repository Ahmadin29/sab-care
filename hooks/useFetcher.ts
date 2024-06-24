import AsyncStorage from "@react-native-async-storage/async-storage";
import useUrl from "./useUrl";
import { Method } from "axios";
import {isObject} from 'lodash'

export async function useAPI(method: Method,endpoint: string, parameters?: any,headers?:any) {

  // headers['Content-Type'] = 'multipart/form-data'

  const session:any = await AsyncStorage.getItem('session');
  if (session?.token) {
    headers['Authorization'] = session.token
  }

  const urlParams:{endpoint:string,parameters?:any} = {
    endpoint,
  }

  if (method !== 'POST') {
    urlParams['parameters'] = parameters;
  }

  const data = new FormData();

  if (method === 'POST') {
    Object.keys(parameters).forEach(key=>{
      data.append(key,parameters[key])
    })
  }

  const url = useUrl(urlParams);

  try {
    console.debug('API-REQUEST',method,url,parameters,'\n');
    const res = await fetch(url, {
      headers: headers,
      method: method || 'GET',
      body: data,
    });

    const response = await res.json();
    
    if (response.status !== 'success') {
      throw response
    }
    console.info('API-RESPONSE',response,'\n');
    return response;
  } catch (error: any) {
    let firstMessage = error.message;    

    if (isObject(error.message) && Object.keys(error.message).length > 0) {
      Object.keys(error.message).map((key,index)=>{
        if (index === 0) {
          firstMessage = error.message[key][0]
        }

        console.error(error.message[key][0]);
      })
    }else if(error.message){
      console.error(error.message,'\n');
    }else{
      console.error(error,'\n');
    }

    throw {...error,firstMessage} || "500";
  }
}

export default async function useFetcher(endpoint: string, parameters?: any) {

  const headers:any = {}

  const session:any = await AsyncStorage.getItem('session');
  if (session?.token) {
    headers['Authorization'] = `Bearer ${session.token}`
  }

  const url = useUrl({
    endpoint,
    parameters,
  });

  console.log(url);

  try {
    const res = await fetch(url, {
      headers,
    });
    const response = await res.json();
    
    if (response.status) {
      throw new Error(JSON.stringify(response))
    }
    
    console.info('API-RESPONSE',response);
    return response;
  } catch (error: any) {
    console.error(error);
    return error.status || "500";
  }
}
