import request from "@/utils/request.js"

export function updateOrSave(method, api, data) {
	return request[method](`user/${api}`, data)
}

export function getEmployeeList(param) {
	return request.get("user/list", param)
}