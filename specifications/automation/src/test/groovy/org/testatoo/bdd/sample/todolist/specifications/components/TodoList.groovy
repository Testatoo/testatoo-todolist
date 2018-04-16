package org.testatoo.bdd.sample.todolist.specifications.components

import org.testatoo.bundle.html5.list.Ul
import org.testatoo.core.By

class TodoList extends Ul {
    @Override
    List<Todo> items() {
        find(By.css('li'), Todo)
    }
}
