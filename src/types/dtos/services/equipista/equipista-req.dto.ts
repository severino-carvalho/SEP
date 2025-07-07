import { EntidadeDto } from "../../entidade.dto";

interface FileBaseDTO extends Partial<EntidadeDto> {
	fileName: string;
	fileType: string;
	fileData: number[];
}

export interface EquipistaReqDto extends Partial<EntidadeDto>, FileBaseDTO {
	nome: string;
	dataNascimento: Date;
	endereco: EnderecoDTO;
	numeroTelefone: string;
	areaAtuacao: AreaAtuacaoDTO;
	estadoCivil: string;
	filhos: string;
	idPastorais: number[];
	sacramento: string;
	participacoesEncontro: ParticipacaoEncontroRequestDTO[];
	arquivo?: File;
}

interface EnderecoDTO {
	cep: string;
	logradouro: string;
	numero: string;
	complemento?: string;
	bairro: string;
	cidade: string;
	estado: string;
}

interface AreaAtuacaoDTO {
	formacao: string;
	ocupacao: string;
	profissao: string;
	habilidades?: string;
}

interface ParticipacaoEncontroRequestDTO {
	idEquipe: number;
	ano: number;
	tipoParticipacao: string;
	acaoParticipacaoEncontro?: string;
}
