import { cloneElement, useActionState, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form } from "./form/form";
import { SubmitButton } from "./form/submit-button";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/to-action-state";

type UseConfirmDialogProps = {
    title?: string;
    description?: string;
    action: () => Promise<ActionState>;
    trigger: React.ReactElement;
};

const useConfirmDialog = ({
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. Make sure you understand the consequences.",
    action,
    trigger,
}: UseConfirmDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dialogButton = cloneElement<any>(trigger, {
        onClick: () => { setIsOpen(state => !state) }
    })

    const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

    const handleSuccess = () => {
        setIsOpen(false);
    };

    const deleteDialog = (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Form
                            action={formAction}
                            actionState={actionState}
                            onSuccess={handleSuccess}
                        >
                            <SubmitButton label="Confirm" />
                        </Form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return {
        dialogButton, deleteDialog
    }
};

export { useConfirmDialog };