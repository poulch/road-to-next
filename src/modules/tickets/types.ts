
export const TICKET_STATUS = {
    DONE: "DONE",
    OPEN: "OPEN",
    IN_PROGRESS: "IN_PROGRESS"
}

export type TICKET_STATUS = keyof typeof TICKET_STATUS

export interface Ticket {
    id: string;
    title: string;
    content: string;
    status: TICKET_STATUS
}