/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import styled from 'styled-components';

export const VListContainer = styled.div<{ height: number }>`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #e8e8e8;
  height: ${(props) => props.height + 'px'};
`;

export const PhantomContent = styled.div``;
export const WrapperContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #000;
`;
export const SpanTop = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0, 85);
  font-weight: 500;
  font-size: 14px;
`;
export const SpanBottom = styled.span`
  width: 100%;
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
`;
