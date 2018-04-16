package org.testatoo.bdd.sample.todolist.features.steps

import cucumber.api.DataTable
import cucumber.api.groovy.EN
import cucumber.api.groovy.Hooks

import static org.testatoo.bdd.sample.todolist.features.steps.common.checkTable
import static org.testatoo.bdd.sample.todolist.specifications.components.ComponentFactory.*
import static org.testatoo.core.Testatoo.*

this.metaClass.mixin(Hooks)
this.metaClass.mixin(EN)

Given(~/^(.*) has already (\d+) todos in her todo list$/) { String user, int number, DataTable data ->
    waitUntil { todo_list().items().size() == number }
    checkTable(data)
}

When(~/^(.*) adds '(.*)' as a new todo/) { String user, String todo ->
    fill textField("What's need to be done ?") with todo
    clickOn button('Add')
}

Then(~/^(.*) should have (\d+) todos in her todo list$/) { String user, int number, DataTable data ->
    waitUntil { todo_list().items().size() == number }
    checkTable(data)
}
