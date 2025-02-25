import request from "@/utils/request.js"

export function constractList(method, api, data) {
  return request[method](`contract/${api}`, data)
}

export function getRoomList(data) {
	return request.get("room/list", data)
}
export function updateRoom(data) {
	return request.put("room/update", data)
}

export function getRoomCascade(data) {
	return request.get("room/listWithChildrenAndContract", data)
}

export function companyList() {
	return request.get("company/list")
}

export function getConstractDetails(constractId, data) {
	return request.get(`contract/getInfo/${constractId}`, data)
}

export function getPayInfoListHistory(data) {
	return request.get("contract/payInfoList", data)
}

export function saveContractPayInfo(data) {
	return request.post("contract/savePayInfo", data)
}