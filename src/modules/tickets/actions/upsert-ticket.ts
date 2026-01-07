"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'
import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths";
import { cookieKeys } from "@/types";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024)
})

export const upsertTicket = async (ticketId: string | undefined,
    _actionState: ActionState,
    formData: FormData) => {
    const title = formData.get('title')
    const content = formData.get('content')

    try {
        const data = upsertTicketSchema.parse({
            title: title as string,
            content: content as string,
        })

        await prisma.ticket.upsert({
            "where": {
                "id": ticketId || ""
            },
            create: data,
            update: data
        })
    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    revalidatePath(ticketsPath())

    if (ticketId) {
        await setCookieByKey(cookieKeys.TOAST, 'Cookie updated!')
        redirect(ticketsPath())
    }

    return toActionState('SUCCESS', 'Ticket created!')
}