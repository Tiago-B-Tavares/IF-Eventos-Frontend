
import { api } from "@/services/setupApiClient";


export default async function getInscribeds(Atividade_id: string) {

    try {

        const response = await api.get(`/inscricoes?id=${Atividade_id}`)

        const listEvents = response.data;


        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
    
      

