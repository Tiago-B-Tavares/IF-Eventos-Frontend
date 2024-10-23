import { api } from "@/services/setupApiClient";


interface DataUserProps {
    exists: boolean;
    id: string;
    googleId: string;
    role: string;
}

export default async function getUserDataByEmail(email: string): Promise<DataUserProps> {

    try {
        const response = await api.post(`/check-email?email=${email}`);

        const { exists, id, googleId, role } = response.data;
        const userData = { exists, id, googleId, role }
        return userData;

    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw new Error('Erro ao obter dados do usuário');
    }
}
