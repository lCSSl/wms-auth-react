import Cookies from 'js-cookie'

// Cookie的key值
export const Key = {
  accessTokenKey: 'Access-Token', // 访问令牌在cookie的key值
  accessExpiresInKey: 'Access-Expires-In', // 令牌在过期时长
  refreshTokenKey: 'refreshToken', // 刷新令牌在cookie的key值(暂未使用)
  userInfoKey: 'userInfo' //(暂未使用)
}

class CookieClass {
  constructor() {
    this.domain = process.env.REACT_APP_COOKIE_DOMAIN// 域名
    this.expireTime = 15 // 保存15天
  }

  set(key, value, expires, path = '/') {
    CookieClass.checkKey(key);
    Cookies.set(key, value, {expires: expires || this.expireTime, path: path, domain: this.domain})
  }

  get(key) {
    CookieClass.checkKey(key)
    return Cookies.get(key)
  }

  remove(key, path = '/') {
    CookieClass.checkKey(key)
    Cookies.remove(key, {path: path, domain: this.domain})
  }

  geteAll() {
    Cookies.get();
  }

  static checkKey(key) {
    if (!key) {
      throw new Error('没有找到key.');
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象.');
    }
  }
}

// 导出
export const PcCookie =  new CookieClass()
