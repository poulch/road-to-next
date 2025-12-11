import { notFound } from 'next/navigation';
import { CardCompact } from '@/components/card-compact';
import { prisma } from '@/lib/prisma'
import { TicketUpsertForm } from '@/modules/tickets/componenets/ticket-upsert-form';

const TicketEditPage = async ({ params }: PageProps<'/tickets/[ticketId]/edit'>) => {
    const { ticketId } = await params;
    const ticket = await prisma.ticket.findUnique({
        where: {
            "id": ticketId
        }
    })

    if (!ticket) {
        notFound();
    }


    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <CardCompact
                title="Edit Ticket"
                description="Edit an existing ticket"
                className="w-full max-w-[420px] animate-fade-from-top"
                content={<TicketUpsertForm ticket={ticket} />}
            />
        </div>
    )
}

export default TicketEditPage