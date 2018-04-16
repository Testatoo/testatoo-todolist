package org.testatoo.bdd.sample.todolist.specifications.components

import org.testatoo.bundle.html5.P
import org.testatoo.core.component.ListView

import static org.testatoo.core.Testatoo.$

class ComponentFactory {
    static Application application() { $('body') as Application }
    static ListView todo_list() { $('ul:first') as TodoList }
    static P task_counter() { $('p.todo-footer') as P }
}
