import { EEstadoCivil, ESacramento, EFormacao, EOcupacao, EProfissao, ETipoParticipacao } from "@/types/enums/app";
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

const estadoCivilSchema = createEnumSchema(EEstadoCivil);
const sacramentoSchema = createEnumSchema(ESacramento);
const formacaoSchema = createEnumSchema(EFormacao);
const ocupacaoSchema = createEnumSchema(EOcupacao);
const profissaoSchema = createEnumSchema(EProfissao);
const tipoParticipacaoSchema = createEnumSchema(ETipoParticipacao);

export const areaAtuacaoDTOSchema = z.object({
  formacao: formacaoSchema,
  ocupacao: ocupacaoSchema,
  profissao: profissaoSchema,
  habilidades: z.string().optional(),
});

export const pastoralDTOSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

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
  estadoCivil: estadoCivilSchema,
  filhos: z.string().optional(),
  idPastorais: z.array(z.number()).optional(),
  sacramento: sacramentoSchema.optional(),
  participacoesEncontro: z.array(z.object({
    idEquipe: z.number(),
    ano: z.number(),
    tipoParticipacao: tipoParticipacaoSchema,
    acaoParticipacaoEncontro: z.string().optional()
  })).optional().default([]),
  arquivo: z.instanceof(File).optional(),
});

export const equipistaFormSchema = equipistaDTOSchema;