/** 兼容后端返回 result 或 list 字段 */
export function getList<T>(data: any): T[] {
  if (!data) return []
  return data.list || data.result || []
}
