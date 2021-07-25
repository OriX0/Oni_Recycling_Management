/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { FC, useState } from 'react';
import LoginBG from '@/assets/login-bg.png';
import LeftImg from '@/assets/img-3.svg';
import AvatarImg from '@/assets/avatar.svg';
import {
  BgImgWrapper,
  Container,
  LeftImgWrapper,
  LoginBox,
  FormContainer,
  Title,
} from './style';
import LoginScreen from './login';
import RegisterScreens from './register';
import { Button, message } from 'antd';
import { ConnectRC, connect } from 'umi';
import { useForm } from 'antd/lib/form/Form';

const LoginPage: ConnectRC = (props) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm] = useForm();
  const { dispatch } = props;
  const handleSubmit = (value: any) => {
    if (!isRegister) {
      dispatch({
        type: 'user/login',
        payload: value,
      });
    } else {
      message.warn(
        '抱歉,该系统为公司内部使用不开放注册,该页面只是用来做交互测试的',
      );
    }
  };
  return (
    <>
      <BgImgWrapper>
        <img src={LoginBG} />
      </BgImgWrapper>
      <Container>
        <LeftImgWrapper>
          <img src={LeftImg} style={{ width: 500 }} alt="" />
        </LeftImgWrapper>
        <LoginBox>
          <FormContainer onFinish={handleSubmit} form={loginForm}>
            <img src={AvatarImg} alt="" style={{ width: 100 }} />
            <Title>回收管理系统</Title>
            {isRegister ? <RegisterScreens /> : <LoginScreen />}
            <Button
              type="link"
              onClick={() => {
                setIsRegister(!isRegister);
                loginForm.resetFields();
              }}
            >
              {isRegister ? '已有账号,马上登录' : '没有账号,马上注册'}
            </Button>
          </FormContainer>
        </LoginBox>
      </Container>
    </>
  );
};

export default connect()(LoginPage);
