package org.testatoo.bdd.sample.todolist.features

import cucumber.api.CucumberOptions
import cucumber.api.junit.Cucumber
import org.junit.runner.RunWith

@RunWith(Cucumber)
@CucumberOptions(
        plugin = ['pretty', 'html:target/html', 'json:target/cucumber.json'],
        strict = true,
        features=['src/test/resources/features'],
        glue=['src/test/groovy/org/testatoo/bdd/sample/todolist/features/steps']
)
class FeatureTest {}