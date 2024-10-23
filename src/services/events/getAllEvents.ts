
import { api } from "@/services/setupApiClient";


export default async function getAllEvents() {

    try {

        const response = await api.get(`/todos-eventos`)

        const listEvents = response.data;
        
        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
    
      

