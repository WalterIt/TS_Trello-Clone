'use client';

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";

interface BoardOptionsProps {
    id: string
}

export const BoardOptions = ({id}: BoardOptionsProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                   className="w-auto h-auto p-2"
                   variant="transparent"
                >
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                   variant="ghost"
                   onClick={() => {}}
                   className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Delete this Board
                </Button>
            </PopoverContent>
        </Popover>
    )
}