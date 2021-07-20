/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import styled from 'styled-components';
import { Button, Input } from 'antd';

export const LongBtn = styled(Button)<{ height?: number }>`
  display: block;
  width: 88%;
  height: ${(props) =>
    typeof props.height === 'number' ? props.height + 'rem' : '50px'};
  border-radius: 25px;
  margin: 1rem auto;
  font-size: 1.2rem;
  outline: none;
  border: none;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  transition: 0.5s;
`;
