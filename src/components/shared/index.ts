import styled from 'styled-components';

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FilterInput = styled.input`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: 8px;
  padding: 0.6rem;
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.semantics.colors.accent.primary};
    background: rgba(255, 255, 255, 0.05);
  }

  &::placeholder {
    color: ${({ theme }) => theme.semantics.colors.text.disabled};
  }
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
`;

export const FieldErrorText = styled.span`
  display: block;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.semantics.colors.text.error};
`;
