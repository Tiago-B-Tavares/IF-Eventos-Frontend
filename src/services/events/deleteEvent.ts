import { api } from "@/services/setupApiClient";

export default async function deleteEvent(id: string) {
  try {
    const response = await api.delete(`/evento?id=${id}`);
    return response.data; 
  } catch (error: any) {
    console.log("de ruim ", error);
    
    if (error.response) {
      return { status: error.response.status, message: error.response.data };
    }
    return { status: 500, message: "Erro inesperado ao deletar o evento" }; 
  }
}
