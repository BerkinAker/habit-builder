interface DashboardHeaderProps {
  heading: string,
  text?: string,
  children?: React.ReactNode
}
function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-3">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{heading}</h1>
        {text && <p className="text-xl text-muted-foreground">{text}</p>}
      </div>
      {children}
    </ div>
  )
}

export default DashboardHeader