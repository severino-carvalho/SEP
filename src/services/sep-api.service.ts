import { ServerApi } from '@/lib/axios/server-api';
import { EntidadeDto } from '@/types/dtos/entidade.dto';
import { FiltroResult } from '@/types/services/FiltroResult';
import { IGenericoService } from '@/types/services/GenericoService';
import { Service } from './service';

export class SEPApiService<S, R extends EntidadeDto> extends Service
	implements IGenericoService<S, R> {

	constructor(url: string) {
		super(url, ServerApi);
	}

	public async findAll(): Promise<FiltroResult<R>> {
		const { data } = await this.serverAPI.get<FiltroResult<R>>(this.url);
		return data;
	}

	public async save(data: S): Promise<R> {
		const { data: responseData } = await this.serverAPI.post<R>(this.url, data);
		return responseData;
	}

	public async update(id: string, data: S): Promise<R> {
		const { data: responseData } = await this.serverAPI.put<R>(`${this.url}/${id}`, data);
		return responseData;
	}

	public async delete(id: string): Promise<R> {
		const { data: responseData } = await this.serverAPI.delete<R>(`${this.url}/${id}`);
		return responseData;
	}
}
