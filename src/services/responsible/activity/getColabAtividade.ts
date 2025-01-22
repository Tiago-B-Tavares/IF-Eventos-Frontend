
import { api } from "../../setupApiClient";


export default async function GetColabAtividade(
    {  atividade_id }: { atividade_id: string }) {


    try {
        const response = await api.get(`/colaborador-atividade?atividade=${atividade_id}`, {
        });

    
     return    response.data;

    } catch (error) {

        console.error("Erro ao remover colaborador:", error);
        return null;

    
    }
}
