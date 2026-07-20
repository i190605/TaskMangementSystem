import type { ChangeEvent } from 'react';

export interface SelectOption<Value extends string> {
  label: string;
  value: Value;
}

interface FilterSelectProps<Value extends string> {
  id: string;
  label: string;
  value: Value;
  onChange: (value: Value) => void;
  options: SelectOption<Value>[];
  helperText?: string;
}

export function FilterSelect<Value extends string>({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
}: FilterSelectProps<Value>) {
  const helperId = helperText ? `${id}-helper` : undefined;

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value as Value);
  }

  return (
    <div className="filter-field">
      <label className="filter-field__label" htmlFor={id}>
        {label}
      </label>

      <div className="filter-field__control">
        <select aria-describedby={helperId} id={id} value={value} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {helperText ? (
        <p className="filter-field__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
