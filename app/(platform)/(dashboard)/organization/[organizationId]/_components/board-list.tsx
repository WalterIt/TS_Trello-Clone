'use server';

import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getAvailableBoards } from "@/lib/org-limit";


export const BoardList = async () => {
    const { orgId } = auth();

    if (!orgId) redirect("/select-org");

    const boards = await db.board.findMany({
        where: { orgId, },
        orderBy: { createdAt: 'desc' },
    })

    const availableBoards = await getAvailableBoards();

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="w-6 h-6 mr-2" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {boards.map((board) => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        style={{
                            backgroundImage: `url(${board.imageThumbUrl})`,
                        }}
                        className="w-full group aspect-video relative bg-no-repeat bg-center bg-cover bg-sky-700 h-full  rounded-sm p-2 overflow-hidden "
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                            <p className="relative font-semibold text-white">
                                {board.title}
                            </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right" >
                    <div role="button" className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition ">
                        <p className="text-sm">
                            Create New Board
                        </p>
                        <span className="text-xs">
                            {`${MAX_FREE_BOARDS - availableBoards} remaining!`}
                        </span>
                        <Hint
                        sideOffset={40}
                        description={`
                            Free Workspaces can have up to 5 boards. For unlimited boards, upgrade this Workspace.
                        `}
                        >
                            <HelpCircle className=" absolute bottom-2 right-2 w-[14px] h-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
                <Skeleton className="w-full h-full aspect-video p-2 " />
            </div>
    )
}