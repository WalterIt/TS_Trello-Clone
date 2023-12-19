'use client';

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export const ProModal = () => {
    const proModal = useProModal();

    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose} 
        >
            <DialogContent
                className="max-w-md p-0 overflow-hidden"
            >
                <div className="aspect-video relative flex-items-center justify-center">
                    <Image
                       src="/hero.svg"
                       alt="Hero"
                       className="object-cover"
                       fill
                    />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="text-xls font-bold">
                        Upgrade to Plannify Pro Today!
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the Best of Plannify.
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited Boards</li>
                            <li>Unlimited Teams</li>
                            <li>Unlimited Projects</li>
                            <li>Access to all Features</li>
                            <li>Admin and Security Features</li>
                            <li>And More!</li>

                        </ul>
                    </div>
                    <Button
                        className="w-full"
                        variant="primary"
                    >
                        Upgrade
                    </Button>
                </div>

            </DialogContent>

        </Dialog>
    )
}