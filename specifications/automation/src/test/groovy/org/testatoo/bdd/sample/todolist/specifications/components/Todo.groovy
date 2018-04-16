package org.testatoo.bdd.sample.todolist.specifications.components

import org.testatoo.bundle.html5.list.Li
import org.testatoo.core.support.state.CheckSupport

import static org.testatoo.core.Testatoo.getConfig

class Todo extends Li implements CheckSupport {
    @Override
    String value() {
        config.evaluator.eval(id(), "it.find('span:first').text()")
    }

    boolean checked() {
        config.evaluator.check(id(), "it.find('span.material-icons').is(':visible')")
    }
}
