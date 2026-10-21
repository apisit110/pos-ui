import React from 'react';
import { FilterGroup, FilterLabel, FilterInput, RequiredMark } from './shared';

interface DateFilterProps {
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ label, value, onChange, required }) => (
  <FilterGroup>
    <FilterLabel>{label}{required && <RequiredMark>*</RequiredMark>}</FilterLabel>
    <FilterInput type="date" required={required} value={value} onChange={(e) => onChange(e.target.value)} />
  </FilterGroup>
);
