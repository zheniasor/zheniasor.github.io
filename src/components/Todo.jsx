import React from "react";
import "./Todo.css";

export default class Todo extends React.PureComponent {
  formatTime = (date) => {
    return date.toLocaleTimeString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  getPriorityLabel = (priority) => {
    const labels = {
      high: "Срочно",
      medium: "Средне",
      low: "Не срочно",
    };
    return labels[priority] || "Средне";
  };

  handleCheck = (e) => this.props.onDone(e.target.checked, this.props.id);
  handleDelete = () => this.props.onDelete(this.props.id);

  render() {
    const { done, name, createdAt, priority, description } = this.props;
    return (
      <div className={`Todo ${done ? "done" : ""} priority-${priority}`}>
        <div className="todo-main">
          <input type="checkbox" checked={done} onChange={this.handleCheck} />
          <div className="todo-content">
            <div className="todo-header">
              <span className="todo-title">{name}</span>
              <span className={`priority-badge priority-${priority}`}>
                {this.getPriorityLabel(priority)}
              </span>
            </div>
            {description && (
              <div className="todo-description">{description}</div>
            )}
          </div>
        </div>

        <div className="todo-meta">
          <span className="time">
            {createdAt ? this.formatTime(createdAt) : ""}
          </span>
          <button className="delete" onClick={this.handleDelete}>
            ×
          </button>
        </div>
      </div>
    );
  }
}
