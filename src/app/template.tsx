import { ReactNode } from "react";
import { RedirectToast } from "@/components/redirect-toast";

interface RootTemplateProps {
    children: ReactNode
}

export default function RootTemplate({ children }: RootTemplateProps) {
    return (
        <>
            {children}
            <RedirectToast />
        </>
    )
}