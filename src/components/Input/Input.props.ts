import { InputHTMLAttributes } from 'react';



export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
	appearance?: 'title' | 'default';
	isValid?: boolean,
}