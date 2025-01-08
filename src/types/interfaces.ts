export interface OrganizadorProps {
    organizador: {
        nome: string;
    }


}

export interface EventoProps {
    id?: string;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    banner: string;
    organizador_id: string;
    atividades: AtividadesProps[];
    organizadores: OrganizadorProps[]
}

export interface TypesEventsProps {
    id?: string;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    image?: File | null;
    organizador_id?: string;
}

export interface InscritosProps {
    participante: {
        nome: string;
        email: string;
      
    };
}

export interface AtividadesProps {
    id: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    eventoId: string;
    createdAt: string;
    concomitante: boolean;
    tipo: string;
    organizadores: OrganizadorProps[];
    inscricoes: InscritosProps[];
    qr_code_link: string;
    ch: number;
}

export interface CreateAtividadesProps {
    id?: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    eventoId: string;
    concomitante: boolean;
    ch: number;
}

export interface ParticipantesProps {
    id: string;
    nome: string;
    email: string;
    idade: number;
    sexo: "M" | "F";
}

export interface ActivitiesProps {
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    concomitante: boolean;
    ch: number;
    evento_id: string | null;
}

export interface CreateColabProps {
    organizador_id: string;
    atividade_id: string;
}

export interface User {
    id: string;
    nome: string;
    email: string;
    senha: string;
    createdAt: string;
    updatedAt: string;
    googleId: string | null;
    role: string;
}
export interface ActivityByEvent {
    nomeAtividade: string; // Nome da atividade
    totalInscricoes: number; // Contagem total de inscrições
  }
  
  export interface GroupedActivityStatistics {
    tipo: string; // Tipo da atividade
    nome: string; // Nome da atividade
    quantidadeInscricoes: number; // Contagem total de inscrições
  }
  
  export interface MostPopularActivities {
    nome: string; // Nome da atividade
    tipo: string; // Tipo da atividade
    _count: {
      inscricoes: number; // Quantidade de inscrições
    };
  }
  
  export interface ActivityTypeStats {
    tipo: string; // Tipo da atividade
    quantidade: number; // Quantidade de atividades desse tipo
  }
  
  export interface EventStatistics {
    activitiesByEvent: ActivityByEvent[]; // Lista de atividades por evento
    groupedActivityStatistics: GroupedActivityStatistics[]; // Estatísticas agrupadas por tipo
    mostPopularActivities: MostPopularActivities[]; // Top 5 atividades mais concorridas
    activityTypeStats: ActivityTypeStats[]; // Distribuição dos tipos de atividades
  }
  