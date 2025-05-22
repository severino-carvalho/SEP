import { EEstadoCivil, ESacramento } from "@/types/enums/app";
import { z } from "zod";

function createEnumSchema<T extends Record<string, string>>(enumObj: T) {
  return z.union([
    z.nativeEnum(enumObj),
    z.enum(Object.keys(enumObj) as [keyof T, ...Array<keyof T>])
  ]);
}

const fileBaseDTOSchema = z.object({
  id: z.number().optional(),
  fileName: z.string().optional(),
  fileType: z.string().optional(),
  fileData: z.array(z.number()).optional(),
});

export const enderecoDTOSchema = z.object({
  logradouro: z.string({ required_error: "Informe o logradouro" })
    .min(1, { message: "Informe o logradouro" })
    .max(255, { message: "Limite de caracteres atingido" }),
  cep: z.string({ required_error: "Informe o CEP" })
    .min(8, { message: "CEP inválido" })
    .max(9, { message: "CEP inválido" }),
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
  habilidades: z.string(),
});

export const pastoralDTOSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

export const participacaoEncontroDTOSchema = z.object({
  id: z.number().optional(),
  encontroId: z.number(),
  nomeEncontro: z.string(),
  equipeId: z.number(),
  nomeEquipe: z.string(),
  equipistaId: z.number(),
  anoParticipacao: z.number(),
  tipoParticipacao: z.string(),
});

// Create the enum schemas using the utility function
const estadoCivilSchema = createEnumSchema(EEstadoCivil);
const sacramentoSchema = createEnumSchema(ESacramento);

export const equipistaDTOSchema = fileBaseDTOSchema.extend({
  nome: z.string({ required_error: "Informe o nome" })
    .min(1, { message: "Informe o nome" })
    .max(255, { message: "Limite de caracteres atingido" }),
  dataNascimento: z.string({ required_error: "Informe a data de nascimento" }),
  enderecoDTO: enderecoDTOSchema,
  numeroTelefone: z.string({ required_error: "Informe o número de telefone" })
    .min(1, { message: "Informe o número de telefone" }),
  areaAtuacaoDTO: areaAtuacaoDTOSchema,
  estadoCivil: estadoCivilSchema, // Using the custom enum schema
  filhos: z.string().optional(),
  sacramento: sacramentoSchema.optional(), // Using the custom enum schema
  pastoraisDTO: z.array(pastoralDTOSchema).optional(),
  participacoesEncontrosDTO: z.array(participacaoEncontroDTOSchema).optional(),
});

export const equipistaFormSchema = equipistaDTOSchema.extend({
  filhos: z.coerce.number()
    .min(0, { message: "Informe uma quantidade válida" })
    .max(50, { message: "Informe uma quantidade válida" })
    .optional(),
});