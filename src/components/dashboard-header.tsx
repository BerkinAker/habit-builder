interface DashboardHeaderProps {
  heading: string,
  text?: string,
  children?: React.ReactNode
}
function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div>dashboard-header</div>
  )
}

export default DashboardHeader