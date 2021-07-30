/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import projectStorage from '@/utils/projectStorage';
import { Table } from 'antd';
import { RecycleRowData } from '@/types/recycleList';

const handleIdClick = (id: string) => {
  console.log('id', id);
  return id;
};
const columns = [
  {
    title: '学生id',
    dataIndex: 'studentId',
    width: 300,
    render: (text: string) => {
      return <a onClick={() => handleIdClick(text)}>{text}</a>;
    },
  },
  {
    title: '回收状态',
    dataIndex: 'status',
    sorter: (a: RecycleRowData, b: RecycleRowData) => {
      return a.status - b.status;
    },
  },
  {
    title: '客户名字',
    dataIndex: 'contactsName',
  },
];

const data: any[] = projectStorage.getItem('recycleList') || [];

export function List() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 240 }}
    />
  );
}
