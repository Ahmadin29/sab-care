import AsyncStorage from "@react-native-async-storage/async-storage";
import useUrl from "./useUrl";
import { Method } from "axios";
import {isObject} from 'lodash';

export class ApiEndpoint {
  _pathname: string;
  searchParams: URLSearchParams;

  constructor(pathname: string) {
    this._pathname = pathname;
    this.searchParams = new URLSearchParams();
  }

  get href() {
    return `${this._pathname}${
      this._pathname.includes("?") ? "&" : "?"
    }${this.searchParams.toString()}`;
  }
}

export async function useAPI(method: Method,endpoint: string, parameters?: any,headersParams?:any) {

  let headers = {
    ...headersParams,
  }

  const session:any = await AsyncStorage.getItem('session');
  const token = JSON.parse(session)?.access_token
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const urlParams:{endpoint:string,parameters?:any} = {
    endpoint,
  }

  if (method !== 'POST') {
    urlParams['parameters'] = parameters;
  }

  let data:any

  if (method === 'POST') {
    data = new FormData();
    Object.keys(parameters).forEach(key=>{
      data.append(key,parameters[key])
    })
  }else if (method === 'PATCH') {
    data = JSON.stringify(parameters)
  }

  const url = useUrl(urlParams);

  try {
    console.debug('API-REQUEST',method,url,parameters,'\n');
    const res = await fetch(url, {
      headers: headers,
      method: method || 'GET',
      body:['POST','PATCH'].includes(method) ? data : undefined,
    });

    const response = await res.json();
    
    if (response.status !== 'success') {
      throw response
    }
    // console.info('API-RESPONSE',response,'\n');
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
  const token = JSON.parse(session)?.access_token;
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = useUrl({
    endpoint,
  });

  try {
    // console.debug('API-REQUEST',url,parameters,'\n');

    const res = await fetch(url, {
      headers,
    });
    const response = await res.json();
    
    if (response.status !== 'success') {
      throw new Error(JSON.stringify(response))
    }
    
    // console.info('API-RESPONSE',response);
    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}
