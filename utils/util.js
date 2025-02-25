import {
	TOKENNAME,
	HTTP_REQUEST_URL,
	HEADER
} from "../config/app.js"
import store from "../store"

export default {
	/**
	 * this.Tips("/pages/test/test") 跳转不提示
	 * this.Tips({title: '提示'}, '/pages/test/test') 提示并跳转
	 * this.Tips({title: '提示'}, {tab: 1, url: '/pages/test/test'}) 提示并跳转到table上
	 * tab = 1 一定时间后跳转到table上
	 * tab = 2 一定时间后跳转到非table上
	 * tab = 3 一定时间后返回到上页面
	 * tab = 4 关闭所有页面，打开到应用内的某个页面
	 * tab = 5 关闭当前页面，跳转到应用内的某个页面
	 */
	Tips: (opt, to_url) => {
		if (typeof opt == 'string') {
			to_url = opt;
			opt = {}
		}
		let title = opt.title || '',
			icon = opt.icon || 'none',
			endtime = opt.endTime || 2000,
			success = opt.success

		if (title) {
			uni.showToast({
				title: title,
				icon: icon,
				duration: endtime,
				success
			})
		}

		if (to_url != undefined) {
			if (typeof to_url == 'object') {
				let tab = to_url.tab || 1,
					url = to_url.url || ''
				switch (tab) {
					case 1:
						//一定时间后跳转至 table
						setTimeout(function() {
							uni.navigateTo({
								url: url
							})
						}, endtime);
						break;
					case 2:
						//跳转至非table页面
						setTimeout(function() {
							uni.navigateTo({
								url: url
							})
						}, endtime);
						break;
					case 3:

						//返回上页面
						setTimeout(function() {
							// #ifndef H5
							uni.navigateBack({
								delta: parseInt(url),
							})
							// #endif
							// #ifdef H5
							history.back();
							// #endif
						}, endtime);
						break;
					case 4:
						//关闭所有页面，打开到应用内的某个页面
						setTimeout(function() {
							uni.reLaunch({
								url: url,
							})
						}, endtime);
						break;
					case 5:
						//关闭当前页面，跳转到应用内的某个页面
						setTimeout(function() {
							uni.redirectTo({
								url: url,
							})
						}, endtime);
						break;
				}
			} else if (typeof to_url == 'function') {
				setTimeout(function() {
					to_url && to_url();
				}, endtime);
			} else {
				//没有提示时跳转不延迟
				setTimeout(function() {
					uni.navigateTo({
						url: to_url,
					})
				}, title ? endtime : 0);
			}
		}

	},

	/*
	 * 合并数组
	 */
	SplitArray(list, sp) {
		if (typeof list != 'object') return [];
		if (sp === undefined) sp = [];
		for (var i = 0; i < list.length; i++) {
			sp.push(list[i]);
		}
		return sp;
	},

	// 计算元素的信息，使用Uni.createSelectorQuery
	getSelectorQueryInfo(selector) {
		return new Promise((resolve, reject) => {
			uni.createSelectorQuery().select(selector).boundingClientRect(data => {
				resolve(data)
			}).exec()
		})
	},

	// 将对象转换成&拼接方式，利于页面传参
	convertObjectToString(options) {
		return Object.keys(options).map(item => `${item}=${options[item]}`).join("&")
	},

	/**
	 * 手机号码或者固话号码
	 * @param {*} s
	 */
	isPhone(value) {
		let regPhone = /^([0-9]{3,4}-)?[0-9]{8,9}$/
		let regMobile = /^1[3456789]\d{9}$/
		if (!regPhone.test(value) && !regMobile.test(value)) {
			return false
		} else {
			return true
		}
	},

	showToast({
		title,
		icon,
		duration,
		success = () => {}
	}) {
		return uni.showToast({
			title: title,
			icon: icon || 'success',
			duration: duration || 2000,
			success: success
		})
	},

	// 客服端订单查询字符串
	/**
	 * 根据输入的值，自动判断是手机号还是订单号
	 * 物流状态和订单状态根据传入值判断，没有的话，去掉键
	 * 
	 */
	serviceOrderQueryString(status, pageNo, pageSize, content, userId) {
		let obj = {
			pageNo: pageNo,
			pageSize: pageSize
		}

		if (status == 0 || status == 1) {
			obj.status = status
		} else if (status == 2) {
			obj.createBy = userId
		}
		
		if (content) {
			obj.content = content
		}

		return obj
	},

	// 将值为null，全部变成空值
	convertNullToEmpty(obj) {
		for (let item in obj) {
			if (obj[item] == "null") {
				obj[item] = ""
			}
		}
		return obj
	},

	trim(str) {
		return String.prototype.trim.call(str);
	},
	uploadFile(file) {
		debugger
		return new Promise((resolve, reject) => {
			let header = HEADER
			header[TOKENNAME] = store.state.app.token;
			uni.uploadFile({
				url: `${HTTP_REQUEST_URL}/files/upload?filename=${file.name}`,
				name: 'file',
				header: header,
				filePath: file.path,
				success: (res) => {
					console.log('uploadImage success, res is:', res)
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				},
			});
		})
	}

}