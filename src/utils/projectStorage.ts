/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import CustomerStorage from './customerStorage';
import { RecycleRowData, RecycleStatus } from '@/types/recycleList';
import Mock from 'mockjs';
import { generateMockDataArr } from '.';

const projectStorage = new CustomerStorage();
// 默认缓存时长一个月
projectStorage.bootStrap({ mode: 'local', timeout: 60 * 60 * 24 * 30 });
// 生成回收列表的mock数据
const generateCount = 10;
function generateRecycleData(indexG: number): RecycleRowData {
  const tempStatus = Mock.mock('@integer(0,5)');
  if (tempStatus < 2) {
    return {
      studentId: Mock.mock('@integer(10000,30000)'),
      status: tempStatus,
      contactsName: Mock.mock('@cname'),
      contactsAddress: '',
      contactsPhone: '',
      contactsTime: '',
      indexG,
    };
  }
  return {
    studentId: Mock.mock('@integer(10000,30000)'),
    status: tempStatus,
    contactsName: Mock.mock('@cname'),
    contactsAddress: Mock.mock('@county(true)'),
    contactsPhone: Mock.mock(
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    ),
    contactsTime: Mock.mock('@date("MM-dd")@time("A HH:mm")'),
    indexG,
  };
}
const mockRecycleData = generateMockDataArr(generateCount, generateRecycleData);
projectStorage.setItem('recycleList', mockRecycleData);

export default projectStorage;
