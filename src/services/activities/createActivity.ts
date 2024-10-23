import { api } from "@/services/setupApiClient";
import { Session } from "inspector";

interface ActivitiesProps {

    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    concomitante: boolean;
    ch: number;
    evento_id: string | null;
    organizador_id: string | undefined;
}

export default async function CreateActivity({ nome, horario, local, descricao, vagas, concomitante, ch, evento_id, organizador_id }: ActivitiesProps) {
    console.log(nome," ", descricao, " ",local," ", horario, " ",vagas, " ",ch, " ",concomitante, " ",evento_id, " ",organizador_id);

    try {



        if (evento_id) {

            const response = await api.post(`/atividades?id=${evento_id}`, {
                nome, horario, local, descricao, vagas, concomitante, ch, organizador_id
            });

            const activity = response.data;
            return activity;

        }
    } catch (error) {
        console.error('Erro ao cadastrar atividade:', error);
        throw new Error('Erro ao cadastrar atividade');
    }
}
