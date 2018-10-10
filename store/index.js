import TodoStore from './todoStore'

let store = null

class Store {
  constructor (isServer, initialState) {
    this.todoStore = new TodoStore(initialState && initialState._todoStore);
  } 
}

export function initializeStore (isServer, initialState) {
  if (isServer) {
    return new Store(isServer, initialState)
  } else {
    if (store === null) {
      store = new Store(isServer, initialState)
    }
    return store
  }
}