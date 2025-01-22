
import { api } from "../../setupApiClient";
import axios from "axios";

export default async function CreateColabEvento(
    { organizador_id, evento_id }: { organizador_id: string, evento_id: string }) {

    try {
        const response = await api.post("/colaborador-evento", {
            organizador_id,
            evento_id
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
