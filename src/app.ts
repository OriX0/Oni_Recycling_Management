/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { RequestConfig } from 'umi';
export const dva = {
  config: {
    onError(e: Error) {
      console.log('some error', e.message);
    },
  },
};
export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.errCode === 0,
        errorMessage: resData.message,
        data: resData.data,
      };
    },
  },
};
