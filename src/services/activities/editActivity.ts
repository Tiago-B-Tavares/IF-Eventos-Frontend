import { TipoAtividade } from "@/enums/activityTipe";
import { api } from "../setupApiClient";
interface AtividadesProps {
    id?: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    tipo: TipoAtividade;
    concomitante: boolean;
    ch: number;
}

export default async function EditActivity({ id, nome, horario, local, descricao, tipo, vagas, concomitante, ch }: AtividadesProps) {

    try {
        const response = await api.put(`/atividades?id=${id}`, {
            id, nome, horario, local, descricao, tipo, vagas, concomitante, ch
        })
        console.log(response);

    } catch (error) {
        console.log("de ruim ", Response);

    }
}