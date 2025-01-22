
import { api } from "../../setupApiClient";


export default async function DeleteColabAtividade(
    { organizador_id, atividade_id }: { organizador_id: string, atividade_id: string }) {

    try {
        const response = await api.delete(`/colaborador-atividade?atividade=${atividade_id}&organizador=${organizador_id}`, {
        });

        return response.status;

    } catch (error) {

        console.error("Erro ao remover colaborador:", error);
        return null;

    
    }
}
