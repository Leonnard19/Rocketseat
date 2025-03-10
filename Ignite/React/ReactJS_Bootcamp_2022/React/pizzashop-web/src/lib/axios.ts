import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // Cookies are sent with every request
  withCredentials: true,
})
