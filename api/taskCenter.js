import request from "@/utils/request.js"

export function getTaskListAdmin(data) {
	return request.get("task/list", data)
}

export function saveTask(data) {
	return request.post("task/save", data)
}

export function updateTask(data) {
	return request.put("task/update", data)
}

export function supplyTaskInfo(data) {
	return request.post("taskinfo/save", data)
}

export function getTaskDetails(id) {
	return request.get(`task/getInfo/${id}`)
}