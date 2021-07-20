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
import { Button } from 'antd';

const LoginPage: FC = () => {
  const [isRegister, setIsRegister] = useState(true);

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
          <FormContainer>
            <img src={AvatarImg} alt="" style={{ width: 100 }} />
            <Title>回收管理系统</Title>
            {isRegister ? <LoginScreen /> : <RegisterScreens />}
            <Button
              type="link"
              onClick={() => {
                setIsRegister(!isRegister);
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

export default LoginPage;
