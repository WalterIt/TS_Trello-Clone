'use client';

import { ListWithCards } from "@/types"
import { ListForm } from "./list-form"
import { useEffect, useState } from "react"
import { ListItem } from "./list-item"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { toast } from "sonner";

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string
}

function  reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export const ListContainer = ({ data, boardId}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("List Reordered!")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Card Reordered!")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;
        
        if (!destination) return;

        // if dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return ;

        // if User moves a List
        if (type === "list") {
            const items = reorder(orderedData, source.index, destination.index)
              .map((item, index) => ({ ...item, order:index }));

            setOrderedData(items);

            executeUpdateListOrder({ boardId, items })
        }

        // if User moves a Card
        if (type === "card") {
            let newOrderedData = [...orderedData];

            // Get the source and the destionation list
            const sourceList = newOrderedData.find((list) => list.id === source.droppableId);
            const destinationList = newOrderedData.find((list) => list.id === destination.droppableId);

            if(!sourceList || !destinationList) return;

            // Check if card exists in the source list
            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            // Check if card exists on the destionation list
            if (!destinationList.cards) {
                destinationList.cards = [];
            }

            // Moving the card in the same List
            if(source.droppableId === destination.droppableId){
                const reorderedCards = reorder(sourceList.cards, source.index, destination.index);

                reorderedCards.forEach((card, index) => {
                    card.order = index;
                })

                sourceList.cards = reorderedCards;

                setOrderedData(newOrderedData);
                executeUpdateCardOrder({ boardId, items: reorderedCards })

            } else {
                // Moving the card from one list to another list
                // Remove the card from the source list
                const [removedCard] = sourceList.cards.splice(source.index, 1); 

                // Assign the new listId to the new moved Card
                removedCard.listId = destination.droppableId;

                // Add the card to the destionationlist
                destinationList.cards.splice(destination.index, 0, removedCard);

                sourceList.cards.forEach((card, index) => {
                    card.order = index;
                })

                // Update the order for each card in the destionation list
                destinationList.cards.forEach((card, index) => {
                    card.order = index;
                })

                setOrderedData(newOrderedData);

                executeUpdateCardOrder({ boardId, items: destinationList.cards })
            }
        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol {...provided.droppableProps} ref={provided.innerRef} className="flex gap-x-3 h-full">
                        {orderedData.map((list, index) => (
                            <ListItem key={list.id} index={index} data={list} />
                        ))}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shirink-0 w-1"/>
                    </ol>                    
                )}
            </Droppable>
        </DragDropContext>
    )
}