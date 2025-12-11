export const homePath = () => '/' as const;
export const ticketsPath = () => '/tickets' as const;
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}` as const;
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit` as const