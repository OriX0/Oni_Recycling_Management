/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { ConnectRC } from '@/.umi/plugin-dva/connect';
import { connect } from '@/.umi/plugin-dva/exports';
import styles from './index.less';

const IndexPage: ConnectRC = (props) => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button
        onClick={() => {
          props.dispatch({
            type: 'user/loginOut',
            payload: null,
          });
        }}
      >
        退出登录
      </button>
    </div>
  );
};
export default connect()(IndexPage);
