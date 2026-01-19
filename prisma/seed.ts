import { prisma } from "@/lib/prisma"

export const tickets = [
    {
        title: "Ticket 1",
        content: "This is the first ticket from database.",
        status: "DONE" as const,
        deadline: new Date().toISOString().split('T')[0],
        bounty: 499, // 4.99$
    },
    {
        title: "Ticket 2",
        content: "This is the second ticket from database.",
        status: "OPEN" as const,
        deadline: new Date().toISOString().split('T')[0],
        bounty: 999, // 9.99$
    },
    {
        title: "Ticket 4",
        content: "This is the thirs ticket from database.",
        status: "IN_PROGRESS" as const,
        deadline: new Date().toISOString().split('T')[0],
        bounty: 1999, // 19.99$
    },
];

const seed = async () => {
    console.log("Starting seeding...")
    const t1 = performance.now();

    await prisma.ticket.deleteMany();
    await prisma.ticket.createMany({
        data: tickets
    })

    const t2 = performance.now();
    console.log(`Finished seeding in ${t2 - t1} ms`)
}

seed()