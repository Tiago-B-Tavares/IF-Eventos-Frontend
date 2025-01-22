import { api } from "@/services/setupApiClient";

export default async function getAllEvents() {
  try {
    const response = await api.get(`/todos-eventos`);
    const listEvents = response.data;

    const formattedEvents = listEvents.map((event: { horario: string | number | Date }) => {
      const date = new Date(event.horario);
      date.setHours(date.getHours() + 3);
      const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return {
        ...event,
        horario: formattedTime, 
      };
    });

 

    return formattedEvents; 

  } catch (error) {
    throw new Error("Erro ao obter lista de Eventos");
  }
}
