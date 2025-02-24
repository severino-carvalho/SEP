import { EntidadeDto } from "../../entidade.dto";

export interface EquipistaReqDto extends Partial<EntidadeDto> {
	foto?: string;
	nome: string;
	dataNascimento: string;
	endereco?: EnderecoDto;
	numeroTelefone: string;
	areaAtuacao?: AreaAtuacaoDto;
	estadoCivil: EstadoCivil;
	filhos?: string;
	pastorais?: PastoralDto[];
	sacramento?: Sacramento;
	participacoesEncontros?: ParticipacaoEncontroDto[];
}

export interface EnderecoDto {
	rua?: string;
	cep?: string;
	numero?: string;
	bairro?: string;
	cidade?: string;
	estado?: string;
}

export interface AreaAtuacaoDto {
	nome: string;
	descricao?: string;
}

export enum EstadoCivil {
	SOLTEIRO = "SOLTEIRO",
	CASADO = "CASADO",
	DIVORCIADO = "DIVORCIADO",
	VIUVO = "VIUVO"
}

export interface PastoralDto {
	id: number;
	nome: string;
}

export enum Sacramento {
	BATISMO = "BATISMO",
	EUCARISTIA = "EUCARISTIA",
	CRISMA = "CRISMA",
	MATRIMONIO = "MATRIMONIO",
	ORDEM = "ORDEM",
	UNCAO_DOS_ENFERMOS = "UNCAO_DOS_ENFERMOS"
}

export interface ParticipacaoEncontroDto {
	id: number;
	encontroId: number;
	equipistaId: number;
	dataParticipacao: string;
}
