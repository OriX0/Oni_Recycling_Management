/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */

export const dva = {
  config: {
    onError(e: Error) {
      console.log('some error', e.message);
    },
  },
};
