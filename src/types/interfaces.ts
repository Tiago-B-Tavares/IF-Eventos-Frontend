export interface OrganizadorProps {
    organizador: {
        [x: string]: string;
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
    image?: File | null | string;
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
    nomeAtividade: string; 
    totalInscricoes: number;
  }
  
  export interface GroupedActivityStatistics {
    tipo: string; 
    nome: string; 
    quantidadeInscricoes: number; 
  }
  
  export interface MostPopularActivities {
    nome: string; 
    tipo: string;
    _count: {
      inscricoes: number;
    };
  }
  
  export interface ActivityTypeStats {
    tipo: string; 
    quantidade: number; 
  }
  
  export interface EventStatistics {
    activitiesByEvent: ActivityByEvent[]; 
    groupedActivityStatistics: GroupedActivityStatistics[]; 
    mostPopularActivities: MostPopularActivities[];
    activityTypeStats: ActivityTypeStats[]; 
  }
  