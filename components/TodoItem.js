import React from 'react';
import styles from '../pages/index/index.less';

export default class TodoItem extends React.Component {
  // 鼠标移入
  handlerMouseOver = () => {
    this.deleteBtn.style.display = 'inline';
  };

  // 鼠标移出
  handlerMouseOut = () => {
    this.deleteBtn.style.display = 'none';
  };

  // 删除当前任务
  handlerDelete = () => {
    this.props.deleteTodo(this.props.index);
  };

  render() {
    const { isDone, index, text, changeTodoState } = this.props;
    const doneStyle = {
      textDecoration: isDone ? 'line-through' : 'none',
    };
    return (
      <li onMouseOver={this.handlerMouseOver} onMouseOut={this.handlerMouseOut}>
        <input type="checkbox" checked={isDone} onChange={() => changeTodoState(index)} />
        <span style={doneStyle}>{text}</span>
        <button
          type="button"
          ref={el => {
            this.deleteBtn = el;
          }}
          onClick={this.handlerDelete}
          className={styles.fr}
          style={{
            display: 'none',
          }}>
          删除
        </button>
      </li>
    );
  }
}
