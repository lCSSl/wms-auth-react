import request from "../utils/request";

const headers = {
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
}

export {
  register,
  login,
  refreshAuth,
  logout,
  getUserByUsername,
  getProtocol
}
