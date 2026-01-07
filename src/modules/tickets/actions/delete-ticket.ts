"use server";

import { redirect } from 'next/navigation';
import { setCookieByKey } from '@/actions/cookies';
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths';
import { cookieKeys } from '@/types';


export const deleteTicket = async (ticketId: string) => {
    await prisma.ticket.delete({
        where: {
            id: ticketId
        }
    })

    await setCookieByKey(cookieKeys.TOAST, 'Cookie deleted!')
    redirect(ticketsPath())
}