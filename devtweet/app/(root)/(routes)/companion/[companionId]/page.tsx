import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";



interface CompanionProps {
  params: {
    companionId: string;
  }
};


const page = async ({ params }: CompanionProps) => {
 
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    }
  }) 

  const categories = await prismadb.category.findMany();
  
  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    />
  )
}

export default page