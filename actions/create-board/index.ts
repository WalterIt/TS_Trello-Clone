'use server';

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data:InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return {
            error: 'Unauthorized'
        }
    }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
    ] = image.split("|");

    // console.log({
    //     imageId,
    //     imageThumbUrl,
    //     imageFullUrl,
    //     imageLinkHTML,
    //     imageUserName,
    // });

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: 'Missing Fields. Failed to create Board!'
        }
    }

    let board;

    try {
        // throw new Error('test');
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
            }
        })
    } catch (error) {
        return {
            error: 'Failed to create Board Title.'
        }
    }

    revalidatePath(`/board/${board.id}`);
    return {data: board};
    
}

export const createBoard = createSafeAction(CreateBoard, handler)