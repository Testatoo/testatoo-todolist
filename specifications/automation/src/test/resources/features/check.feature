Feature: Check a todo in a todo list

  Scenario: Check a todo
    #// tag::check_todo[]
    Given Anna has already 3 todos in her todo list
      | done | todo                 |
      | no   | Write a poem         |
      | no   | Fix your broken iPad |
      | yes  | Read the latest news |

    When Anna checks 'Write a poem'

    Then the todo should be checked
      | done | todo                 |
      | yes  | Write a poem         |
      | no   | Fix your broken iPad |
      | yes  | Read the latest news |
    #// end::check_todo[]