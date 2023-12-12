'use client';

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "primary" | "destructive" | "outline" | "ghost" | "link" | "secondary";
}

export const FormSubmit = ({ children, disabled, className, variant = "primary" }: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
           disabled={disabled || pending}
           type="submit"
           variant={variant}
           size="sm"
           className={cn(className)}
        >
            {children}
        </Button>
    )
}