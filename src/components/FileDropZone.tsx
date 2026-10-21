import React, { useRef, useState } from 'react';
import styled from 'styled-components';

export interface FileDropZoneProps {
  /** Accepted extensions, comma separated (e.g. ".xlsx" or ".xlsx,.csv") */
  accept?: string;
  onFile: (file: File) => void;
  icon?: React.ReactNode;
  /** Main text. Wrap the clickable part in <strong> to highlight it. */
  children?: React.ReactNode;
  hint?: React.ReactNode;
  disabled?: boolean;
}

const Zone = styled.div<{ $dragActive: boolean; $disabled?: boolean }>`
  border: 2px dashed
    ${({ theme, $dragActive }) =>
      $dragActive
        ? theme.semantics.colors.accent.primary
        : theme.semantics.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 3rem 2rem;
  text-align: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: ${({ theme }) => theme.transitions.default};
  background: ${({ $dragActive }) =>
    $dragActive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.015)'};

  &:hover {
    border-color: ${({ theme, $disabled }) =>
      $disabled ? undefined : theme.semantics.colors.accent.primary};
    background: ${({ $disabled }) =>
      $disabled ? undefined : 'rgba(99, 102, 241, 0.05)'};
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  margin: 0;
  font-size: 0.95rem;

  strong {
    color: ${({ theme }) => theme.semantics.colors.accent.primary};
    cursor: inherit;
  }
`;

const Hint = styled.p`
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  margin: 0.5rem 0 0 0;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  accept,
  onFile,
  icon,
  children,
  hint,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const extensions = accept
    ?.split(',')
    .map((ext) => ext.trim().toLowerCase())
    .filter(Boolean);

  const isAccepted = (file: File) =>
    !extensions?.length ||
    extensions.some((ext) => file.name.toLowerCase().endsWith(ext));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file && isAccepted(file)) onFile(file);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    e.target.value = '';
  };

  return (
    <>
      <Zone
        $dragActive={dragActive}
        $disabled={disabled}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        {icon && <Icon>{icon}</Icon>}
        {children && <Text>{children}</Text>}
        {hint && <Hint>{hint}</Hint>}
      </Zone>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleSelect}
      />
    </>
  );
};
