package org.testatoo.bdd.sample.todolist.features.steps

import org.testatoo.bdd.sample.todolist.features.domain.Todo
import cucumber.api.DataTable

import static org.testatoo.bdd.sample.todolist.specifications.components.ComponentFactory.*
import static org.testatoo.core.Testatoo.getChecked
import static org.testatoo.core.Testatoo.getUnchecked
import static org.testatoo.core.Testatoo.value

static void checkTable(DataTable data) {
    List<Todo> tasks = data.asList(Todo)
    tasks.eachWithIndex { Todo todo, int index -> (
            todo_list().items()[index].should {
                have value(todo.todo)
                be todo.done == 'yes' ? checked : unchecked
            }
    )}
}