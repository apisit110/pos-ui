import React from 'react';
import { FilterGroup, FilterLabel, FilterInput } from './shared';

interface TextFilterProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const TextFilter: React.FC<TextFilterProps> = ({ label, placeholder, value, onChange }) => (
  <FilterGroup>
    <FilterLabel>{label}</FilterLabel>
    <FilterInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </FilterGroup>
);
