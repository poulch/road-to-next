import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
    action: (payload: FormData) => void;
    onSuccess?: () => void;
    onError?: () => void;
    actionState: ActionState;
    children: React.ReactNode;
};

const Form = ({ action, actionState, children, onError, onSuccess }: FormProps) => {
    useActionFeedback(actionState, {
        onSuccess: ({ actionState }) => {
            if (actionState.message) {
                toast.success(actionState.message);
            }

            onSuccess?.()
        },
        onError: ({ actionState }) => {
            if (actionState.message) {
                toast.error(actionState.message);
            }

            onError?.()
        },
    });

    return (
        <form action={action} className="flex flex-col gap-y-2">
            {children}
        </form>
    );
};

export { Form };