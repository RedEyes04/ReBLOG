export interface ArticleDate {
  id: number
  title: string
  subset_id?: number
  moment: string
  label?: string[]
  introduce?: string
  cover?: string
  views: number
  state: number
  comment: number
  praise: number
  content?: string
  classify: number
}

export interface DiaryDate {
  id?: number
  title?: string
  moment?: string
  weather_id?: number
  content?: string
  picture?: string
}

export interface ReplyData {
  id: number
  article?: { id: number; title: string }
  article_id: number
  user_id: string
  user_name: string
  content: string
  moment: string
  isread: number
}

export interface SubsetData {
  id: number
  name: string
  value: number
  classify?: number
  moment?: string
}

export interface LabelData {
  id: number
  label_name: string
  moment?: string
}

export interface FileData {
  id: number
  url: string
  file_name: string
  format: string
  subset_id?: number
  moment: string
}

export interface OverviewData {
  article: number
  gallery: number
  diary: number
  file: string
}

export interface ApiResponse<T = any> {
  code: number
  data?: T
  msg?: string
}

export interface PaginatedData<T> {
  count: number
  list: T[]
}
