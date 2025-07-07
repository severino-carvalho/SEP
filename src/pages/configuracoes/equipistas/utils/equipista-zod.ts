import { EEstadoCivil, ESacramento } from "@/types/enums/app";
import { z } from "zod";

function createEnumSchema<T extends Record<string, string>>(enumObj: T) {
  return z.union([
    z.nativeEnum(enumObj),
    z.enum(Object.keys(enumObj) as [string, ...string[]])
  ]);
}

const fileBaseDTOSchema = z.object({
  id: z.number().optional(),
  fileName: z.string().nullable().optional(),
  fileType: z.string().nullable().optional(),
  fileData: z.array(z.number()).nullable().optional(),
});

export const enderecoDTOSchema = z.object({
  logradouro: z.string({ required_error: "Informe o logradouro" })
    .min(1, { message: "Informe o logradouro" })
    .max(255, { message: "Limite de caracteres atingido" }),
  cep: z.string({ required_error: "Informe o CEP" })
    .regex(/^\d{8}$/, { message: "O CEP deve conter 8 dígitos" }),
  numero: z.string({ required_error: "Informe o número" })
    .min(1, { message: "Informe o número" })
    .max(10, { message: "Limite de caracteres atingido" }),
  bairro: z.string({ required_error: "Informe o bairro" })
    .min(1, { message: "Informe o bairro" })
    .max(255, { message: "Limite de caracteres atingido" }),
  cidade: z.string({ required_error: "Informe a cidade" })
    .min(1, { message: "Informe a cidade" })
    .max(255, { message: "Limite de caracteres atingido" }),
  estado: z.string({ required_error: "Informe o estado" })
    .min(1, { message: "Informe um estado válido" })
    .max(255, { message: "Limite de caracteres atingido" }),
  complemento: z.string().max(255, { message: "Limite de caracteres atingido" }).optional(),
});

export const areaAtuacaoDTOSchema = z.object({
  formacao: z.string({ required_error: "A formação é obrigatória" })
    .min(1, { message: "Informe a formação" }),
  ocupacao: z.string({ required_error: "A ocupação é obrigatória" })
    .min(1, { message: "Informe a ocupação" }),
  profissao: z.string({ required_error: "A profissão é obrigatória" })
    .min(1, { message: "Informe a profissão" }),
  habilidades: z.string().optional(),
});

export const pastoralDTOSchema = z.object({
  id: z.number(),
  nome: z.string(),
});



// Create the enum schemas using the utility function
const estadoCivilSchema = createEnumSchema(EEstadoCivil);
const sacramentoSchema = createEnumSchema(ESacramento);

export const equipistaDTOSchema = fileBaseDTOSchema.extend({
  nome: z.string({ required_error: "Informe o nome" })
    .min(1, { message: "Informe o nome" })
    .max(255, { message: "Limite de caracteres atingido" }),
  dataNascimento: z.date({ required_error: "Informe a data de nascimento" })
    .refine((date) => date <= new Date(), { message: "A data de nascimento não pode ser no futuro" })
    .refine((date) => date >= new Date("1900-01-01"), { message: "Data de nascimento inválida" }),
  endereco: enderecoDTOSchema,
  numeroTelefone: z.string({ required_error: "Informe o número de telefone" })
    .min(1, { message: "Informe o número de telefone" })
    .regex(/^\d{11}$/, { message: "O número de telefone deve conter 11 dígitos" }),
  areaAtuacao: areaAtuacaoDTOSchema,
  estadoCivil: z.string({ required_error: "O estado civil é obrigatório" }),
  filhos: z.string().optional(),
  idPastorais: z.array(z.number()).optional(),
  sacramento: z.string().optional(),
  participacoesEncontro: z.array(z.object({
    idEquipe: z.number(),
    ano: z.number(),
    tipoParticipacao: z.string(),
    acaoParticipacaoEncontro: z.string().optional()
  })).optional().default([]),
  arquivo: z.instanceof(File).optional(),
});

export const equipistaFormSchema = equipistaDTOSchema;