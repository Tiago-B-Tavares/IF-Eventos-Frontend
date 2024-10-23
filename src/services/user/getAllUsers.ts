import { api } from "@/services/setupApiClient";





export default async function getAllUsers() {

    try {
        const response = await api.get("/users");

      const allOrganizers = response.data

        return allOrganizers



    } catch (error) {

        throw new Error('Erro ao obter lista');
    }
}
