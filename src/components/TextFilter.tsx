import React from 'react';
import { FilterGroup, FilterLabel, FilterInput, RequiredMark } from './shared';

interface TextFilterProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const TextFilter: React.FC<TextFilterProps> = ({ label, placeholder, value, onChange, required }) => (
  <FilterGroup>
    <FilterLabel>{label}{required && <RequiredMark>*</RequiredMark>}</FilterLabel>
    <FilterInput
      type="text"
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </FilterGroup>
);
