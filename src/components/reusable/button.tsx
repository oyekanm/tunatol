import React from 'react'
import { Button as Buton } from "../ui/button"
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  clx?:string;
  size?: "default" | "sm" | "lg" | "icon" ;
  click?:any;
  type?: "submit" | "reset" | "button" | undefined
}

export default function Button({ text,variant,clx,size,click,type }: Props) {
  return (
    <Buton type={type}  onClick={click}  variant={variant} className={cn("primary-bg",clx) } size={size}>
      {text}
    </Buton>
  )
}
