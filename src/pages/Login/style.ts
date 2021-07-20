/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import styled from 'styled-components';
import { Form } from 'antd';
// 背景图
export const BgImgWrapper = styled.div`
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
// 中心内容块
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;
  @media screen and (max-width: 1080px) {
    grid-gap: 9rem;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
// 左侧插画
export const LeftImgWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 1024px) {
    > img {
      width: 360px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
// 右侧 login box
export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;
export const Title = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
`;
// form
export const FormContainer = styled(Form)`
  width: 360px;
  input {
    padding: 0.3rem 0.5rem;
    font-size: 1.2rem;
    color: #555;
  }
  .ant-btn-link > span {
    text-align: right;
  }
  @media screen and (max-width: 1024px) {
    width: 290px;
    > h2 {
      font-size: 1.6rem;
      margin: 8px 0;
    }
    > img {
      width: 360px;
    }
  }
`;
