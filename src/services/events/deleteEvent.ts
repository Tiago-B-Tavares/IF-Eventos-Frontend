
import { api } from "@/services/setupApiClient";


export default async function deleteEvent(id:string) {


    try {
        
        
        const response = await api.delete(`/evento?id=${id}`)
        
        const evento = response.data;

        console.log(evento);
        return evento;

    } catch (error) {
        console.log(error);
        
    }
}
   
      
      

