import { initialTickets } from "@/data"

export const getTickets = async () => {
    await new Promise(res => setTimeout(res, 2000))

    return initialTickets
}