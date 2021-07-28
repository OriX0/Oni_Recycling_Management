/*
 * @Description: 虚拟列表
 * @Author: OriX
 * @LastEditors: OriX
 */
import { VList } from './VList';
import { WrapperContainer, SpanBottom, SpanTop } from './style';
import faker from 'faker';

const data: any = [];
const dataLength = 10000;
for (let id = 0; id < dataLength; ++id) {
  data.push({
    id,
    value: faker.lorem.sentences(),
  });
}

const userVisibleHeight = 800;
const estimateRowHeight = 94;
const bufferSize = 5;

export default function dummyComp() {
  return (
    <VList
      height={userVisibleHeight}
      total={dataLength}
      estimateRowHeight={estimateRowHeight}
      bufferSize={bufferSize}
      rowRenderer={(index: number, styleData: any) => {
        const item = index;
        return (
          <WrapperContainer
            key={item}
            style={styleData}
            onClick={() => {
              console.log('item-', index);
            }}
            id={`item-${index}`}
          >
            <SpanTop>Item - {data[index].id} Data:</SpanTop>
            <SpanBottom>{data[index].value}</SpanBottom>
          </WrapperContainer>
        );
      }}
    />
  );
}
