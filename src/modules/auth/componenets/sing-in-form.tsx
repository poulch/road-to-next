"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "../actions/sign-in";

export const SignInForm = () => {
    const [actionState, signUpAction] = useActionState(signIn, EMPTY_ACTION_STATE)


    return (
        <Form actionState={actionState!} action={signUpAction}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="test@example.pl" defaultValue={(actionState?.payload?.get('email') as string) ?? ''} />
            <FieldError actionState={actionState} name="email" />

            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="*****" type="password" defaultValue={(actionState?.payload?.get('password') as string) ?? ''} />
            <FieldError actionState={actionState} name="password" />

            <SubmitButton label="Sign up" />
        </Form>
    )
}

