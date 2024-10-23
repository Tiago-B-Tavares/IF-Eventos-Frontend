import { CreateColabProps } from "@/types/interfaces";
import { api } from "../setupApiClient";
import axios from "axios";

export default async function CreateColabAtividade(
    { organizador_id, atividade_id }: CreateColabProps) {

    try {
        const response = await api.post("/colaborador", {
            organizador_id,
            atividade_id
        });

        return response.data;

    } catch (error) {
      
        if (axios.isAxiosError(error)) {
            if (error.response) {
                
                console.error("Erro ao adicionar colaborador:", error);
            } else {
                console.error("Erro desconhecido:", error.message);
            }
        } else {
            console.error("Erro inesperado:", error);
        }

       
        return null;
    }
}
