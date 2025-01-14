import { TypesEventsProps } from "@/types/interfaces";
import { api } from "../setupApiClient";

export default async function editEvent({ id, nome, horario, descricao, local, dataInicio, dataFim, image }: TypesEventsProps) {


    try {
        const formData = new FormData();
        if (id) {
            formData.append("id", id);
        }
       const validImage = image instanceof File ? image : null;
        if (validImage) {
            formData.append("file", validImage);
        }
        formData.append("nome", nome);
        formData.append("horario", horario);
        formData.append("descricao", descricao);
        formData.append("local", local);
        formData.append("dataInicio", dataInicio);
        formData.append("dataFim", dataFim);
        console.log("serviço: ",id, nome, horario, descricao, local, dataInicio, dataFim, image);
     
         
        const response = await api.put(`/eventos?id=${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;

    } catch (error) {
        console.error("Erro ao editar evento:", error);
        throw error;

    }
}
