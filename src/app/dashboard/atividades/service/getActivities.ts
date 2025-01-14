
import { api } from "@/services/setupApiClient";


export default async function getActivities(id: string) {

    try {

        const response = await api.get(`/evento/atividades?evento_id=${id}`)

        const activities = response.data;
      
        return activities;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}




