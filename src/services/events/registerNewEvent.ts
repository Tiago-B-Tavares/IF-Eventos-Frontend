import { TypesEventsProps } from "@/types/interfaces";
import { api } from "../setupApiClient";

export default async function RegisterEvent(
    { organizador_id, nome, horario, descricao, local, dataInicio, dataFim }: TypesEventsProps) {


    try {


        const response = await api.post("/eventos", {
            organizador_id,
            nome,
            horario,
            descricao,
            local,
            dataInicio,
            dataFim
        });

        console.log("Evento registrado com sucesso", response.data);
        console.log("deu bom");
        return response.data;

    } catch (error) {
        console.error("Erro ao registrar evento:", error);
        throw error; // Para capturar o erro corretamente no frontend
    }
}
