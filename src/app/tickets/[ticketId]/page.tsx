const TicketPage = async ({ params }: PageProps<'/tickets/[ticketId]'>) => {
    const { ticketId } = await params;

    return <h3 className="text-3xl font-bold underline">Ticket {ticketId}</h3>;
};

export default TicketPage