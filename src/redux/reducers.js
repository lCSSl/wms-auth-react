import {combineReducers} from "redux"
import {Key, PcCookie} from '@/utils/cookie'

/*
 * 包含N个reducer函数的模块
 * ###以下自我见解###
 * 以这种形式一般用于全局状态。每个组件都这样用可能会影响性能
 * 函数名返回对应的状态值
 * dispatch会搜索全部函数....效率低下?
 */
import {
  SET_USER_STATE,
  RESET_USER_STATE,
} from "./action-types"

function UserState(state={}, action){
  switch (action.type) {
    case SET_USER_STATE:{
      const {userInfo, access_token, refresh_token} = action.data;
      //状态赋值
      state.userInfo = userInfo;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      //保存到cookie
      PcCookie.set(Key.userInfoKey, userInfo)
      PcCookie.set(Key.accessTokenKey, access_token)
      PcCookie.set(Key.refreshTokenKey, refresh_token)
      return state;
    };break;
    case RESET_USER_STATE:{
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
      PcCookie.remove(Key.userInfoKey);
      PcCookie.remove(Key.accessTokenKey);
      PcCookie.remove(Key.refreshTokenKey);
      return state;
    }break;
    default:
      return state;
  }
}
export default combineReducers({
  UserState
});
