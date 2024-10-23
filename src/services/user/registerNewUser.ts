import { api } from "@/services/setupApiClient";

interface DataRegister {
    nome: string;
    email: string;
    senha: string;
    googleId?: string | null ;
}

export default async function registerNewUser(data: DataRegister) {
    try {
        const response = await api.post("/user", data);
        
        return response.data;

    } catch (error: any) {
        
        throw new Error("Erro ao cadastrar um novo usuário", error.response?.data.error);
        
    }
}
