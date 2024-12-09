import { ServerApi } from '@/lib/axios/server-api';
import { EntidadeDto } from '@/types/dtos/entidade.dto';
import { IGenericoService } from '@/types/services/GenericoService';
import { Service } from './service';

export class SEPApiService<S, R extends EntidadeDto> extends Service
	implements IGenericoService<S, R> {

	constructor(url: string) {
		super(url, ServerApi);
	}

	public async findAll(): Promise<R[]> {
		const { data } = await this.serverAPI.get<R[]>(this.url);
		return data;
	}
	
	public async findById(id: number): Promise<R> {
		const { data } = await this.serverAPI.get<R>(`${this.url}/${id}`);
		return data;
	}

	public async save(data: S): Promise<R> {
		const { data: responseData } = await this.serverAPI.post<R>(this.url, data);
		return responseData;
	}

	public async update(id: number, data: S): Promise<R> {
		const { data: responseData } = await this.serverAPI.put<R>(`${this.url}/${id}`, data);
		return responseData;
	}

	public async delete(id: number): Promise<R> {
		const { data: responseData } = await this.serverAPI.delete<R>(`${this.url}/${id}`);
		return responseData;
	}
}
