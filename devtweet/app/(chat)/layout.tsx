

interface layoutProps { 
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({children}) => {
  return (
    <div className=" mx-auto max-w-4xl h-full w-full">
      {children}
    </div>
  ) 
}

export default layout