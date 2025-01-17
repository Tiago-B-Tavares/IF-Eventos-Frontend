import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';

export function setupApiClient() {


  const apiConfig = axios.create({
    baseURL: 'http://localhost:3333',
  });

  apiConfig.interceptors.response.use(response => {
    
    
    return response;
  }, (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        signOut();
      } else {
        return Promise.reject("Erro ao tentar autenticar o token"); 
      }
    }
    return Promise.reject(error); 
  });

  return apiConfig; 
}
