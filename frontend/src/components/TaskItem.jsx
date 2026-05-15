export default function TaskItem({ employee, onEdit, onDelete, onToggle }) {
  return (
    <article className={`task-card ${task.completed ? 'task-done' : ''}`}>
      <div>
        <h3>{employee.name}</h3>
        <p>{employee.email || 'No email added yet.'}</p>
      </div>

      <div className="task-actions">
        <button className="btn btn-secondary" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" type="button" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
