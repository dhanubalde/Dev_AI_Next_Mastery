"use client"

import { Companion } from "@prisma/client"
import ChatMessage, {ChatMessageProps} from "./chat-Message"
import { ElementRef, useEffect, useRef, useState } from "react"

interface ChatMessagesProps { 
  companion: Companion
  isLoading: boolean
  messages: ChatMessageProps[]
}


const ChatMessages = ({
  companion,
  isLoading,
  messages = [],
}: ChatMessagesProps) => {

  const scrollRef = useRef<ElementRef<"div">>(null)

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true: false
  )


  // delay loading state until it finishes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => { 
      clearTimeout(timeout)
    }
  }, [])
  

  //srcoll down all messages 
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth"
    })
  },[messages.length])


  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={ `Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={companion.src}
          
        />
      ))}

      {isLoading && (
        <ChatMessage
          role="system"
          src={companion.src}
          isLoading
        />
      )}
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatMessages