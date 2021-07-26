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
