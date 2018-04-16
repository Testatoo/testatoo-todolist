package org.testatoo.bdd.sample.todolist.specifications

import com.github.tomakehurst.wiremock.junit.WireMockRule
import org.junit.Before
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import org.testatoo.bdd.sample.todolist.WebDriverConfig

import static org.testatoo.bdd.sample.todolist.specifications.components.ComponentFactory.*
import static com.github.tomakehurst.wiremock.client.WireMock.*
import static org.testatoo.core.Testatoo.*

@RunWith(JUnit4)
class SpecificationsTest {
    @ClassRule
    public static WebDriverConfig driver = new WebDriverConfig()

    @Rule
    public WireMockRule server = new WireMockRule(8080)

    @Before
    void setUp() {
        server.stubFor(get(urlEqualTo('/todos'))
                .willReturn(aResponse()
                .withHeader('Content-Type', 'application/json')
                .withStatus(200)
                .withBody(this.class.getResource('/data/todos_1.json').text)
        ))

        visit 'http://localhost:9000'
    }

    @Test
    void application_should_have_expected_title() {
        // tag::application_title[]
        application().should { have title('Todo List') }
        // end::application_title[]
    }

    @Test
    void task_form_should_have_expected_properties_and_behaviours() {
        // tag::form[]
        textField("What's need to be done ?").should {
            be focused
            have length(30)
            be empty
        }

        button('Add').should { be disabled }

        fill textField("What's need to be done ?") with 'Call the doctor'
        button('Add').should { be enabled }
        // end::form[]
    }

    @Test
    void task_list_should_have_expected_behaviours() {
        // tag::todo_list[]
        todo_list().should {
            have 4.items
            have items('Write a poem', 'Fix your broken iPad', 'Read the latest news', 'Catch up on your television shows')
        }

        todo_list().item('Write a poem') should { be unchecked }
        todo_list().item('Fix your broken iPad') should { be unchecked }
        todo_list().item('Read the latest news') should { be checked }
        todo_list().item('Catch up on your television shows') should { be unchecked }

        task_counter().should { have text('3 todo(s) left') }
        // end::todo_list[]
    }
}
