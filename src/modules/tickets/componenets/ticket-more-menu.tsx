"use client"

import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TICKET_LABELS } from '@/modules/tickets/constants'
import { Ticket } from "../../../../generated/prisma/browser";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS } from "../types";

type TicketMoreMenuProps = {
    ticket: Ticket;
    trigger: React.ReactElement;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {

    const { deleteDialog, dialogButton } = useConfirmDialog({
        action: deleteTicket.bind(null, ticket.id),
        trigger: (
            <DropdownMenuItem>
                <LucideTrash className="h-4 w-4" />
                <span>Delete</span>
            </DropdownMenuItem>
        ),
    });

    const handleStateUpdate = async (status: string) => {
        const updatePromise = updateTicketStatus(ticket.id, status as TICKET_STATUS)

        toast.promise(updatePromise, {
            loading: "Updating status..."
        })

        const result = await updatePromise

        if (result.status === "ERROR") {
            toast.error(result.message)
        } else if (result.status === "SUCCESS") {
            toast.success(result.message)
        }
    }


    const statusList =
        <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleStateUpdate}>
            {Object.keys(TICKET_LABELS).map(key => (
                <DropdownMenuRadioItem key={key} value={key}>
                    {TICKET_LABELS[key as TICKET_STATUS]}
                </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>

    return (
        <>
            {deleteDialog}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side="right">
                    {statusList}
                    <DropdownMenuSeparator />
                    {dialogButton}
                </DropdownMenuContent>
            </DropdownMenu></>
    );
};

export { TicketMoreMenu };
