import { notFound } from "next/navigation";
import { TicketItem } from "@/modules/tickets/componenets/ticket-item";
import { getTicket } from "@/modules/tickets/queries/getTicket";

type TicketPageProps = {
    params: Promise<{
        ticketId: string;
    }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
    const { ticketId } = await params;
    const ticket = await getTicket(ticketId);

    if (!ticket) {
        notFound();
    }

    return (
        <div className="flex justify-center animate-fade-from-top">
            <TicketItem ticket={ticket} isDetail />
        </div>
    );
};

export default TicketPage;