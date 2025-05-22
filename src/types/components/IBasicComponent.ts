import { ComponentProps, ReactNode } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

export interface IChildren {
  children: ReactNode
}

export interface FormInputProps extends ComponentProps<"input"> {
  label?: string
  field: ControllerRenderProps
}
