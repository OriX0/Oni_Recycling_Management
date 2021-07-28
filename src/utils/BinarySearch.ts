/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
// 枚举定义结果
export enum CompareResult {
  eq = 1,
  lt,
  gt,
}

export function binarySearch<T, VT>(
  list: T[],
  value: VT,
  compareFn: (currentValue: T, findValue: VT) => CompareResult,
) {
  let start = 0;
  let end = list.length - 1;
  let middleIndex = null;
  while (start <= end) {
    middleIndex = Math.floor((start + end) / 2);
    let middleValue = list[middleIndex];
    let compareRes: CompareResult = compareFn(middleValue, value);
    if (compareRes === CompareResult.eq) {
      return middleIndex;
    }
    if (compareRes === CompareResult.lt) {
      start = middleIndex + 1;
    }
    if (compareRes === CompareResult.gt) {
      end = middleIndex - 1;
    }
  }
  return middleIndex;
}
