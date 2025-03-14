import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // Cookies are sent with every request
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(config)
        },
        Math.round(Math.random() * 3000),
      )
    })
  })
}
