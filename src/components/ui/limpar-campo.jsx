
export default function LimparCamposButton({
  show,
  onClick,
  ariaLabel = "Limpar campo",
  className = "",
}) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title="Limpar"
      className={
        "btn btn-sm position-absolute top-50 end-0 translate-middle-y me-1 " +
        "border-0 bg-transparent text-secondary " +
        className
      }
    >
      ×
    </button>
  );
}