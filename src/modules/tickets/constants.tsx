
import { LucideCheckCircle, LucideFileText, LucidePencil } from "lucide-react";
import { ReactNode } from "react";
import { TICKET_STATUS } from "./types"

export const TICKET_ICONS: Record<TICKET_STATUS, ReactNode> = {
    OPEN: <LucideFileText />,
    DONE: <LucideCheckCircle />,
    IN_PROGRESS: <LucidePencil />,
};


export const TICKET_LABELS: Record<TICKET_STATUS, string> = {
    OPEN: "Open",
    DONE: "Complete",
    IN_PROGRESS: "In progress"
}