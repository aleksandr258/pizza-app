import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode,
	appearance?: 'big' | 'small'
}