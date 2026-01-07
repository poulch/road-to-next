"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { cookieKeys } from "@/types";

export const RedirectToast = () => {
    const pathname = usePathname();

    useEffect(() => {
        const checkCookies = async () => {
            const toastCookie = await getCookieByKey(cookieKeys.TOAST)

            console.log("toastCookie", toastCookie);


            if (toastCookie) {
                toast(toastCookie)
                await deleteCookieByKey(cookieKeys.TOAST)
            }
        }

        checkCookies()
    }, [pathname])

    return null;

}