import { EntidadeDto } from "../../entidade.dto";

export interface EquipistaResDto extends EntidadeDto {
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

interface EnderecoDto {
	rua?: string;
	cep?: string;
	numero?: string;
	bairro?: string;
	cidade?: string;
	estado?: string;
}

interface AreaAtuacaoDto {
	nome: string;
	descricao?: string;
}

enum EstadoCivil {
	SOLTEIRO = "SOLTEIRO",
	CASADO = "CASADO",
	DIVORCIADO = "DIVORCIADO",
	VIUVO = "VIUVO"
}

interface PastoralDto {
	id: number;
	nome: string;
}

enum Sacramento {
	BATISMO = "BATISMO",
	EUCARISTIA = "EUCARISTIA",
	CRISMA = "CRISMA",
	MATRIMONIO = "MATRIMONIO",
	ORDEM = "ORDEM",
	UNCAO_DOS_ENFERMOS = "UNCAO_DOS_ENFERMOS"
}

interface ParticipacaoEncontroDto {
	id: number;
	encontroId: number;
	equipistaId: number;
	dataParticipacao: string;
}
