import { useEffect, useState } from 'react';
import api from '../api/axios';
import PrimaryButton from '../components/PrimaryButton';
import FormInput from '../components/FormInput';
import TaskItem from '../components/TaskItem';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', departments:'', salary: 0,joining_date: Date.now });
  const [editingId, setEditingId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadEmployees = async () => {
    const { data } = await api.get('/employees');
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees().catch(() => setError('Could not load tasks'));
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
    setForm({ name: '', email: '',departments:'',salary: 0,joining_date: Date.now });
    setEditingId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, form);
        setMessage('Employee details updated successfully.');
      } else {
        await api.post('/employees', form);
        setMessage('Employee created successfully.');
      }

      resetForm();
      await loadEmployees();
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (employee) => {
    setForm({ name: employee.name, email: employee.email, departments: employee.departments,salary: employee.salary, joining_date:employee.joining_date});
    setEditingId(employee._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (employeeId) => {
    await api.delete(`/tasks/${employeeId}`);
    await loadEmployees();
    setMessage('Employee details deleted.');
  };

  const handleToggle = async (employee) => {
    await api.put(`/tasks/${employee._id}`, {
      name: employee.name, 
      email: employee.email, 
      departments: employee.departments,
      salary: employee.salary, 
      joining_date:employee.joining_date
    });

    await loadEmployees();
  };

  return (
    <section className="dashboard">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Protected Dashboard</p>
          <h1>Welcome, {user?.name || 'Developer'}</h1>
          <p>This page shows login protection and a full CRUD example.</p>
        </div>
      </div>

      <div className="grid-layout">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Update Employee' : 'Create Employee'}</h2>
          <FormInput label="Name" type="text" name="name" value={form.name} onChange={handleChange} />
          <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange}/>
          <label>
        Departments: 
        <select name="Departments">
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
        </select>
      </label>
      <FormInput label="Salary" type="Number" name="salary" value={form.salary} onChange={handleChange}/>
      <FormInput label="Joining Date" type="Date" name="joining_date" value={form.joining_date} onChange={handleChange}/>


          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}

          <div className="button-row">
            <PrimaryButton type="submit">{editingId ? 'Save Changes' : 'Create Employee'}</PrimaryButton>
            {editingId ? (
              <button className="btn btn-secondary" type="button" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="panel list-panel">
          <h2>Available Employees</h2>
          <div className="employee-list">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TaskItem
                  key={employee._id}
                  task={employee}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="empty-state">No Employees yet. Create the first one.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
