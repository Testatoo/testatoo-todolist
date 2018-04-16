define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['bootstrap/css/bootstrap.css', 'assets/style/main.css']);
  }
});
define('repository/todo-repository',['exports', 'aurelia-framework', 'aurelia-fetch-client', '../domain/todo'], function (exports, _aureliaFramework, _aureliaFetchClient, _todo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TodoRepository = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TodoRepository = exports.TodoRepository = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function TodoRepository(client) {
      _classCallCheck(this, TodoRepository);

      this.client = client;
      this.client.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('//localhost:8080');
      });
    }

    TodoRepository.prototype.findAll = function findAll() {
      return this.client.fetch('/todos').then(function (response) {
        return response.json();
      }).then(function (response) {
        var result = [];
        response.data.forEach(function (todo) {
          result.push(Object.assign(new _todo.Todo(), todo));
        });
        return result;
      }).catch(function () {
        return [{ todo: 'Write a poem', done: false }, {
          todo: 'Fix your broken iPad',
          done: false
        }, { todo: 'Read the latest news', done: true }];
      });
    };

    TodoRepository.prototype.save = function save(todo) {
      return this.client.fetch('/todos', {
        method: todo.id ? 'PUT' : 'POST',
        body: JSON.stringify(todo)
      });
    };

    return TodoRepository;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('domain/todo',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Todo = exports.Todo = function () {
    function Todo(title) {
      _classCallCheck(this, Todo);

      this.id = null;
      this.todo = title;
      this.done = false;
    }

    Todo.prototype.toggle = function toggle() {
      this.done = !this.done;
    };

    return Todo;
  }();
});
define('text!assets/style/main.css', ['module'], function(module) { module.exports = "body {\n  background-color: gray; }\n\n.nopadding {\n  padding: 0 !important;\n  margin: 0 !important; }\n\n.todo-footer {\n  background-color: #F4FCE8;\n  padding: 10px 20px; }\n\ninput {\n  width: 25em !important; }\n\nli.checked span:first-child + span:hover {\n  text-decoration: line-through; }\n\nli.checked span:first-child {\n  text-decoration: line-through; }\n"; });
define('app',['exports', 'aurelia-framework', './repository/todo-repository', './domain/todo'], function (exports, _aureliaFramework, _todoRepository, _todo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_todoRepository.TodoRepository), _dec(_class = function () {
    function App(repository) {
      _classCallCheck(this, App);

      this.repository = repository;

      this.todoField = '';
      this.todos = [];
      this.unCompleted = 0;
    }

    App.prototype.activate = function activate() {
      this.fetchTodos();
    };

    App.prototype.addTodo = function addTodo() {
      var _this = this;

      this.repository.save(new _todo.Todo(this.todoField)).then(function () {
        _this.todoField = '';
        _this.fetchTodos();
      });
    };

    App.prototype.toggle = function toggle(todo) {
      todo.toggle();
      this.checkIncompleted();
      this.repository.save(todo);
    };

    App.prototype.fetchTodos = function fetchTodos() {
      var _this2 = this;

      this.repository.findAll().then(function (todos) {
        _this2.todos = todos;
        _this2.checkIncompleted();
      });
    };

    App.prototype.checkIncompleted = function checkIncompleted() {
      this.unCompleted = this.todos.filter(function (todo) {
        return !todo.done;
      }).length;
    };

    return App;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><div class=container-fluid><div class=row><div class=\"col nopadding\"><nav class=\"navbar navbar-expand-lg navbar-light bg-light\"><a class=navbar-brand href=#>Todo List</a></nav></div></div><br><div class=row><div class=col-md-2></div><div class=\"col-md-8 d-flex justify-content-center\"><form class=form-inline><div class=\"form-group align-items-center\"><input type=text value.bind=todoField class=\"form-control add-field\" autofocus placeholder=\"What's need to be done ?\" maxlength=30><button type=submit class=\"btn btn-primary\" disabled.bind=\"todoField.length === 0\" click.delegate=addTodo()>Add</button></div></form></div><div class=col-md-2></div></div><br><div class=row><div class=col-md-2></div><div class=col-md-8><ul class=\"list-group list-group-flush\"><li repeat.for=\"todo of todos\" click.delegate=toggle(todo) class=\"list-group-item d-flex justify-content-between align-items-center\"><span class=\"\">${todo.todo}</span><span if.bind=todo.done class=material-icons>done</span></li></ul><p if.bind=\"unCompleted !== 0\" class=todo-footer>${unCompleted} todo(s) left</p></div><div class=col-md-2></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map