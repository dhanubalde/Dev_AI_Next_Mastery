"use client"
import {useCompletion} from "ai/react"
import ChatHeader from "@/components/chatHeader";
import { Companion, Message } from "@prisma/client"
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface ChatClientProps { 
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number
    }
  }

}

const ChatClient = ({ companion }: ChatClientProps) => {
  
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion.messages)
  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish(prompt, completion) {
      const systemMessage = {
        role: "system",
        content: completion,
      };
      
      setMessages((current) => [...current, systemMessage]);
      setInput("");


      router.refresh();
    },
  })

  const omSubmit = (e: FormEvent<HTMLFormElement>) => { 
    const userMessage = {
      role: "user",
      content: input
    }

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4 text-lg">
      <ChatHeader companion={companion} />
      <div>
        Messages Todo
      </div>
    </div>
  )
}

export default ChatClient