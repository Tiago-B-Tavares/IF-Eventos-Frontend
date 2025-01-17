
import { api } from "@/services/setupApiClient";


export default async function deleteEvent(id:string) {


    try {
        
        
        const response = await api.delete(`/evento?id=${id}`)
        
        const evento = response.data;

    
        return evento.data;

    } catch (error) {
        console.log(error);
        
    }
}
   
      
      

