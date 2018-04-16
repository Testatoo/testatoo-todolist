import {inject} from 'aurelia-framework';
import {TodoRepository} from './repository/todo-repository';
import {Todo} from './domain/todo';

@inject(TodoRepository)
export class App {
  constructor(repository) {
    this.repository = repository;

    this.todoField = '';
    this.todos = [];
    this.unCompleted = 0;
  }

  activate() {
    this.fetchTodos();
  }

  addTodo() {
    this.repository.save(new Todo(this.todoField)).then(() => {
      this.todoField = '';
      this.fetchTodos();
    });
  }

  toggle(todo) {
    todo.toggle();
    this.checkIncompleted();
    this.repository.save(todo);
  }

  fetchTodos() {
    this.repository.findAll().then(todos => {
      this.todos = todos;
      this.checkIncompleted();
    });
  }

  checkIncompleted() {
    this.unCompleted = this.todos.filter(todo => !todo.done).length;
  }
}
