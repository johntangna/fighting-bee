import request from "@/utils/request.js"

export function getWorkingHours(data) {
	return request.get("task/charts/workinghours", data)
}

export function getWorkingCounts(data) {
	return request.get("task/charts/workingcnts", data)
}