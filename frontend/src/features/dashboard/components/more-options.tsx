import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon, PenBoxIcon, Share2Icon, Trash2Icon } from "lucide-react"

export const MoreOptions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="size-4 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem>
                    <PenBoxIcon />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash2Icon />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Share2Icon />
                    Share
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}