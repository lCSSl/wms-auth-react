import request from "../utils/request";

/*const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

//请求头添加 Authorization: Basic client_id:client_secret
const auth = {
  username: 'mxg-blog-admin',
  password: '123456',
}

function register(data) {
  return request({
    url: '/system/api/user/register',
    method: 'post',
    data,
  });
}

function login(data) {
  return request({
    headers,
    auth,
    url: '/login',
    method: 'post',
    params: data,
  });
}

function refreshAuth(refreshToken) {
  return request({
    auth,
    headers,
    url: `/user/refreshToken`,
    method: 'post',
    params: {
      refreshToken
    }
  });
}

function logout(accessToken) {
  return request({
    url: '/logout',
    method: 'get',
    params: {
      accessToken
    },
  });
}

function getUserByUsername(username) {
  return request({
    url: `/system/api/user/username/${username}`,
    method: 'get'
  });
}

function getProtocol() {
  return request({
    url: `${window.location.href}/protocol.html`,
    method: 'get',
  });
}*/

const client_id = 'web'
const client_secret = '123456'
const scope = 'server'

// 登录方法
function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 刷新方法
function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}
function getCodeImg() {
  return request({
    url: '/code',
    method: 'get'
  })
}
export {
  login,
  refreshToken,
  logout,
  getCodeImg,
  getInfo,
}
