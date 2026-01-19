"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'
import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths";
import { cookieKeys } from "@/types";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    bounty: z.coerce.number().positive()
})

export const upsertTicket = async (ticketId: string | undefined,
    _actionState: ActionState,
    formData: FormData) => {
    const title = formData.get('title')
    const content = formData.get('content')
    const deadline = formData.get('deadline')
    const bounty = formData.get('bounty')

    try {
        const data = upsertTicketSchema.parse({
            title: title as string,
            content: content as string,
            deadline: deadline as string,
            bounty: bounty,
        })

        const dbData = {
            ...data,
            bounty: toCent(data.bounty),
        }

        await prisma.ticket.upsert({
            "where": {
                "id": ticketId || ""
            },
            create: dbData,
            update: dbData
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