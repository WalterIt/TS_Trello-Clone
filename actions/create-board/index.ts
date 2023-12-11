'use server';

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data:InputType): Promise<ReturnType> => {
    const { userId } = auth();

    if(!userId) {
        return {
            error: 'Unauthorized'
        }
    }

    const { title } = data;

    let board;

    try {
        // throw new Error('test');
        board = await db.board.create({
            data: {
                title
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