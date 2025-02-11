import { api } from "@/services/setupApiClient";

interface UpdateUserDataParams {
  id: string;
  data: any;
}

export default async function UpdateUserData({ id, data }: UpdateUserDataParams) {
    console.log("api: ", id, data);
    
    try {
        const response = await api.put(`/user?id=${id}`, data);
        

        return response.data;

    } catch (error: any) {
        throw new Error(`Erro ao atualizar usuário: ${error.response?.data?.error || error.message}`);
    }
}
