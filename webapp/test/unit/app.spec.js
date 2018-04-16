import {Todo} from '../../src/domain/todo';

describe('Todo', () => {
  it('Should be created with a title and unchecked', () => {
    let todo = new Todo('Task 1');
    expect(todo.id).toBe(null);
    expect(todo.title).toBe('Task 1');
    expect(todo.done).toBe(false);
  });

  it('Should be possible to toggle the todo', () => {
    let todo = new Todo('Task 2');
    expect(todo.done).toBe(false);

    todo.toggle();
    expect(todo.done).toBe(true);

    todo.toggle();
    expect(todo.done).toBe(false);
  });
});
