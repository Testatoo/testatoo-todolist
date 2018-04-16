export class Todo {
  constructor(title) {
    this.id = null;
    this.todo = title;
    this.done = false;
  }

  toggle() {
    this.done = !this.done;
  }
}
