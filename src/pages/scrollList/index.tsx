/*
 * @Description: 虚拟列表
 * @Author: OriX
 * @LastEditors: OriX
 */
import { FC, useRef, useState } from 'react';
import { VListContainer } from './style';

// 常量部分
const height = 800;
const total = 1000;
const rowHeight = 80;
// 预加载部分
const bufferSize = 5;
// 单个页面能展示的数量
const limit = Math.ceil(height / rowHeight);
// 单行渲染
const rowRenderer = ({ index, style }: { index: number; style: any }) => {
  return (
    <li key={index} style={style}>
      item-{index}
    </li>
  );
};

const ScrollList: FC = () => {
  console.log('render');
  const [scrollTop, setScrollTop] = useState(0);
  // 定义变量 保存
  const propertyRef = useRef({
    originStartIdx: 0,
    startIndex: 0,
    endIndex: limit,
  });
  propertyRef.current.startIndex = Math.max(
    propertyRef.current.originStartIdx - bufferSize,
    0,
  );
  propertyRef.current.endIndex = Math.min(
    propertyRef.current.startIndex + limit + bufferSize,
    total - 1,
  );
  // 当前正在滚动的元素
  let scrollingContainerRef = useRef(null);
  // 渲染出相应的数据
  const renderDisplayContent = () => {
    const content = [];
    const { startIndex, endIndex } = propertyRef.current;
    for (let index: number = startIndex; index <= endIndex; index++) {
      content.push(
        rowRenderer({
          index,
          style: {
            height: rowHeight - 1 + 'px',
            lineHeight: rowHeight + 'px',
            borderBottom: '1px solid #000',
            width: '100%',
          },
        }),
      );
    }
    return content;
  };
  const getTransform = () => {
    const result = `translate3d(0,${
      scrollTop -
      (scrollTop % rowHeight) -
      Math.min(propertyRef.current.originStartIdx, bufferSize) * rowHeight
    }px,0)`;
    console.log(result);
    return result;
  };
  const handleScroll = (e: any) => {
    // 先判断滚动的触发元素是否为 指定的元素
    if (e.target === scrollingContainerRef.current) {
      console.log('开始滚动1');
      // 读取当前已滚动
      const { scrollTop } = e.target;
      // 读取当前滚动过去的index
      const currentStartIndex = Math.floor(scrollTop / rowHeight);
      // 如果滚动过去的index  不等于 originStart 说明向下滚动了
      if (propertyRef.current.originStartIdx !== currentStartIndex) {
        // 赋值 originStart 为 当前滚动过去的index
        propertyRef.current.originStartIdx = currentStartIndex;
        // 设置视图 start index 为 当前的index-缓冲的值
        propertyRef.current.startIndex = Math.max(
          currentStartIndex - bufferSize,
          0,
        );
        // 设置视图的 end index 为 buffer加start+limit
        propertyRef.current.endIndex = Math.min(
          currentStartIndex + limit + bufferSize,
          total - 1,
        );
        setScrollTop(scrollTop);
      }
    }
  };
  return (
    <VListContainer
      ref={scrollingContainerRef}
      height={height}
      onScroll={(e) => handleScroll(e)}
    >
      <div
        style={{
          height: total * rowHeight,
          position: 'relative',
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          transform: getTransform(),
        }}
      >
        {renderDisplayContent()}
      </div>
    </VListContainer>
  );
};

export default ScrollList;
