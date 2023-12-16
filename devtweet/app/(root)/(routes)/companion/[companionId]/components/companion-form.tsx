"use client"
import * as z from "zod"
import axios from "axios"
import { Category, Companion } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required."
  }),
  description: z.string().min(1, {
    message: "Description is required."
  }),
  instructions: z.string().min(200, {
    message: "Instruction required at least 200 charactar."
  }),
  seed: z.string().min(200, {
    message: "Seed required at least 200 charactars."
  }),
  src: z.string().min(1, {
    message: "Image is required."
  }),
  categoryId: z.string().min(200, {
    message: "Category is required."
  }),
})


interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}



const CompanionForm = ({
  initialData,
  categories
}: CompanionFormProps) => {
  const router = useRouter()
  const {toast
} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    }
  })


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        await axios.post("/api/companion", values);
      }
      toast({
        description: "Success.",
        duration: 3000,
      });

      router.refresh();
      router.push("/");
    } catch (error){
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    }
  }



  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 pb-10">
          <div className=" space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your Devcore 
              </p>
            </div>
            <Separator className="bg-primary/10"/>
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center items-center space-y-4">
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    value={field.value}
                    disabled={isLoading} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />  
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Elon Musk"
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Devcore will be name
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="CEO & co-founder of Tesla, SpaceX  "
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Devcore
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          value={category.id}
                          key={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">
                Configuration
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed instruction for AI Bahaviour
              </p>
            </div>
            <Separator className="bg-primary/10"/>
          </div>
          <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    Instructions
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={7}
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                    />
                  </FormControl>
                  <FormDescription>
                    Descride in detail your devcore backstory relevant details.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
          />
          <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    Example Conversation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={7}
                      disabled={isLoading}
                      placeholder={SEED_CHAT}
                    />
                  </FormControl>
                  <FormDescription>
                    Descride in detail your devcore backstory relevant details.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
          />
          
          <div className=" w-full flex justify-center"> 
            <Button>
              {initialData ? "Edit your devcore" : "Create your devcore"}
              <Wand2 className=" w-4 h-4 ml-2"/>
            </Button>
          </div>
        </form>
    </Form>
    </div>
  )
}

export default CompanionForm