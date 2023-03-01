import Backbone from "backbone";
import _ from "underscore";

function now() {
  const now = new Date();
  return `${
    now.getMonth() + 1
  }/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
}

const TodoModel = Backbone.Model.extend({
  defaults: function () {
    return {
      value: "",
      createdAt: ""
    };
  }
});

const TodoListModel = Backbone.Collection.extend({
  model: TodoModel
});

const TodoList = new TodoListModel();

const TodoView = Backbone.View.extend({
  template: (todo) => `
      <li clsas="list-item">
       <span class="list-item__value">${todo.value}</span>
      </li>
  `,
  render: function () {
    this.$el.html = this.template(this.model.toJSON());
    return this;
  }
});

const FormView = Backbone.View.extend({
  el: document.getElementById("form"),
  events: {
    submit: "submit"
  },
  submit: function (e) {
    e.originalEvent.preventDefault();
    const event = e.originalEvent;
    event.preventDefault();
    const formData = new FormData(e.target);
    const todo = Object.fromEntries(formData.entries()).todo;
    TodoList.add({ value: todo, createdAt: now() });
  }
});

new FormView();

const AppView = Backbone.View.extend({
  el: document.getElementById("list"),
  initialize: function () {
    this.listenTo(TodoList, "add", this.add);
    //this.listenTo(this.model, "change", "render");
  },
  add: function (todo) {
    const todoView = new TodoView({ model: todo });
    const todoElement = todoView.render();
    console.log(todoElement);
    //this.el.append(todoElement);
  },
  render: function () {}
});

new AppView({ model: new TodoListModel() }).render();
