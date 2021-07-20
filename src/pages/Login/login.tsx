/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { LongBtn } from '@/components/lib';
import { Form, Input } from 'antd';

const LoginScreens = () => {
  return (
    <>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input type="text" placeholder={'请输入用户名'} id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password type="text" placeholder={'请输入密码'} id="password" />
      </Form.Item>
      <LongBtn type="primary" htmlType={'submit'}>
        {' '}
        登录
      </LongBtn>
    </>
  );
};
export default LoginScreens;
