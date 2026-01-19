"use server"
import { revalidatePath } from "next/cache";
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { TICKET_STATUS } from "../types";

export const updateTicketStatus = async (id: string, status: TICKET_STATUS) => {
    try {
        await prisma.ticket.update({
            where: {
                id
            },
            data: {
                status
            }
        })

        revalidatePath(ticketsPath())

        return toActionState("SUCCESS", "Status update")
    } catch (error) {
        return fromErrorToActionState(error)
    }
}