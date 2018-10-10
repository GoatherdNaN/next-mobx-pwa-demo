import React from 'react';
import TodoItem from './TodoItem';
import styles from '../pages/index/index.less';

export default class TodoMain extends React.Component {
  // 遍历显示任务，转发props
  render() {
    return (
      <ul className={styles['todo-list']}>
        {this.props.todos.length ? (
          this.props.todos.map((todo, index) => (
            <TodoItem key={todo.id} {...todo} index={index} {...this.props} />
          ))
        ) : (
          <li>No Data</li>
        )}
      </ul>
    );
  }
}
