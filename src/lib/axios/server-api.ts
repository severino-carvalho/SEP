import { SEP_API_URL } from '@/types/envs'
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'

const instanceAxiosOptions: CreateAxiosDefaults = {
	baseURL: SEP_API_URL
}

const ServerAPI: AxiosInstance = axios.create(instanceAxiosOptions)

ServerAPI.interceptors.request.use(config => {
	const token = localStorage.getItem('token')

	if (token) config.headers.Authorization = `Bearer ${token}`

	return config
})

ServerAPI.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) {
			localStorage.removeItem('token')
			window.location.href = '/login'
		}

		return Promise.reject(error)
	}
)

export const ServerApi = ServerAPI
