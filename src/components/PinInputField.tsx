import React from 'react';
import styled from 'styled-components';
import { PinInput } from './PinInput';
import { InputLabel, FieldErrorText } from './shared';

interface PinInputFieldProps {
  label: string;
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  boxSize?: string;
  error?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const PinInputField: React.FC<PinInputFieldProps> = ({
  label,
  length = 6,
  value,
  onChange,
  disabled,
  boxSize,
  error,
}) => {
  return (
    <Container>
      <InputLabel>{label}</InputLabel>
      <PinInput
        length={length}
        value={value}
        onChange={onChange}
        disabled={disabled}
        boxSize={boxSize}
      />
      {error && <FieldErrorText>{error}</FieldErrorText>}
    </Container>
  );
};
