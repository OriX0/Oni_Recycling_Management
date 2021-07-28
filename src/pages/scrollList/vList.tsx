/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */

import { binarySearch, CompareResult } from '@/utils/BinarySearch';
import { ReactNode, FC, useState, useRef, useEffect } from 'react';
import { useDebounceFn } from 'ahooks';

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
  console.log('render');
  const [scrollTop, setScrollTop] = useState(0);
  const { run: debounceSetScroll } = useDebounceFn(setScrollTop, { wait: 200 });
  // 定义三个ref容器
  // 最外部容器盒子
  const scrollingContainerRef = useRef<HTMLDivElement>(null),
    // 虚拟盒子
    phantomContentRef = useRef<HTMLDivElement>(null),
    // 真实盒子
    actualContentRef = useRef<HTMLDivElement>(null);
  // 解构参数
  let { height, total, estimateRowHeight, rowRenderer, noDataContent } = props;
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
  // 第一次进入初始化 调用init进行计算
  useEffect(() => {
    console.log('total');
    initCachedPositions();
  }, [total]);

  // 初始计算 所有的item理论所在的位置
  function initCachedPositions() {
    console.log('initCachedPositions 初始计算 各个块所在的位置');
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
  }
  // 更新真实item区 各个块（buffer+content+buffer）实际所在的位置
  function updateCachedPositions() {
    console.log('更新 各个块实际所在位置');
    // 获取容器中当前渲染的 即  buffer+可视+ buffer 的所有 item实例的信息
    const nodes: NodeListOf<any> | undefined =
      actualContentRef.current?.childNodes;
    console.log(nodes);
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
      const oldHeight = retRef.current.cachedPositions[index]?.height;
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
    let cumulativeDiffHeight = retRef.current.cachedPositions[startIdx]
      ? retRef.current.cachedPositions[startIdx]?.dValue
      : 0;
    retRef.current.cachedPositions[startIdx]
      ? (retRef.current.cachedPositions[startIdx].dValue = 0)
      : null;
    // 更新数据 并计算累积相差的值
    for (let i = startIdx + 1; i < cachedPositionsLen; ++i) {
      const item = retRef.current.cachedPositions[i];
      // update height
      // item的top值为上一个item的
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
    const height = retRef.current.cachedPositions[cachedPositionsLen - 1]
      ? retRef.current.cachedPositions[cachedPositionsLen - 1].bottom
      : 0;
    phantomHeight = height;
    // 更新  phantomContentRef.current 的高度
    phantomContentRef.current
      ? (phantomContentRef.current.style.height = `${height}px`)
      : null;
  }
  // 查找并获取当前start的块元素的index
  function getStartIndex(scrollTop = 0) {
    console.log('查找并获取当前start的块元素的index');
    // 二分法查找当前start的块元素的index
    let idx = binarySearch<CachedPosition, number>(
      retRef.current.cachedPositions,
      scrollTop,
      (currentValue: CachedPosition, targetValue: number) => {
        const currentBottomPosition = currentValue?.bottom;
        if (currentBottomPosition === targetValue) {
          return CompareResult.eq;
        }
        if (currentBottomPosition < targetValue) {
          return CompareResult.lt;
        }
        return CompareResult.gt;
      },
    );
    // 读取当前item
    const targetItem = retRef.current.cachedPositions[Number(idx)];
    // 兼容处理 返回值是实际值减一的情况
    if (targetItem?.bottom < scrollTop) {
      idx = Number(idx) + 1;
    }
    return idx;
  }
  // 重置实际列表中的所有的参数 当数据重新传入时
  const resetAllVirtualParam = () => {
    console.log('重置实际列表中的所有的参数');
    // 重置retRef中的参数
    retRef.current = {
      originStartIdx: 0,
      startIndex: 0,
      endIndex: Math.min(
        retRef.current.originStartIdx + limit + bufferSize,
        total - 1,
      ),
      cachedPositions: [] as CachedPosition[],
    };
    // 重置最外层滚动盒子的scrollTop
    scrollingContainerRef.current
      ? (scrollingContainerRef.current.scrollTop = 0)
      : null;
    // 重新初始化 各个快所在位置
    initCachedPositions();
    //  计算理论上 虚拟盒子的高度
    phantomHeight = estimateRowHeight * total;
    // 设置状态中的scrollTop为0
    setScrollTop(0);
  };
  // 滚动事件
  function handleOnScroll(evt: any) {
    console.log('滚动事件触发');
    if (evt.target === scrollingContainerRef.current) {
      const { scrollTop } = evt.target;
      // 基于当前滚动 计算出当前 视图开始的index
      const currentStartIndex = getStartIndex(scrollTop);
      console.log('获取到了', currentStartIndex);
      if (retRef.current.originStartIdx !== currentStartIndex) {
        retRef.current.originStartIdx = currentStartIndex as number;
        retRef.current.startIndex = Math.max(
          retRef.current.originStartIdx - bufferSize,
          0,
        );
        retRef.current.endIndex = Math.min(
          retRef.current.originStartIdx + limit + bufferSize,
          total - 1,
        );
        debounceSetScroll(scrollTop);
      }
    }
  }
  // 渲染隐藏部分的内容
  function renderDisplayContent() {
    console.log('渲染隐藏部分的内容');
    const content = [];
    const { startIndex, endIndex } = retRef.current;
    for (let i = startIndex; i <= endIndex; i++) {
      content.push(
        rowRenderer(i, {
          left: 0,
          right: 0,
          width: '100%',
        }),
      );
    }
    return content;
  }
  // 获取translate偏移量
  function getTransform() {
    console.log('获取translate偏移量');
    return `
      translate3d(0,${
        retRef.current.startIndex >= 1
          ? retRef.current.cachedPositions[retRef.current.startIndex - 1].bottom
          : 0
      }px,0)
    `;
  }
  useEffect(() => {
    console.log('useEffect');
    if (total !== props.total) {
      total = props.total;
      resetAllVirtualParam();
      return;
    }
    if (actualContentRef.current && total > 0) {
      updateCachedPositions();
    }
  }, [scrollTop]);
  return (
    <div
      ref={scrollingContainerRef}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        height,
        position: 'relative',
      }}
      onScroll={handleOnScroll}
    >
      <div
        ref={phantomContentRef}
        style={{
          height: phantomHeight,
          position: 'relative',
        }}
      ></div>
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          transform: getTransform(),
        }}
        ref={actualContentRef}
      >
        {renderDisplayContent()}
      </div>
      {total === 0 && (noDataContent || 'null')}
    </div>
  );
};
