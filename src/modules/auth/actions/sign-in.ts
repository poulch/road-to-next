"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";


const singInSchema = z.object({
    email: z.email(),
    password: z.string().min(1).max(191)
})


export const signIn = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email, password } = singInSchema.parse(Object.fromEntries(formData))

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return toActionState("ERROR", "Can find user for given email")
        }

        const isPasswordValid = await verify(user.passwordHash, password)

        if (!isPasswordValid) {
            return toActionState("ERROR", "Password is invalid")
        }

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = await lucia.createSessionCookie(session.id)
        const allCookies = await cookies()

        allCookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    redirect(ticketsPath())
}