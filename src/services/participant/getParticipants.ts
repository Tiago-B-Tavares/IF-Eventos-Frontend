
import { api } from "@/services/setupApiClient";


export default async function getParticipants() {

    try {

        const response = await api.get(`/app/user`)

        const listEvents = response.data;

        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
    
      

