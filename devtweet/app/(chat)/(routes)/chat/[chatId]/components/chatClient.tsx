"use client"

import ChatHeader from "@/components/chatHeader";
import { Companion, Message } from "@prisma/client"

interface ChatClientProps { 
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number
    }
  }

}

const ChatClient = ({companion}: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-4 text-lg">
      <ChatHeader companion={companion} />
    </div>
  )
}

export default ChatClient