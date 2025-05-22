import { EEstadoCivil, ESacramento } from "@/types/enums/app";
import { EntidadeDto } from "../../entidade.dto";

export interface EquipistaResDto extends EntidadeDto {
	foto?: string;
	nome: string;
	dataNascimento: string;
	endereco?: EnderecoDto;
	numeroTelefone: string;
	areaAtuacao?: AreaAtuacaoDto;
	estadoCivil: EEstadoCivil;
	filhos?: string;
	pastorais?: PastoralDto[];
	sacramento?: ESacramento[];
	participacoesEncontros?: ParticipacaoEncontroDto[];
}

export interface EnderecoDto {
	rua: string;
	cep: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
}

export interface AreaAtuacaoDto {
	nome: string;
	descricao?: string;
}

export interface PastoralDto {
	id: number;
	nome: string;
}

export interface ParticipacaoEncontroDto {
	id: number;
	encontroId: number;
	equipistaId: number;
	dataParticipacao: string;
}
