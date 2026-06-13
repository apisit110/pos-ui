import React from 'react';
import { FilterGroup, FilterLabel, FilterInput } from './shared';

interface DateFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ label, value, onChange }) => (
  <FilterGroup>
    <FilterLabel>{label}</FilterLabel>
    <FilterInput type="date" value={value} onChange={(e) => onChange(e.target.value)} />
  </FilterGroup>
);
