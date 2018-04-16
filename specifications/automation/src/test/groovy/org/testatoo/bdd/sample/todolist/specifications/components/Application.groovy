package org.testatoo.bdd.sample.todolist.specifications.components

import org.testatoo.core.CssIdentifier
import org.testatoo.core.component.Component
import org.testatoo.core.support.property.TitleSupport

import static org.testatoo.core.Testatoo.getConfig

@CssIdentifier('body')
class Application extends Component implements TitleSupport {
    String title() {
        config.evaluator.eval(id(), "it.find('a.navbar-brand').text()")
    }
}
