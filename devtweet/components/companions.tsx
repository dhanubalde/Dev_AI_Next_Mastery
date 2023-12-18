"use client"

import { Companion } from "@prisma/client"
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";


interface CompanionsProps { 
  data: (Companion & {
    _count: {
      messages: number
    }
  })[];
}

const Companions = ({ data }: CompanionsProps) => {
  
  if (data.length === 0) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-max">
        <div className="relative w-[25rem] h-[25rem]">
          <Image
            fill
            alt="Empty"
            className=" grayscale"
            src="/empty.png"
          />
        </div>
        <p className="text-2xl font-semibold text-muted-foreground">
            No devcore found
          </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-10">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-36 h-36">
                <Image
                  alt="devcore"
                  src={item.src}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <p className="font-bold">
                {item.name}
              </p>
              <p className="text-xs">
                {item.description}
              </p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-muted-foreground">
              <p className=" lowercase">
              @{item.username}
              </p>
              <div className="flex items-center">
                <MessagesSquare className="w-4 h-4 mr-1" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default Companions