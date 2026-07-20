import type { ChangeEvent } from 'react';

interface SearchFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText?: string;
  clearLabel?: string;
}

export function SearchField({
  id,
  label,
  value,
  onChange,
  placeholder,
  helperText,
  clearLabel,
}: SearchFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="search-field">
      <label className="search-field__label" htmlFor={id}>
        {label}
      </label>

      <div className="search-field__control">
        <input
          aria-describedby={helperId}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          type="search"
          value={value}
        />
        {value.length > 0 ? (
          <button className="search-field__clear" type="button" onClick={() => onChange('')} aria-label={clearLabel}>
            Clear
          </button>
        ) : null}
      </div>

      {helperText ? (
        <p className="search-field__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
