import { machine } from "asyncmachine"
import * as filter_types from "./constants/TodoFilters"

const state = {
  AddingTodo: {},
  TodoAdded: { drop: ["AddingTodo"] },

  EditingTodo: {},
  TodoEdited: { drop: ["EditingTodo"] },

  DeletingTodo: {},
  TodoDeleted: { drop: ["DeletingTodo"] },

  CompletingTodo: {},
  TodoCompleted: { drop: ["CompletingTodo"] },

  CompletingAllTodos: {},
  AllTodosCompleted: { drop: ["CompletingAllTodos"] },

  ClearingCompleted: {},
  CompletedCleared: { drop: ["ClearingCompleted"] },

  SetVisibilityFilter: {}
}

export default class Manager {
  constructor() {
    this.state = machine(state)
    this.data = new Data()
    this.state
      .setTarget(this)
      .id("todos")
      .logLevel(1)
  }

  // ADD

  AddingTodo_enter(text) {
    return Boolean(text)
  }

  AddingTodo_state(text) {
    this.data.todos.push({ id: Math.random(), text, completed: false })
    this.state.add("TodoAdded")
  }

  TodoAdded_state() {
    this.state.drop("TodoAdded")
  }

  // EDIT

  EditingTodo_enter(id) {
    if (!this.data.get(id)) {
      return false
    }
  }

  EditingTodo_state(id, text) {
    this.data.get(id).text = text
    this.state.add("TodoEdited")
  }

  TodoEdited_state() {
    this.state.drop("TodoEdited")
  }

  // DELETE

  DeletingTodo_enter(id) {
    if (!this.data.get(id)) {
      return false
    }
  }

  DeletingTodo_state(id) {
    const index = this.data.todos.findIndex(t => t.id === id)
    // I regret nothing...
    this.data.todos.splice(index, 1)
    this.state.add("TodoDeleted")
  }

  TodoDeleted_state() {
    this.state.drop("TodoDeleted")
  }

  // COMPLETE
  // handles both - completing and un-completing

  CompletingTodo_enter(id) {
    if (!this.data.get(id)) {
      return false
    }
  }

  CompletingTodo_state(id, state) {
    this.data.get(id).completed = !!state
    this.state.add("TodoCompleted")
  }

  TodoCompleted_state() {
    this.state.drop("TodoCompleted")
  }

  SetVisibilityFilter_state(filter) {
    this.data.visibilityFilter = filter
    this.state.drop('SetVisibilityFilter')
  }

  // CLEAR COMPLETED

  ClearingCompleted_state() {
    this.data.todos = this.data.todos.filter(t => !t.completed)
    this.state.add("CompletedCleared")
}
}

export class Data {
  get activeCount() {
    return this.filtered_todos.length - this.completedCount
  }

  get completedCount() {
    return this.todos.filter(t => t.completed).reduce((ret, t) => ++ret, 0)
  }

  get filtered_todos() {
    const t = filter_types
    switch (this.visibilityFilter) {
      case t.SHOW_ACTIVE:
        return this.todos.filter(t => !t.completed)
      case t.SHOW_COMPLETED:
        return this.todos.filter(t => t.completed)
      default:
        return this.todos
    }
  }

  constructor() {
    this.todos = []
    this.visibilityFilter = filter_types.SHOW_ALL
  }

  get(id) {
    return this.todos.find(t => t.id === id)
  }
}
