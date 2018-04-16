package org.testatoo.bdd.sample.todolist.features.steps

import cucumber.api.DataTable
import cucumber.api.groovy.EN
import cucumber.api.groovy.Hooks

import static org.testatoo.bdd.sample.todolist.features.steps.common.checkTable
import static org.testatoo.bdd.sample.todolist.specifications.components.ComponentFactory.*
import static org.testatoo.core.Testatoo.clickOn

this.metaClass.mixin(Hooks)
this.metaClass.mixin(EN)

When(~/^(.*) checks '(.*)'$/) { String user, String todo ->
    clickOn todo_list().item(todo)
}

When(~/^(.*) unchecks '(.*)'$/) { String user, String todo ->
    clickOn todo_list().item(todo)
}

Then(~/^the todo should be (.*)/) { String state, DataTable data ->
    checkTable(data)
}

