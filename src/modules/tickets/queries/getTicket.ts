import { prisma } from "@/lib/prisma"

export const getTicket = async (ticketId: string) => {
    return prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    })
}