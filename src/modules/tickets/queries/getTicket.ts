import { initialTickets } from "@/data";
import { Ticket } from "../types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
    await new Promise(res => setTimeout(res, 2000));

    const maybeTicket = initialTickets.find(ticket => ticket.id === ticketId);

    return new Promise(res => {
        res(maybeTicket || null)
    })
}