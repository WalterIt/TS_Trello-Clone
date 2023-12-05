import { headingFont } from "@/app/(marketing)/page"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"


export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                />
                <p className={cn("text-lg text-neutral-700 mt-[5px] ", headingFont.className)}>
                    Plannify
                </p>
            </div>
        </Link>
    )
}