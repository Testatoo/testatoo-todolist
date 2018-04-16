Feature: Add a todo in a todo list

  Scenario: Add a todo
    #// tag::add_todo[]
    Given Anna has already 3 todos in her todo list
      | done | todo                 |
      | no   | Write a poem         |
      | no   | Fix your broken iPad |
      | yes  | Read the latest news |

    When Anna adds 'Call the doctor' as a new todo

    Then Anna should have 4 todos in her todo list
      | done | todo                 |
      | no   | Write a poem         |
      | no   | Fix your broken iPad |
      | yes  | Read the latest news |
      | no   | Call the doctor      |
    #// end::add_todo[]