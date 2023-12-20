"use client"

import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions} from "ai"


interface ChatFormProps { 
  isLoading: boolean;
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>, chatRequetOptions?: ChatRequestOptions | undefined) => void;
}

const ChatForm = ({
  isLoading,
  input,
  handleInputChange,
  onSubmit

 }: ChatFormProps) => {
  return (
    <div>ChatForm</div>
  )
}

export default ChatForm