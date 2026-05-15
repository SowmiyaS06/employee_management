import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(form);
      navigate('/dashboard');
    } catch (registerError) {
      setError(registerError.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Create a new account to try protected routes and CRUD.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormInput label="Name" type="text" name="name" value={form.name} onChange={handleChange} />
          <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
          <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} />

          {error ? <p className="form-error">{error}</p> : null}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </PrimaryButton>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login instead</Link>
        </p>
      </div>
    </section>
  );
}
