import React from 'react';
import styled from 'styled-components';

export interface TopBarProps {
  title: string;
  themeMode?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

const Container = styled.header`
  height: 70px;
  background: ${({ theme }) => theme.semantics.colors.bg.card};
  border-bottom: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  justify-content: space-between;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.icon.avatar};
  height: ${({ theme }) => theme.sizes.icon.avatar};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: transparent;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.semantics.colors.accent.primary};
    color: ${({ theme }) => theme.semantics.colors.accent.primary};
    background: ${({ theme }) => theme.semantics.colors.accent.subtleBg};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Avatar = styled.div`
  width: ${({ theme }) => theme.sizes.icon.avatar};
  height: ${({ theme }) => theme.sizes.icon.avatar};
  background: ${({ theme }) => theme.semantics.colors.bg.main};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const TopBar: React.FC<TopBarProps> = ({ title, themeMode, onThemeToggle }) => (
  <Container>
    <Title>{title}</Title>
    <Actions>
      {onThemeToggle && (
        <IconButton onClick={onThemeToggle} aria-label="Toggle theme">
          {themeMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      )}
      <Avatar />
    </Actions>
  </Container>
);
