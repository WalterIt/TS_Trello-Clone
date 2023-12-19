'use client';

import { useAction } from "@/hooks/use-action";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "../ui/popover";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({ children, side = "bottom", align, sideOffset= 0 }: FormPopoverProps) => {
    const proModal = useProModal();
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const {execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            // console.log({data});
            toast.success("Board created successfully!");
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (error) => {
            toast.error(error);
            proModal.onOpen();
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        // console.log({image});

        execute({title, image});
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
                <PopoverClose ref={closeRef} asChild>
                    <Button
                      className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                      variant="ghost"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors} />
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