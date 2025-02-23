import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function validarFormatoArquivo(file?: File, formatosAceitos: string[] = []) {
	if (!file) return false
	const extensao = file.name.split('.').pop();
	
	if (!extensao) return false
  return formatosAceitos.includes(extensao)
}