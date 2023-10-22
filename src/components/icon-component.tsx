import * as React from "react";
import Icon from "./icon"
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconComponentProps {
  name: keyof typeof dynamicIconImports
  size?: number
  strokeWidth?: number
  className?: string
}

const IconComponent = ({ name, size = 18, strokeWidth = 1.8, className }: IconComponentProps) => {
  return <Icon name={name} size={size} strokeWidth={strokeWidth} className={className} />

}

export default React.memo(IconComponent)
