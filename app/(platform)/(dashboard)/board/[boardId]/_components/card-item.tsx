'use client';

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd"

interface CardItemProps {
    data: Card;
    index: number;
}


export const CardItem = ({ data, index}: CardItemProps) => {

    return (
        <Draggable index={index} draggableId={data.id}>
            {(provided) => (
                <div 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    className="truncate border-2 border-transparent hover:border-black/60 py-2 px-3 text-sm font-medium bg-white rounded-md shadow-sm"
                >
                    {data.title}
                </div>           
                
            )}
        </Draggable>
            )
}