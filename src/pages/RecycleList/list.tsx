/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import projectStorage from '@/utils/projectStorage';
import { Button, Table } from 'antd';
import { RecycleRowData } from '@/types/recycleList';
import { useRecycleListModal } from './utils';
import RecycleListModal from './recycleModel';
import { useDispatch } from 'umi';
import { RecycleStatusCN } from '@/types/recycleList';

const data: any[] = projectStorage.getItem('recycleList') || [];

export function List() {
  const { startEdit } = useRecycleListModal();
  // 获取当前id  item的具体信息
  const dispatch = useDispatch();

  const columns = [
    {
      title: '学生id',
      dataIndex: 'studentId',
      width: 300,
      render: (text: string, record: RecycleRowData) => {
        return (
          <Button
            type="link"
            onClick={() => {
              dispatch({
                type: 'recycleList/changeCurrent',
                payload: record.studentId,
              });
              startEdit(record.studentId);
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: '回收状态',
      dataIndex: 'status',
      sorter: (a: RecycleRowData, b: RecycleRowData) => {
        return a.status - b.status;
      },
      render: (text: string) => {
        return RecycleStatusCN[+text];
      },
    },
    {
      title: '客户名字',
      dataIndex: 'contactsName',
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
      />
      <RecycleListModal />
    </>
  );
}
