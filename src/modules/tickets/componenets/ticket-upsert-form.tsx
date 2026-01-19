"use client"
import { useActionState, useRef } from 'react'
import { DatePicker, DatePickerRef } from '@/components/date-picker';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from '@/utils/currency';
import { Ticket } from "../../../../generated/prisma/client";
import { upsertTicket } from "../actions/upsert-ticket";

interface TicketUpsertFormProps {
    ticket?: Ticket
}

export const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)
    const datePickerRef = useRef<DatePickerRef>(null);

    const handleSuccess = () => {
        datePickerRef.current?.reset();
    }

    return (
        <Form
            action={action}
            actionState={actionState}
            onSuccess={handleSuccess}
        >
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={(actionState?.payload?.get('title') as string) ?? ticket?.title} />
            <FieldError actionState={actionState} name="title" />

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={(actionState.payload?.get('content') as string) ?? ticket?.content} />
            <FieldError actionState={actionState} name="content" />

            <div className='flex gap-x-2 mb-2'>
                <div>
                    <Label htmlFor="deadline">Deadline</Label>
                    <DatePicker
                        id="deadline"
                        name="deadline"
                        ref={datePickerRef}
                        defaultValue={
                            (actionState.payload?.get("deadline") as string) ??
                            ticket?.deadline
                        }
                    />
                    <FieldError actionState={actionState} name="deadline" />
                </div>

                <div>
                    <Label htmlFor="bounty">Bounty</Label>
                    <Input id="bounty" name="bounty" step="0.01" type="number" defaultValue={(actionState?.payload?.get('bounty') as string) ?? ticket?.bounty ? fromCent(ticket?.bounty ?? 0) : undefined} />
                    <FieldError actionState={actionState} name="bounty" />
                </div>

            </div>

            <SubmitButton label={ticket ? "Edit" : "Create"} />
        </Form>
    );
};
