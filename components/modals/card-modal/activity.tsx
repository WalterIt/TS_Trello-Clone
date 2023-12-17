'use client';

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
    items: AuditLog[]
}

export const Activity = ({ items }: ActivityProps) => {

    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className=" w-5 h-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className=" font-semibold mb-2 text-neutral-700">
                    Activity
                </p>
                <ol className="mt-2 space-y-4">
                    {items.map((item) => (
                        <ActivityItem key={item.id} data={item} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

Activity.Skeleton = function ActivitySkeleton() {

    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="bg-neutral-300 w-6 h-6" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-300" />
                <Skeleton className="w-full h-10 bg-neutral-300" />
            </div>
        </div>
    )
}