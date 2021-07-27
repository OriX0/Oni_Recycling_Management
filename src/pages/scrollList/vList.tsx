/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */

import { ReactNode, FC, useState, useRef } from 'react';

// 接口---虚拟列表的props
export interface VirtualListProps {
  height: number;
  total: number;
  // 预估的行高
  estimateRowHeight: number;
  // 渲染单行   传入 index 和 样式数据
  rowRenderer: (index: number, styleDate: any) => any;
  // 缓冲数据
  bufferSize?: number;
  // 没有数据时候渲染的内容
  noDataContent?: ReactNode;
}
// 接口---缓存的元素的position
interface CachedPosition {
  index: number;
  top: number;
  bottom: number;
  //  实际高度
  height: number;
  //  数据差值
  dValue: number;
}

export const VList: FC<VirtualListProps> = (props) => {
  const [scrollTop, setScrollTop] = useState(0);
  // 定义三个ref容器
  // 最外部容器盒子
  const scrollingContainer = useRef<HTMLDivElement>(),
    // 虚拟盒子
    phantomContentRef = useRef<HTMLDivElement>(),
    // 真实盒子
    actualContentRef = useRef<HTMLDivElement>();
  // 解构参数
  const { height, total, estimateRowHeight } = props;
  // 缓冲 size
  const bufferSize = props.bufferSize || 5;
  // 每页显示的数量
  const limit = Math.ceil(height / estimateRowHeight);
  //  计算理论上 虚拟盒子的高度
  let phantomHeight = estimateRowHeight * total;
  // 初始化用于缓存记录index 的ref
  const retRef = useRef({
    originStartIdx: 0,
    startIndex: 0,
    endIndex: limit + bufferSize,
    cachedPositions: [] as CachedPosition[],
  });
  // 对endIndex进行重新计算
  retRef.current.endIndex = Math.min(
    retRef.current.originStartIdx + limit + bufferSize,
    total - 1,
  );
  // 初始计算 各个块所在的位置
  const initCachedPositions = () => {
    retRef.current.cachedPositions = [];
    for (let i = 0; i < total; ++i) {
      retRef.current.cachedPositions[i] = {
        index: i,
        height: estimateRowHeight,
        top: i * estimateRowHeight,
        bottom: (i + 1) * estimateRowHeight,
        dValue: 0,
      };
    }
  };
  // 更新 各个块实际所在位置
  const updateCachedPositions = () => {
    // 获取容器中当前渲染的所有items 实例
    const nodes: NodeListOf<any> | undefined =
      actualContentRef.current?.childNodes;
    // 获取第一个items
    const firstNode = nodes ? nodes[0] : null;
    nodes?.forEach((node: HTMLDivElement) => {
      if (!node) {
        // 对快速滚动进行处理
        return;
      }
      // 获取当前元素对于视窗的位置集合
      const rect = node.getBoundingClientRect();
      // 获得当前元素相对视窗的实际
      const { height } = rect;
      //  获得当前元素的index  提前在元素设置了 id： item-index
      const index = Number(node.id.split('-')[1]);
      // 获取估算出来的高度
      const oldHeight = retRef.current.cachedPositions[index].height;
      // 计算diff高度
      const dValue = oldHeight - height;
      // 更新数据
      if (dValue) {
        retRef.current.cachedPositions[index].height = height;
        retRef.current.cachedPositions[index].bottom -= dValue;
        retRef.current.cachedPositions[index].dValue = dValue;
      }
    });
    //
    let startIdx = 0;
    // 获取当前的第一个索引
    if (firstNode) {
      startIdx = Number(firstNode.id.split('-')[1]);
    }
    const cachedPositionsLen = retRef.current.cachedPositions.length;
    // 累积起来相差的高度
    let cumulativeDiffHeight = retRef.current.cachedPositions[startIdx].dValue;
    retRef.current.cachedPositions[startIdx].dValue = 0;
    // 更新数据 并计算累积相差的值
    for (let i = startIdx + 1; i < cachedPositionsLen; ++i) {
      const item = retRef.current.cachedPositions[i];
      // update height
      retRef.current.cachedPositions[i].top =
        retRef.current.cachedPositions[i - 1].bottom;
      retRef.current.cachedPositions[i].bottom =
        retRef.current.cachedPositions[i].bottom - cumulativeDiffHeight;
      if (item.dValue !== 0) {
        cumulativeDiffHeight += item.dValue;
        item.dValue = 0;
      }
    }
    // 更新虚拟盒子的高度
    const height =
      retRef.current.cachedPositions[cachedPositionsLen - 1].bottom;
    phantomHeight = height;
    // 更新  phantomContentRef.current 的高度
    phantomContentRef.current
      ? (phantomContentRef.current.style.height = `${height}px`)
      : null;
  };

  return <></>;
};
