"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "../actions/sing-up";

export const SignUpForm = () => {
    const [actionState, signUpAction] = useActionState(signUp, EMPTY_ACTION_STATE)


    return (
        <Form actionState={actionState!} action={signUpAction}>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="Your username" defaultValue={(actionState?.payload?.get('username') as string) ?? ''} />
            <FieldError actionState={actionState} name="username" />

            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="test@example.pl" defaultValue={(actionState?.payload?.get('email') as string) ?? ''} />
            <FieldError actionState={actionState} name="email" />

            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="*****" type="password" defaultValue={(actionState?.payload?.get('password') as string) ?? ''} />
            <FieldError actionState={actionState} name="password" />

            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input id="confirm-password" name="confirmPassword" placeholder="*****" type="password" defaultValue={(actionState?.payload?.get('confirmPassword') as string) ?? ''} />
            <FieldError actionState={actionState} name="confirmPassword" />

            <SubmitButton label="Sign up" />
        </Form>
    )
}

