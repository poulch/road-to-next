import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button";

interface SubmitButtonProps {
    label: string
}

export const SubmitButton = ({ label }: SubmitButtonProps) => {
    const { pending } = useFormStatus();


    return (
        <Button type="submit">
            {pending && <LucideLoaderCircle className="w-4 h-4 animate-spin" />}
            {label}
        </Button>
    )
}