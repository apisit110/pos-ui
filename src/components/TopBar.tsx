import React from 'react';
import styled from 'styled-components';
import { SunIcon, MoonIcon, UserIcon } from './shared/icons';

export interface TopBarProps {
  title: string;
  themeMode?: 'light' | 'dark';
  onThemeToggle?: () => void;
  userName?: string;
  userRole?: string;
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

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AvatarCircle = styled.div`
  width: ${({ theme }) => theme.sizes.icon.avatar};
  height: ${({ theme }) => theme.sizes.icon.avatar};
  background: ${({ theme }) => theme.semantics.colors.bg.main};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
`;

const AvatarLabels = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AvatarName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.semantics.colors.text.primary};
  line-height: 1.2;
`;

const AvatarRole = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  line-height: 1.2;
`;


export const TopBar: React.FC<TopBarProps> = ({ title, themeMode, onThemeToggle, userName, userRole }) => (
  <Container>
    <Title>{title}</Title>
    <Actions>
      {onThemeToggle && (
        <IconButton onClick={onThemeToggle} aria-label="Toggle theme">
          {themeMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      )}
      {(userName || userRole) && (
        <AvatarWrapper>
          <AvatarCircle><UserIcon /></AvatarCircle>
          <AvatarLabels>
            {userName && <AvatarName>{userName}</AvatarName>}
            {userRole && <AvatarRole>{userRole}</AvatarRole>}
          </AvatarLabels>
        </AvatarWrapper>
      )}
    </Actions>
  </Container>
);
