import React from 'react';
import styles from '../pages/index/index.less';

class TodoHeader extends React.Component {
  // 绑定键盘回车事件，添加新任务
  handlerKeyUp = event => {
    if (event.keyCode === 13) {
      const text = event.target.value;
      if (!text) return false;
      event.target.value = '';
      this.props.addTodo(text);
    }
  };

  render() {
    return (
      <div className={styles['panel-header']}>
        <input type="text" onKeyUp={this.handlerKeyUp} placeholder="what's your task ?" />
      </div>
    );
  }
}

export default TodoHeader;
