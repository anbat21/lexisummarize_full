
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const client = axios.create({ baseURL: API, timeout: 10000 })

export async function summarizeAPI(text, length = 'medium'){
	const r = await client.post('/api/summarize/', { text, length })
	return r.data
}

export async function loginAPI(email, password){
	const r = await client.post('/api/auth/login', { email, password })
	return r.data
}

export async function registerAPI(email, password){
	const r = await client.post('/api/auth/register', { email, password })
	return r.data
}
