import React, {Component} from "react";
import PropType from "prop-types"
import {ResetUserState} from "../../redux/actions";
import {connect} from "react-redux";
import {logout} from "../../api/auth";
import {Key, PcCookie} from '@/utils/cookie'
import storageUtils from "../../utils/storageUtils";
/**
 * 登录路由组件
 */
class Logout extends Component {
  static propTypes = {
    UserState: PropType.object,
    ResetUserState: PropType.func.isRequired,
  }

  componentDidMount() {
    const accessToken = PcCookie.get(Key.accessTokenKey);
    logout(accessToken).then(res=>{
      this.props.ResetUserState();
      // 获得URL参数
      const query_params = new URLSearchParams(this.props.location.search);
      const redirectURL = query_params.get("redirectURL");
      const localRedirectURL = storageUtils.get("redirectURL");
      storageUtils.remove("redirectURL");
      window.location.href = redirectURL?redirectURL:localRedirectURL;
    }).catch(err=>{

    });
    console.log(this.props.UserState);
  }

  render() {

    return (
      <div>
      </div>
    );
  }
}

export default connect(
  state => ({UserState: state.UserState}), //state就是一个comments数组
  {ResetUserState}
)(Logout);
