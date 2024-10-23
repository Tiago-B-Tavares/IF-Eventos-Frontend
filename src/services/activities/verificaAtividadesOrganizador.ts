import { api } from "../setupApiClient";

export default async function VerificaAtividadesOrganizador(id:string) {
    try {
        const response = await api.get(`/hasAtividades?id=${id}`, {
           
        })
        return response.data

    } catch (error) {
        console.log("de ruim ", Response);

    }
}