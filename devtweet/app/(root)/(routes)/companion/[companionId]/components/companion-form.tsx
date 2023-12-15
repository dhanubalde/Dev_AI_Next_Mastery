"use client"
import * as z from "zod"
import { Category, Companion } from "@prisma/client"

interface CompanionFormProps { 
  initialData: Companion | null;
  categories: Category[]
}


const CompanionForm =({ categories,initialData}: CompanionFormProps) => {
  return (
    <div>CompanionForm</div>
  )
}

export default CompanionForm
