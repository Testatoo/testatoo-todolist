package org.testatoo.bdd.sample.todolist.features.steps

import org.testatoo.bdd.sample.todolist.WebDriverConfig
import com.github.tomakehurst.wiremock.WireMockServer
import cucumber.api.groovy.EN
import cucumber.api.groovy.Hooks

import static com.github.tomakehurst.wiremock.client.WireMock.*
import static com.github.tomakehurst.wiremock.stubbing.Scenario.STARTED
import static org.testatoo.core.Testatoo.visit

this.metaClass.mixin(Hooks)
this.metaClass.mixin(EN)

WebDriverConfig driver = new WebDriverConfig()
WireMockServer server = new WireMockServer(8080)

Before() {
    driver.before()

    server.start()
    server.resetAll()
    server.stubFor(get(urlEqualTo('/todos')).inScenario("todo")
            .whenScenarioStateIs(STARTED)
            .willReturn(aResponse()
            .withHeader('Content-Type', 'application/json')
            .withStatus(200)
            .withBody(this.class.getResource('/data/todos_2.json').text)
    ).willSetStateTo('task added'))

    server.stubFor(post(urlEqualTo('/todos')).inScenario("todo")
            .whenScenarioStateIs('task added')
            .willReturn(aResponse()
            .withStatus(201)
    ))

    server.stubFor(get(urlEqualTo('/todos')).inScenario("todo")
            .whenScenarioStateIs('task added')
            .willReturn(aResponse()
            .withHeader('Content-Type', 'application/json')
            .withStatus(200)
            .withBody(this.class.getResource('/data/todos_3.json').text)
    ))

    visit 'http://localhost:9000'
}

After() {
    server.stop()
    driver.after()
}