import requests from '@/lib/requests'
import type { Config } from '@/lib/requests'
import type { Request, Response } from '@/interface'

export function getData(params: Request, config?: Config): Promise<Response> {
  return requests.get('/api/mock/data', params, config)
}
