/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { LongBtn } from '@/components/lib';
import { useDebounceFn } from 'ahooks';
import { Form, Input, Typography } from 'antd';
import { useRef, useState, useEffect } from 'react';

const RegisterScreens = () => {
  const pwdRef = useRef('');
  const [cPassValue, setCPassValue] = useState('');
  const { run: debounceSetCPwd } = useDebounceFn(setCPassValue, { wait: 500 });
  const [isSame, setSame] = useState(false);
  useEffect(() => {
    if (pwdRef.current !== '' && cPassValue === pwdRef.current) {
      setSame(true);
    } else {
      setSame(false);
    }
  }, [cPassValue]);
  return (
    <>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input type="text" placeholder={'请输入用户名'} id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password
          type="text"
          placeholder={'请输入密码'}
          id="password"
          onBlur={(e) => {
            pwdRef.current = e.target.value;
          }}
        />
      </Form.Item>
      <Form.Item name="cPassword" rules={[{ required: true }]}>
        <Input.Password
          type="text"
          placeholder={'确认密码'}
          id="cPassword"
          onChange={(e) => debounceSetCPwd(e.target.value)}
        />
      </Form.Item>
      {cPassValue ? (
        isSame ? (
          <Typography.Text type="success">
            两次密码一致，可以注册了
          </Typography.Text>
        ) : (
          <Typography.Text type="danger">两次密码不一样,请检查</Typography.Text>
        )
      ) : null}
      <LongBtn type="primary" htmlType={'submit'} disabled={!isSame}>
        {' '}
        注册
      </LongBtn>
    </>
  );
};
export default RegisterScreens;
