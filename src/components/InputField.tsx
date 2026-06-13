import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  trailingIcon?: React.ReactNode;
  onTailClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputControl = styled.input<{ $hasError?: boolean; $hasTail?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: ${({ $hasTail }) => ($hasTail ? '2.75rem' : '1rem')};
  background-color: ${({ theme }) => theme.components.input.bg};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.semantics.colors.border.focus};
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    background-color: ${({ theme }) => theme.components.input.focusBg};
  }

  ${({ $hasError, theme }) => $hasError && css`
    border-color: ${theme.semantics.colors.text.error};
  `}
`;

const TailButton = styled.button`
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  line-height: 0;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.semantics.colors.text.primary};
  }
`;

const DefaultIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ErrorText = styled.span`
  display: block;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.semantics.colors.text.error};
`;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, trailingIcon, onTailClick, ...props }, ref) => {
    const hasTail = !!(trailingIcon !== undefined || onTailClick);

    return (
      <InputGroup>
        <Label>{label}</Label>
        <InputWrapper>
          <InputControl
            ref={ref}
            $hasError={!!error}
            $hasTail={hasTail}
            {...props}
          />
          {hasTail && (
            <TailButton type="button" onClick={onTailClick} tabIndex={-1}>
              {trailingIcon ?? <DefaultIcon />}
            </TailButton>
          )}
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </InputGroup>
    );
  }
);

InputField.displayName = 'InputField';
