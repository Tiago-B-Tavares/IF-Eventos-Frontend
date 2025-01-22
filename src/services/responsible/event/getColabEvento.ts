
import { api } from "../../setupApiClient";


export default async function GetColabEvento(
    {  evento_id }: { evento_id: string }) {


    try {
        const response = await api.get(`/colaborador-evento?evento=${evento_id}`, {
        });

    
     return    response.data;

    } catch (error) {

        console.error("Erro ao remover colaborador:", error);
        return null;

    
    }
}
