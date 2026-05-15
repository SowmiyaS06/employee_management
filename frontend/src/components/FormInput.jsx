export default function FormInput({ label, ...props }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input className="field-input" {...props} />
    </label>
  );
}
