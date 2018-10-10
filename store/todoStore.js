import { action, observable, computed } from 'mobx'
import { generateUUID } from '../utils'

export default class TodoStore {
  @observable  todos = [];

  constructor(initialState) {
    this.todos = initialState ? initialState.todos : [];
  }

  @computed
  get doneCount() {
    return this.todos.filter(v => v.isDone).length;
  }

  @computed
  get count() {
    return this.todos.slice(0).length;
  }

  @computed
  get allChecked() {
    return this.todos.every(v => v.isDone);
  }

  @action
  initTodos = todos => {
    this.todos = todos;
  };

  @action
  addTodo = text => {
    this.todos.push({
      id: generateUUID(),
      isDone: false,
      text,
    });
  };

  @action
  clearDone = () => {
    this.todos = this.todos.filter(v => !v.isDone);
  };

  @action
  deleteTodo = index => {
    this.todos = this.todos.filter((v, i) => i !== index);
  };

  @action
  changeTodoState = (index, allCheckedFlag) => {
    this.todos = this.todos.map((v, i) => {
      if (allCheckedFlag) {
        v.isDone = allCheckedFlag !== 2;
      } else if (i === index) {
        v.isDone = !v.isDone;
      }
      return v;
    });
  };

  // getInitTodos = flow(function*() {
  //   const { data } = yield fetch('https://www.easy-mock.com/mock/5b5a7ae5b14d03439fb7f3f9/api/list');
  //   this.todos = data;
  // });
}