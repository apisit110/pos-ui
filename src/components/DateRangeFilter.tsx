import React from 'react';
import styled from 'styled-components';
import { FilterGroup, FilterLabel, FilterInput, RequiredMark } from './shared';

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangeFilterProps {
  label: string;
  value: DateRange;
  required?: boolean;
  min?: string;
  max?: string;
  onChange: (value: DateRange) => void;
}

const RangeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: 8px;
  padding: 0 0.6rem;
  transition: all 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.semantics.colors.accent.primary};
    background: rgba(255, 255, 255, 0.05);
  }

  input {
    flex: 1;
    min-width: 0;
    background: none;
    border: none;
    padding: 0.6rem 0;

    &:focus {
      background: none;
    }
  }
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  font-size: 0.875rem;
`;

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ label, value, onChange, required, min, max }) => (
  <FilterGroup role="group" aria-label={label}>
    <FilterLabel as="span">{label}{required && <RequiredMark>*</RequiredMark>}</FilterLabel>
    <RangeBox>
      <FilterInput
        type="date"
        aria-label={`${label} start`}
        required={required}
        value={value.start}
        min={min}
        max={value.end || max}
        onChange={(e) => onChange({ ...value, start: e.target.value })}
      />
      <Separator aria-hidden>→</Separator>
      <FilterInput
        type="date"
        aria-label={`${label} end`}
        required={required}
        value={value.end}
        min={value.start || min}
        max={max}
        onChange={(e) => onChange({ ...value, end: e.target.value })}
      />
    </RangeBox>
  </FilterGroup>
);
