export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-light-foreground dark:text-dark-foreground font-medium mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none transition-all"
      />
    </div>
  );
}
