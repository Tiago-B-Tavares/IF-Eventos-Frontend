
import { api } from "../../setupApiClient";


export default async function DeleteColabEvento(
    { organizador_id, evento_id }: { organizador_id: string, evento_id: string }) {

    try {
        const response = await api.delete(`/colaborador-evento?evento=${evento_id}&organizador=${organizador_id}`, {
        });

        return response.status;

    } catch (error) {

        console.error("Erro ao remover colaborador:", error);
        return null;

    
    }
}
