import { TipoAtividade } from "@/enums/activityTipe";
import { api } from "@/services/setupApiClient";


interface ActivitiesProps {

    horario: String;
    data: String;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    concomitante: boolean;
    ch: number;
    tipo: TipoAtividade;
    evento_id: string | null;
    organizador_id: string | undefined;
}

export default async function CreateActivity({ nome, horario, local, data, descricao, vagas, concomitante, ch, tipo, evento_id, organizador_id }: ActivitiesProps) {


    try {



        if (evento_id) {

            const response = await api.post(`/atividades?id=${evento_id}`, {
                nome, horario, data, local, descricao, vagas, concomitante, ch, tipo, organizador_id
            });

            const activity = response.data;
            return activity;

        }
    } catch (error) {
        console.error('Erro ao cadastrar atividade:', error);
        throw new Error('Erro ao cadastrar atividade');
    }
}
