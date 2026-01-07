import { flattenError, ZodError } from "zod";

export type FormErrors = Record<string, string>
export type ActionStatus = "SUCCESS" | "ERROR"
export type ActionState = {
    status?: ActionStatus,
    message: string,
    payload?: FormData,
    formErrors: Record<string, string[] | undefined>,
    timestamp: number
}

export const EMPTY_ACTION_STATE: ActionState = {
    message: '',
    formErrors: {},
    timestamp: Date.now()
}

export const fromErrorToActionState = (error: unknown, formData: FormData): ActionState => {
    if (error instanceof ZodError) {
        return {
            status: "ERROR",
            message: "",
            payload: formData,
            formErrors: flattenError(error).fieldErrors,
            timestamp: Date.now()
        }
    } else if (error instanceof Error) {
        return {
            status: "ERROR",
            message: error.message,
            payload: formData,
            formErrors: {},
            timestamp: Date.now()
        }
    } else {
        return {
            status: "ERROR",
            message: "An unknown errors occured!",
            payload: formData,
            formErrors: {},
            timestamp: Date.now()

        }
    }
}

export const toActionState = (status: ActionStatus, message: string): ActionState => ({
    status,
    message,
    formErrors: {},
    timestamp: Date.now(),
})