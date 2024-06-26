import { z } from 'zod'

const schemaEnv = z.object({
  NEXT_PUBLIC_URL_APPLICATION: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_URL_API: z.string(),
})

const envFromProcess = {
  NEXT_PUBLIC_URL_APPLICATION: process.env.NEXT_PUBLIC_URL_APPLICATION,
  NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
}

const _env = schemaEnv.safeParse(envFromProcess)

if (!_env.success) {
  console.error('Erro: Variáveis não encontradas', _env.error.format())
  throw new Error('Erro: Variáveis não encontradas')
}

export const env = _env.data
