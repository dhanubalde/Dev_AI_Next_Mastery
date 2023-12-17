
"use client"

import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Poppins } from "next/font/google"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/hooks/use-Prop-Modal"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { MobileSidebar } from "./mobile-sidebar"

const font = Poppins({
  weight: "600", subsets: ["latin"]
});


interface NavbarProps { 
  isPro: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isPro,
}) => {

  const proModal = useProModal();

  return (
    <div className=" fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16 ">
      <div className="flex items-center">
        <MobileSidebar/>
        <Link href="/">
          <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary",
          font.className)}>
            devcore.ai
          </h1>
        </Link>   
      </div>

      <div className="flex items-center gap-x-5">
       
          <Button onClick={proModal.onOpen}
            size="sm" variant="premium">
            Upgrade
            <Sparkles className=" h- w-4 fill-white text-white ml-2"/>
          </Button>
      
          <ModeToggle/>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  )
}

export default Navbar