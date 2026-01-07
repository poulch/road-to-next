export const cookieKeys = {
    TOAST: "TOAST"
} as const

export type COOKIE_KEYS = keyof typeof cookieKeys