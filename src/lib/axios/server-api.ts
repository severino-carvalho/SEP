import { LOCAL_STORAGE_ENUM } from '@/types/enums/local-storage-key-enum'
import { SEP_API_URL } from '@/types/envs'
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'

const instanceAxiosOptions: CreateAxiosDefaults = {
	baseURL: SEP_API_URL
}

const ServerAPI: AxiosInstance = axios.create(instanceAxiosOptions)

ServerAPI.interceptors.request.use(config => {
	const tokenJson = localStorage.getItem(LOCAL_STORAGE_ENUM.SEP_AUTH_TOKEN)

	if (tokenJson) {
		try {
			const token = JSON.parse(tokenJson);
			config.headers.Authorization = `Bearer ${token}`
		} catch (error) {
			// Implementar tratativa de erro
		}
	}

	return config
})

ServerAPI.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 403) {
			localStorage.removeItem('token')
			window.location.href = '/login'
		}

		return Promise.reject(error)
	}
)

export const ServerApi = ServerAPI
