import { TypesEventsProps } from "@/types/interfaces";
import { api } from "../setupApiClient";

export default async function editEvent({ id, nome, horario, descricao, local, dataInicio, dataFim }: TypesEventsProps) {


    try {


        const response = await api.put(`/evento?id=${id}`, {
         
            nome,
            horario,
            descricao,
            local,
            dataInicio,
            dataFim
        });

        return response.data;

    } catch (error) {
        console.error("Erro ao editar evento:", error);
        throw error; 
    
    }
}
