import client from './client'
import type { ApiResponse, PaginatedData, ArticleDate, DiaryDate, ReplyData, SubsetData, LabelData, OverviewData } from '@/types'

/** 获取已发布文章列表 */
export const getArticles = (params: {
  pageSize: number
  nowPage: number
  subsetId?: number
  serchTerm?: string
  label?: string
}) =>
  client.post<any, ApiResponse<PaginatedData<ArticleDate>>>('/public/articles', params)

/** 获取单篇文章详情 */
export const getArticle = (id: number) =>
  client.post<any, ApiResponse<ArticleDate>>('/public/article', { id })

/** 获取图库列表 */
export const getGallery = (params: {
  pageSize: number
  nowPage: number
  subsetId?: number
}) =>
  client.post<any, ApiResponse<PaginatedData<ArticleDate>>>('/public/gallery', params)

/** 获取日记列表 */
export const getDiaries = (params: {
  pageSize: number
  nowPage: number
  serchTerm?: string
}) =>
  client.post<any, ApiResponse<PaginatedData<DiaryDate>>>('/public/diary', params)

/** 获取文章评论 */
export const getComments = (params: {
  articleId: number
  pageSize: number
  nowPage: number
}) =>
  client.post<any, ApiResponse<PaginatedData<ReplyData>>>('/public/comments', params)

/** 提交评论 */
export const postComment = (data: {
  articleId: number
  userId: string
  userName: string
  content: string
}) =>
  client.post<any, ApiResponse>('/public/comment', data)

/** 点赞文章 */
export const postPraise = (data: { articleId: number; userId: number }) =>
  client.post<any, ApiResponse>('/public/praise', data)

/** 获取分组列表 */
export const getSubsets = (classify: number) =>
  client.post<any, ApiResponse<{ count: number; list: SubsetData[] }>>('/public/subsets', { classify })

/** 获取标签列表 */
export const getLabels = () =>
  client.post<any, ApiResponse<LabelData[]>>('/public/labels', {})

/** 获取数据总览 */
export const getOverview = () =>
  client.post<any, ApiResponse<OverviewData>>('/public/overview', {})
