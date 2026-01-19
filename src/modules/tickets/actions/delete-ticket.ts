"use server";

import { redirect } from 'next/navigation';
import { setCookieByKey } from '@/actions/cookies';
import { fromErrorToActionState } from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths';
import { cookieKeys } from '@/types';


export const deleteTicket = async (id: string) => {
    try {
        await prisma.ticket.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        return fromErrorToActionState(error);
    }

    await setCookieByKey(cookieKeys.TOAST, 'Cookie deleted!')
    redirect(ticketsPath())
}