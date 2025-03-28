import request from "@/utils/request.js"

// 静默登陆
export function silenceAuth(data) {
  return request.get(`wx/login/${data.code}`, null, {
    noAuth: true
  })
}

/**
 * 小程序绑定手机号
 * @param {Object} data
 */
export function getUserPhone(data){
	console.log(data);
	return request.post('',data,{noAuth : true});
}

// 小程序用户登录
// export function routineLogin(data) {
//   return request.get("", data, {
//     noAuth: true
//   })
// }

// 轮播图
export function swiper() {
  return request.get("minipImgs/list",null, {noAuth : true})
}

// 到期提醒
export function deadLineList() {
	return request.get("task/tasks_overdue_alarm")
}

// 上传文件
export function uploadFile(data) {
	return request.post("files/upload", data)
}

// 职务列表
export function postList() {
	return request.get("dict/getInfo/post")
}

// 岗位列表
export function jobList() {
	return request.get("dict/getInfo/job_title")
}

