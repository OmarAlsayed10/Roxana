import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { ButtonVariant } from './constant'
import { ButtonTokens } from './tokens'

type ButtonProps = {
  children: ReactNode
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: ButtonVariant
  className?: string
}

export const Button = ({ children, to, onClick, type = 'button', variant = 'solid', className = '' }: ButtonProps) => {
  const composed = `${ButtonTokens.base.className} ${ButtonTokens.variant[variant].className} ${className}`
  if (to) return <Link to={to} className={composed}>{children}</Link>
  return <button type={type} onClick={onClick} className={composed}>{children}</button>
}
