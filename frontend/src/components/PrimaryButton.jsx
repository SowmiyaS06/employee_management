export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button className={`btn btn-primary ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
