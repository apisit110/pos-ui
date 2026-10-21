import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { FilterGroup, FilterLabel, RequiredMark } from './shared';

const Wrapper = styled.div`
  position: relative;
`;

const Control = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  min-height: 2.4rem;
  background: ${({ $open }) => ($open ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)')};
  border: 1px solid ${({ theme, $open }) => ($open ? theme.semantics.colors.accent.primary : theme.semantics.colors.border.subtle)};
  border-radius: 8px;
  padding: 0.3rem 0.6rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  cursor: text;
  transition: all 0.2s;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 4rem;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.2rem 0;
  color: inherit;
  font-size: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.semantics.colors.text.disabled};
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.1rem 0.25rem 0.1rem 0.5rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.8rem;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0.1rem 0.3rem;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.semantics.colors.text.primary};
  }
`;

const Menu = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 14rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  background: ${({ theme }) => theme.semantics.colors.bg.card};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;

const Option = styled.li<{ $active: boolean; $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.6rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  background: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
`;

const SelectAllButton = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 0.25rem;
  padding: 0.5rem 0.6rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: 6px 6px 0 0;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.semantics.colors.accent.primary};
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Empty = styled.li`
  padding: 0.5rem 0.6rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.semantics.colors.text.disabled};
`;

export interface SelectFilterOption {
  label: string;
  value: string;
}

interface SelectFilterBaseProps {
  label: string;
  options: SelectFilterOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  searchPlaceholder?: string;
  emptyLabel?: string;
  selectAllLabel?: string;
  deselectAllLabel?: string;
}

interface SingleProps extends SelectFilterBaseProps {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
}

interface MultiProps extends SelectFilterBaseProps {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

export type SelectFilterProps = SingleProps | MultiProps;

export const SelectFilter: React.FC<SelectFilterProps> = (props) => {
  const { label, options, placeholder, required, disabled, searchPlaceholder = 'Search...', emptyLabel = 'No results', selectAllLabel = 'Select all', deselectAllLabel = 'Deselect all' } = props;
  const selected = useMemo(
    () => (props.multiple ? props.value : props.value ? [props.value] : []),
    [props.multiple, props.value],
  );

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const toggle = (opt: SelectFilterOption) => {
    if (props.multiple) {
      props.onChange(selected.includes(opt.value) ? selected.filter((v) => v !== opt.value) : [...selected, opt.value]);
      inputRef.current?.focus();
    } else {
      props.onChange(opt.value);
      close();
    }
  };

  const allFilteredSelected = filtered.length > 0 && filtered.every((o) => selected.includes(o.value));

  // Applies to the currently filtered options, so it works together with search.
  const toggleAll = () => {
    if (!props.multiple) return;
    const ids = filtered.map((o) => o.value);
    props.onChange(
      allFilteredSelected
        ? selected.filter((v) => !ids.includes(v))
        : [...selected, ...ids.filter((v) => !selected.includes(v))],
    );
    inputRef.current?.focus();
  };

  const clearAll = () => {
    if (props.multiple) props.onChange([]);
    else props.onChange('');
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && filtered[activeIndex]) toggle(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Backspace' && !query && props.multiple && selected.length) {
      props.onChange(selected.slice(0, -1));
    }
  };

  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  const singleLabel = !props.multiple && selected[0] ? labelOf(selected[0]) : '';
  const hasValue = selected.length > 0;

  return (
    <FilterGroup>
      <FilterLabel>{label}{required && <RequiredMark>*</RequiredMark>}</FilterLabel>
      <Wrapper ref={rootRef}>
        <Control $open={open} onClick={() => !disabled && (setOpen(true), inputRef.current?.focus())}>
          {props.multiple && selected.map((v) => (
            <Tag key={v}>
              {labelOf(v)}
              <IconButton
                type="button"
                aria-label={`Remove ${labelOf(v)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onChange(selected.filter((s) => s !== v));
                }}
              >
                ×
              </IconButton>
            </Tag>
          ))}
          <SearchInput
            ref={inputRef}
            role="combobox"
            aria-expanded={open}
            aria-required={required}
            disabled={disabled}
            value={open || props.multiple ? query : singleLabel}
            placeholder={hasValue && props.multiple ? searchPlaceholder : open ? searchPlaceholder : placeholder}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
          />
          {hasValue && !disabled && (
            <IconButton
              type="button"
              aria-label="Clear"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
            >
              ×
            </IconButton>
          )}
        </Control>
        {open && (
          <Menu role="listbox" aria-multiselectable={props.multiple}>
            {props.multiple && filtered.length > 0 && (
              <li role="presentation">
                <SelectAllButton type="button" onMouseDown={(e) => e.preventDefault()} onClick={toggleAll}>
                  {allFilteredSelected ? deselectAllLabel : selectAllLabel}
                </SelectAllButton>
              </li>
            )}
            {filtered.length === 0 && <Empty>{emptyLabel}</Empty>}
            {filtered.map((opt, i) => {
              const isSelected = selected.includes(opt.value);
              return (
                <Option
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  $active={i === activeIndex}
                  $selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggle(opt)}
                >
                  {opt.label}
                  {isSelected && <span>✓</span>}
                </Option>
              );
            })}
          </Menu>
        )}
      </Wrapper>
    </FilterGroup>
  );
};
