'use client'

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface InputProps {
    errors?: {
        title?: string[]
    };
}
export const FormInput = ({ errors }: InputProps) => {
    const { pending } = useFormStatus();

    return (
        <div className="">
            <Input 
                id="title" 
                name="title" 
                required 
                placeholder="Enter a Board Title." 
                disabled={pending}
            />
            {errors?.title ? (
                <div>
                    {errors.title.map((error: string) => (
                        <p key={error} className="text-rose-500">
                            {error}
                        </p>
                        ) ) }
                </div>
                ) : null
            }

        </div>

    )
}