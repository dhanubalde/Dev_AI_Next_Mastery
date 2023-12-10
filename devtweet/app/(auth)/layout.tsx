

interface layoutProps { 
    children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ 
    children
}) => {
  return (
    <div className=" flex items-center justify-center h-full">
          {children}
    </div>
  )
}

export default layout