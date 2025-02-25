import request from "../utils/request.js"

// 获取用户信息
export function getUserInfo() {
  return request.get("wx/user/wx3c33a3f535470876/myinfo")
}

// 更新个人信息
export function updateUserInfo(data) {
	return request.post('wx/user/wx2e9edf156279ab67/updateMyInfo', data)
}

export function myTask(data) {
	return request.get("task/mytask", data)
}