import React from 'react';
import styled from 'styled-components';
import { FilterGroup, FilterLabel } from './shared';

const Select = styled.select`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: 8px;
  padding: 0.6rem;
  padding-right: 2.5rem;
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.semantics.colors.accent.primary};
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export interface SelectFilterOption {
  label: string;
  value: string;
}

interface SelectFilterProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectFilterOption[];
  placeholder?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, onChange, options, placeholder, ...rest }) => (
  <FilterGroup>
    <FilterLabel>{label}</FilterLabel>
    <Select value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </Select>
  </FilterGroup>
);
