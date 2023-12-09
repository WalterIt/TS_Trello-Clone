import { deleteBoard } from "@/actions/delete-board"
import { FormDeleteButton } from "./form-delete-button"

interface DeleteBoardProps {
    id: string
    title: string
}

export const Board = ({ title, id }: DeleteBoardProps) => {
    const deleteBoardWithId = deleteBoard.bind(null, id)

    return (
        <form action={deleteBoardWithId} className="flex items-center gap-x-2">
            <p>Board Title: {title}</p>
            <FormDeleteButton />
        </form>
    )
}