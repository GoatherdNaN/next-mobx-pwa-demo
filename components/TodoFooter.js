import React from 'react';
import classNames from 'classnames';
import styles from '../pages/index/index.less';

export default class TodoFooter extends React.Component {
  // 处理全选与全不选的状态
  handlerAllState = () => {
    const { allChecked, changeTodoState } = this.props;
    const allCheckedFlag = allChecked ? 2 : 1;
    changeTodoState(null, allCheckedFlag);
  };

  render() {
    const { allChecked, doneCount, clearDone } = this.props;
    return (
      <div className={classNames(styles.clearfix, styles['todo-footer'])}>
        <input
          type="checkbox"
          className={styles.fl}
          checked={allChecked}
          onChange={this.handlerAllState}
        />
        <span className={styles.fl}>
          已完成：
          {doneCount}
        </span>
        <button type="button" onClick={clearDone} className={styles.fr}>
          清除已完成
        </button>
      </div>
    );
  }
}
