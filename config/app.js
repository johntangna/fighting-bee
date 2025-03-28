module.exports = {
  
  // 小程序
  // #ifdef MP
  // 基础请求链接
  HTTP_REQUEST_URL: `http://localhost:8088`,
  // 登陆请求有第二个连接，暂且这么处理
  HTTP_LOGIN_URL: `https://pingchuan.yzzwl.com/apipinchuan`,
  // 图片请求头
  IMG_HTTP_REQUEST_HEAD: `https://mgc.yzzwl.com/apimgc`,
  // 图片请求链接
  IMG_REQUEST_URL: "/files/download/",
  // #endif
  
  // header全局配置
  HEADER: {
    'content-type': 'application/json',
    //#ifdef MP
    'Form-type': 'routine',
    //#endif
  },
  
  // 会话密钥名称
  TOKENNAME: 'satoken',
  // 缓存 0永不过期
  EXPIRE: 0,
	DEADLINE_EXPIRE: 300000,
  DEADLINE_EXPIRE_ADMIN: 600000
}