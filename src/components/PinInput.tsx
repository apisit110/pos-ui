import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const PinInputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const PinDigitInput = styled.input<{ $isFilled?: boolean; $size?: string }>`
  width: ${({ $size }) => $size || '3.5rem'};
  height: ${({ $size }) => ($size ? `calc(${$size} * 1.15)` : '4rem')};
  text-align: center;
  font-size: ${({ $size }) => ($size ? `calc(${$size} * 0.4)` : '1.5rem')};
  font-weight: 700;
  background: ${({ theme }) => theme.components.input.bg};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  transition: ${({ theme }) => theme.transitions.default};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.semantics.colors.accent.primary};
    background: ${({ theme }) => theme.components.input.focusBg};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }

  ${({ $isFilled, theme }) => $isFilled && css`
    border-color: ${theme.semantics.colors.accent.primary};
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface PinInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  boxSize?: string;
  masked?: boolean;
}

export const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled,
  boxSize,
  masked,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Roving tabindex: only one box is in the tab order, so Tab leaves the group
  const firstEmptyIndex = Array.from({ length }).findIndex((_, i) => !value[i]);
  const tabbableIndex = focusedIndex ?? (firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    // Typing past the filled digits appends right after the last one, never leaving gaps
    const targetIndex = Math.min(index, value.length);
    if (targetIndex >= length) return;

    const newValue = value.split('');
    newValue[targetIndex] = char;
    const finalValue = newValue.join('');

    onChange(finalValue);

    if (char && targetIndex < length - 1) {
      inputRefs.current[targetIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      // Always remove the most recently entered digit, wherever the focus is
      e.preventDefault();
      if (!value) return;
      onChange(value.slice(0, -1));
      inputRefs.current[value.length - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).replace(/\D/g, '');
    onChange(pastedData);

    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <PinInputGroup>
      {Array.from({ length }).map((_, index) => (
        <PinDigitInput
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type={masked ? 'password' : 'text'}
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          tabIndex={index === tabbableIndex ? 0 : -1}
          disabled={disabled}
          $isFilled={!!value[index]}
          $size={boxSize}
          autoComplete={masked ? 'off' : 'one-time-code'}
        />
      ))}
    </PinInputGroup>
  );
};
