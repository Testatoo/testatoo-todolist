Feature: UnCheck a todo in a todo list

  Scenario: Uncheck a todo
    #// tag::uncheck_todo[]
    Given Anna has already 3 todos in her todo list
      | done | todo                 |
      | no   | Write a poem         |
      | no   | Fix your broken iPad |
      | yes  | Read the latest news |

    When Anna unchecks 'Read the latest news'

    Then the todo should be unchecked
      | done | todo                 |
      | no   | Write a poem         |
      | no   | Fix your broken iPad |
      | no   | Read the latest news |
      #// end::uncheck_todo[]