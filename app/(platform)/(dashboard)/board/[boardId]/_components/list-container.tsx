import { ListWithCards } from "@/types"

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string
}

export const ListContainer = ({ data, boardId}: ListContainerProps) => {

    return (
        <div className="">
            List Container
        </div>
    )
}