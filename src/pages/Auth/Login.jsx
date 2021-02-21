import React, {Component} from "react";
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';
import {LockOutlined, QqOutlined, UserOutlined, WechatOutlined, WeiboOutlined} from '@ant-design/icons';
import logo from "./images/logo_tinycirclex.png"
import {Link, Redirect} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import PropType from "prop-types"
import "./Login.less"
import {ResetUserState, SetUserState} from "../../redux/actions";
import {connect} from "react-redux";
import {login} from "../../api/auth";
import storageUtils from "../../utils/storageUtils";

/**
 * 登录路由组件
 */

class Login extends Component {
  static propTypes = {
    UserState: PropType.object,
    SetUserState: PropType.func.isRequired,
    ResetUserState: PropType.func.isRequired,
  }
  state = {
    loading: true,
  }

  componentDidMount() {
    console.log(this.props);
    this.props.ResetUserState();
    setTimeout(() => {
      this.setState({loading: false});
    }, 1000);
  }

  onFinish = values => {
    const {userCode, userPassword} = values;
    login({
      username: userCode,
      password: userPassword
    }).then(res => {
      this.props.SetUserState(res);
      // 获得URL参数
      const query_params = new URLSearchParams(this.props.location.search);
      const redirectURL = query_params.get("redirectURL");
      const localRedirectURL = storageUtils.get("redirectURL");
      storageUtils.remove("redirectURL");
      // window.location.href = redirectURL ? redirectURL : localRedirectURL;
    }).catch(err => {
      console.log("catch", err);
    });
  };

  render() {
    const {user} = memoryUtils.user_key;
    if (user && user.userId) {
      return <Redirect to="/"/>
    }
    const mmo = {
      userCode: "admin",
      userPassword: "123456"
    };
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>KYWMS</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-content-form"
            initialValues={mmo}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="userCode"
              rules={[
                {required: true, message: '请输入您的用户名!'},
                {min: 4, message: '用户名至少4位!'},
                {max: 16, message: '用户名至多16位!'},
                {pattern: /[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!'},
                {whitespace: true, message: '不允许空格'},
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon"/>}
                placeholder="用户名"
                value="admin"
              />
            </Form.Item>
            <Form.Item
              name="userPassword"
              rules={[
                {required: true, message: '请输入您的密码!'},
                {whitespace: true, message: '不允许空格'},
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>

              <Link to="/wjmm" className="login-content-form-forgot">
                忘记密码
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-content-form-button">
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <Row style={{alignItems: "center"}} justify="space-between">
                <Col span={18}>
                  <span>其他登录方式</span>
                  <Button className="login_method_button" type="primary" shape="circle">
                    <WechatOutlined/>
                  </Button>
                  <Button className="login_method_button" type="primary" shape="circle">
                    <QqOutlined/>
                  </Button>
                  <Button className="login_method_button" type="primary" shape="circle">
                    <WeiboOutlined/>
                  </Button>
                </Col>
                <Col>
                  <Link to="reg">现在注册!</Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default connect(
  state => ({UserState: state.UserState}), //state就是一个comments数组
  {SetUserState, ResetUserState}
)(Login);
