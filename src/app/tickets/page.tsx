"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { TicketItem } from "@/modules/tickets/componenets/ticket-item";
import { getTickets } from "@/modules/tickets/queries/getTickets";
import { Ticket } from "@/modules/tickets/types";


const TicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([])

    useEffect(() => {
        const fetchTickets = async () => {
            const res = await getTickets();
            setTickets(res)
        }

        fetchTickets();
    }, [])


    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title="Tickets" description="All your tickets at one place" />

            <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default TicketsPage;