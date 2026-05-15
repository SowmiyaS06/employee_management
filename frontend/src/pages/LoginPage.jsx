import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      await login(form);
      navigate('/dashboard');
    } catch (loginError) {
      setError(loginError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Use your account to access the dashboard.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
          <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} />

          {error ? <p className="form-error">{error}</p> : null}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </PrimaryButton>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
