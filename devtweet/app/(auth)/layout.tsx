

interface layoutProps { 
    children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ 
    children
}) => {
  return (
    <div className=" flex flex-col items-center justify-center h-full gap-6">
          <h1 className="text-3xl font-bold">Devcore.Ai</h1>
          {children}
    </div>
  )
}

export default layout