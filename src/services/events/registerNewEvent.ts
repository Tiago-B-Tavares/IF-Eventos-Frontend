import { TypesEventsProps } from "@/types/interfaces";
import { api } from "../setupApiClient";

export default async function RegisterEvent({
    organizador_id, nome, horario, descricao, local, image, dataInicio, dataFim
}: TypesEventsProps) {

    try {
        // Cria um novo FormData
        const formData = new FormData();
        formData.append("organizador_id", organizador_id || "");
        formData.append("nome", nome);
        formData.append("horario", horario);
        formData.append("descricao", descricao);
        formData.append("local", local);
        formData.append("dataInicio", dataInicio);
        formData.append("dataFim", dataFim);

        if (image) {
            formData.append("file", image);  // adiciona a imagem ao FormData
        }

        // Envia o FormData com o cabeçalho 'multipart/form-data'
        const response = await api.post("/eventos", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log("Evento registrado com sucesso", response.data);
        return response.data;

    } catch (error) {
        console.error("Erro ao registrar evento:", error);
        throw error; // Para capturar o erro corretamente no frontend
    }
}
