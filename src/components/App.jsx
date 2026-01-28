import React from "react";
import Todo from "./Todo.jsx";

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      id: 1,
      name: "",
      description: "",
      todos: [],
      filterValues: {
        status: "all",
        priority: "all",
        searchTerm: "",
      },
      filters: [],
    };
  }

  render() {
    console.log("render");
    const { todos, name, filterValues } = this.state;
    const doneCount = this.getDoneCount();
    const uncompletedTodos = todos.length - doneCount;
    const filteredTodos = this.getFilteredTodos();
    const sortedTodos = this.filterActiveTodos(filteredTodos);

    return (
      <div className="app-container">
        <div className="app-header">
          <h1>TODO List</h1>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={filterValues.searchTerm}
            onChange={this.handleSearch}
            className="search-input"
          />
          <div className="filter-group">
            <label>
              <input
                type="radio"
                name="status"
                value="all"
                checked={filterValues.status === "all"}
                onChange={this.handleFilterChange}
              />
              <span>Все задачи: {todos.length}</span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={filterValues.status === "active"}
                onChange={this.handleFilterChange}
              />
              <span>Не выполнено: {uncompletedTodos}</span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="completed"
                checked={filterValues.status === "completed"}
                onChange={this.handleFilterChange}
              />
              <span>Выполнено: {doneCount}</span>
            </label>
          </div>
          <div className="search-section">
            <div className="filter-priority-group">
              <button
                className={`filter-priority-btn ${
                  filterValues.priority === "all" ? "active" : ""
                }`}
                onClick={() => this.handlePriorityFilterChange("all")}
              >
                Все
              </button>
              <button
                className={`filter-priority-btn high ${
                  filterValues.priority === "high" ? "active" : ""
                }`}
                onClick={() => this.handlePriorityFilterChange("high")}
              >
                Срочно
              </button>
              <button
                className={`filter-priority-btn medium ${
                  filterValues.priority === "medium" ? "active" : ""
                }`}
                onClick={() => this.handlePriorityFilterChange("medium")}
              >
                Средне
              </button>
              <button
                className={`filter-priority-btn low ${
                  filterValues.priority === "low" ? "active" : ""
                }`}
                onClick={() => this.handlePriorityFilterChange("low")}
              >
                Не срочно
              </button>
            </div>
          </div>
        </div>

        <div className="add-todo-section">
          <div className="input-group">
            <input
              value={name}
              onChange={this.handleSetName}
              placeholder="Название задачи..."
              className="todo-input"
            />
            <textarea
              value={this.state.description}
              onChange={this.handleSetDescription}
              placeholder="Описание задачи (необязательно)"
              className="todo-description-input"
              rows="3"
            />
          </div>
          <div className="priority-buttons">
            <button
              type="button"
              className={`priority-btn low ${
                this.state.priority === "low" ? "active" : ""
              }`}
              onClick={() => this.handleSetPriority("low")}
            >
              Не срочно
            </button>
            <button
              type="button"
              className={`priority-btn medium ${
                this.state.priority === "medium" ? "active" : ""
              }`}
              onClick={() => this.handleSetPriority("medium")}
            >
              Средне
            </button>
            <button
              type="button"
              className={`priority-btn high ${
                this.state.priority === "high" ? "active" : ""
              }`}
              onClick={() => this.handleSetPriority("high")}
            >
              Срочно
            </button>
          </div>

          <button
            onClick={this.handleAddTodo}
            disabled={!name.trim()}
            className="add-button"
          >
            Добавить задачу
          </button>
        </div>

        <div className="todos-list">
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                name={todo.name}
                description={todo.description}
                priority={todo.priority}
                done={todo.done}
                createdAt={todo.createdAt}
                onDone={this.handleSetDone}
                onDelete={this.handleDeleteTodo}
              />
            ))
          ) : (
            <div className="no-tasks-message">
              {todos.length === 0 ? (
                <div className="empty-state">
                  <h3>Пока нет задач</h3>
                  <p>Добавьте первую задачу чтобы начать</p>
                </div>
              ) : (
                <div className="empty-state">
                  <h3>По вашим критериям ничего не найдено</h3>
                  <p>Попробуйте изменить параметры поиска или фильтры</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  getFilteredTodos = () => {
    const { todos, filters } = this.state;

    return todos.filter((todo) => filters.every((filter) => filter.fn(todo)));
  };

  addFilter = (key, filterFn) => {
    this.setState({
      filters: [
        ...this.state.filters.filter((f) => f.key !== key),
        { key, fn: filterFn },
      ],
    });
  };

  removeFilter = (key) => {
    this.setState({
      filters: this.state.filters.filter((f) => f.key !== key),
    });
  };

  handleSearch = (e) => {
    const searchTerm = e.target.value;
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        searchTerm,
      },
    });

    if (searchTerm.trim()) {
      this.addFilter(
        "search",
        (todo) =>
          todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      this.removeFilter("search");
    }
  };

  handleFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        [name]: value,
      },
    });

    if (name === "status") {
      if (value === "active") {
        this.addFilter("status", (todo) => !todo.done);
      } else if (value === "completed") {
        this.addFilter("status", (todo) => todo.done);
      } else {
        this.removeFilter("status");
      }
    }
  };

  handlePriorityFilterChange = (priority) => {
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        priority,
      },
    });

    if (priority !== "all") {
      this.addFilter("priority", (todo) => todo.priority === priority);
    } else {
      this.removeFilter("priority");
    }
  };

  getDoneCount = () => {
    return this.state.todos.filter((todo) => todo.done).length;
  };

  handleSetName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSetDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSetPriority = (priority) => {
    this.setState({ priority });
  };

  handleAddTodo = () => {
    const trimmedName = this.state.name.trim();
    if (!trimmedName) {
      return;
    }
    const todo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      priority: this.state.priority || "medium",
      done: false,
      createdAt: new Date(),
    };
    this.setState({
      name: "",
      description: "",
      priority: "medium",
      todos: [todo].concat(this.state.todos),
      id: this.state.id + 1,
    });
  };

  handleSetDone = (done, id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, done } : todo
      ),
    });
  };

  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  filterActiveTodos = (todos) => {
    return [...todos].sort((a, b) => {
      if (a.done && !b.done) return 1;
      if (!a.done && b.done) return -1;
      return 0;
    });
  };
}

export default App;
