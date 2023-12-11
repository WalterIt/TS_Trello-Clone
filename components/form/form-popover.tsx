'use client';

import { useAction } from "@/hooks/use-action";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "../ui/popover";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({ children, side = "bottom", align, sideOffset= 0 }: FormPopoverProps) => {
    const {execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            // console.log({data});
            toast.success("Board created successfully!");
        },
        onError: (error) => {
            // console.log({error});
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({title});
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent side={side} align={align} sideOffset={sideOffset} className="w-80 pt-3">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose asChild>
                    <Button
                      className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                      variant="ghost"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board Title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                        <FormSubmit
                            className="w-full"
                        >
                            Create
                        </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}