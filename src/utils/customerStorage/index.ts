/*
 * @Description: storage缓存封装
 * @Author: OriX
 * @LastEditors: OriX
 */
import { IStorageBootStrapConfig, IStorageValueFormat } from './types';
import { hasStringify } from './utils';

// 类部分
class CustomerStorage {
  // 初始化
  private readStorage: Storage;
  private config: IStorageBootStrapConfig;
  // 环境判断
  constructor() {
    if (window && window.localStorage && window.sessionStorage) {
      this.readStorage = window.localStorage;
    } else {
      throw new Error('当前环境非浏览器，无法消费全局window实例。');
    }
    // 给config 默认值
    this.config = { mode: 'local', timeout: 1000 * 24 * 60 };
  }
  /**  根据传入的配置初始化
   * @param config
   * @config mode local | session
   * @config timeout number
   */
  bootStrap(config: IStorageBootStrapConfig): void {
    // 根据model 进行初始化
    switch (config.mode) {
      case 'session':
        this.readStorage = window.sessionStorage;
        break;
      case 'local':
        this.readStorage = window.localStorage;
        break;
      default:
        throw new Error('未找到对应model 请先进行相关配合');
    }
    this.config = config;
  }
  /**
   * 获取所有key
   * @returns 回storage当中所有key集合
   */
  getKeys(): Array<string> {
    return Object.keys(this.readStorage);
  }

  /**
   * 获取所有value
   * @returns 所有数据集合
   */
  getValues() {
    return Object.values(this.readStorage);
  }
  // 判断是否有该值 该key
  hasItem(key: string) {
    return this.readStorage.hasOwnProperty(key);
  }
  // 设置值
  setItem(key: string, value: unknown) {
    if (hasStringify(value)) {
      // 计算过期时间
      const saveTimeStamp = +new Date();
      const saveData: IStorageValueFormat = {
        saveTimeStamp,
        data: value,
      };

      this.readStorage.setItem(key, JSON.stringify(saveData));
    } else {
      throw new Error('JSON.stringify方法无法传入的数据,请检查数据');
    }
  }
  // 获取值   增 改
  getItem<T>(key: string): T | null {
    const content: IStorageValueFormat | null = this.hasItem(key)
      ? JSON.parse(this.readStorage.getItem(key) as string)
      : null;
    if (
      content?.saveTimeStamp &&
      +new Date() - content.saveTimeStamp >= this.config.timeout
    ) {
      return null;
    }
    return content?.data || null;
  }
  // 删除一条值
  removeItem(key: string) {
    if (this.hasItem(key)) {
      this.readStorage.removeItem(key);
    }
  }
  // 获取长度
  size(): number {
    return this.readStorage.length;
  }
  // 清除所有
  clearAll() {
    this.readStorage.clear();
  }
}
export default CustomerStorage;
