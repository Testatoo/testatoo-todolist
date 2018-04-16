import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Todo} from '../domain/todo';

@inject(HttpClient)
export class TodoRepository {
  constructor(client) {
    this.client = client;
    this.client.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('//localhost:8080');
    });
  }

  findAll() {
    return this.client.fetch('/todos')
      .then(response => response.json())
      .then(response => {
        let result = [];
        response.data.forEach((todo) => {
          result.push(Object.assign(new Todo(), todo));
        });
        return result;
      })
      .catch(() => {
        return [{todo: 'Write a poem', done: false}, {
          todo: 'Fix your broken iPad',
          done: false
        }, {todo: 'Read the latest news', done: true}];
      });
  }

  save(todo) {
    return this.client.fetch('/todos', {
      method: todo.id ? 'PUT' : 'POST',
      body: JSON.stringify(todo)
    });
  }
}

