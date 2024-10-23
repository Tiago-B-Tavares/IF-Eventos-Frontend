import { Role } from "@/enums/permissionRoles";
import { api } from "../setupApiClient";

export default async function ChangePermissions({ id, role }: { id: string, role: Role }) {
    try {
        console.log('api: ', id, role); 

        const res = await api.put(`/permissions?id=${id}`, {
            
            role
        });

        return res.data;

    } catch (error: any) {
        console.error("Erro ao alterar permissões:", error?.response?.data || error.message); // Log detalhado do erro
        throw new Error(`Erro ao alterar permissões: ${error?.response?.data || error.message}`);
    }
}
