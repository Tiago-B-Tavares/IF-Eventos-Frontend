
import { api } from "@/services/setupApiClient";


export default async function getEventsAnalysis() {

    try {

        const response = await api.get("/eventos/estatisticas")

        const listEvents = response.data;

        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
    
      

