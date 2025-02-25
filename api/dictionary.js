import request from "@/utils/request.js"

/**
 * @param {Object} type 字典类型值
 * 目前三个
 * /dict/getInfo/task_status
	/dict/getInfo/task_type
 */
export function getAllDic(type) {
  return request.get(`dict/getInfo/${type}`)
}