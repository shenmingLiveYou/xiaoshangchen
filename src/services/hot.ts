import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

export const getHotRecommendAPI = (url: string, data?: PageParams & { subType?: string }) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
