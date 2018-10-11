import TodoStore from './todoStore'

let store = null

class Store {
  constructor (initialState) {
    this.todoStore = new TodoStore(initialState && initialState._todoStore);
  } 
}

export function initializeStore (isServer, initialState) {
  if (isServer) {
    return new Store(initialState)
  } else {
    if (store === null) {
      store = new Store(initialState)
    }
    return store
  }
}