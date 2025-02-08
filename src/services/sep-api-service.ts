import { ServerApi } from '@/lib/axios/server-api';
import { EntidadeDto } from '@/types/dtos/entidade.dto';
import { IGenericoService } from '@/types/services/GenericoService';

export class SEPApiService<S, R extends EntidadeDto> implements IGenericoService<S, R> {
	protected readonly serverAPI;

	constructor(protected readonly url: string) {
		this.serverAPI = ServerApi
	}

	async findAll(): Promise<R[]> {
		const { data } = await this.serverAPI.get<R[]>(this.url)
		return data
	}

	async findById(id: number): Promise<R> {
		const { data } = await this.serverAPI.get<R>(`${this.url}/${id}`)
		return data
	}

	async save(data: S): Promise<R> {
		const { data: responseData } = await this.serverAPI.post<R>(this.url, data)
		return responseData
	}

	async update(id: number, data: S): Promise<R> {
		const { data: responseData } = await this.serverAPI.put<R>(`${this.url}/${id}`, data)
		return responseData
	}

	async delete(id: number): Promise<R> {
		debugger
		const { data: responseData } = await this.serverAPI.delete<R>(`${this.url}/${id}`)
		return responseData
	}
}
