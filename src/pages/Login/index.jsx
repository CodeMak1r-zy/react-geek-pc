import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import logo from '@/assets/logo.png'
import './index.scss'

function Login() {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async (values) => {
    // 存储登录成功的token
    try {
      await loginStore.setToken(values)
      navigate('/', { replace: true })
      message.success('At Your Service, Sir!', 2)
    } catch (error) {
      message.error(error.response?.data?.message || '登录失败')
    }
  };
  const onFinishFailed = (errorInfo) => {
    const [name] = errorInfo.errorFields[0].name
    if (name === "captcha") message.error('登录失败,请检查验证码是否有误！', 2);
    if (name === "tel") message.error('登录失败,请检查手机号是否有误！', 2);
  }
  return (
    <div className='login'>
      <Card className="login-container">
        <img src={logo} className="login-logo" alt="" />
        {/* 登陆表单 */}
        <Form
          initialValues={{ remember: true, tel: '13811111111', captcha: '246810' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="手机号"
            name='tel'
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, message: '请输入手机号！' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号！' }
            ]}>
            <Input size='middle' placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            label="验证码"
            name='captcha'
            validateTrigger={["onBlur", "onChange"]}
            rules={[
              { required: true, message: '请输入验证码！' },
              { pattern: /^\d{6}$/, message: '请输入六位数字验证码！' }
            ]}>
            <Input size='middle' placeholder='请输入验证码' />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Login)