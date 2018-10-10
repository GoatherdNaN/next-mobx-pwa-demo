import 'isomorphic-fetch'
import React from 'react';
import { inject, observer } from 'mobx-react'
import TodoHeader from '../../components/TodoHeader';
import TodoMain from '../../components/TodoMain';
import TodoFooter from '../../components/TodoFooter';
import styles from './index.less';

@inject('todoStore') 
@observer
class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://www.easy-mock.com/mock/5b5a7ae5b14d03439fb7f3f9/api/list');
    const json = await res.json()
    if(Array.isArray(json.data)) {
      return { _todoStore: { todos: json.data } };
    }
    return { _todoStore: { todos: [] } }
  };

  constructor(props) {
    super(props)
    props.todoStore.initTodos(props._todoStore.todos);
  }

  render() {
    const {
      count,
      todos,
      deleteTodo,
      clearDone,
      changeTodoState,
      addTodo,
      allChecked,
      doneCount
    } = this.props.todoStore;
    return (
      <div className={styles.panel}>
        <h1>
          TODOS：
          {count}
        </h1>
        <TodoHeader addTodo={addTodo} />
        <TodoMain
          todos={todos}
          deleteTodo={deleteTodo}
          changeTodoState={changeTodoState}
        />
        <TodoFooter
          allChecked={allChecked}
          doneCount={doneCount}
          clearDone={clearDone}
          changeTodoState={changeTodoState}
        />
      </div>
    );
  }
};
export default Index;