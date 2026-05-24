import React from 'react';
import styled from 'styled-components';

export interface SidebarNavItem {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export interface SidebarUser {
  name: string;
  subtitle?: string;
}

export interface SidebarProps {
  logoTitle?: string;
  logoIcon?: React.ReactNode;
  navItems: SidebarNavItem[];
  user?: SidebarUser;
  themeMode?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onLogout?: () => void;
}

const Container = styled.aside`
  width: ${({ theme }) => theme.sizes.sidebar.expanded};
  background: ${({ theme }) => theme.semantics.colors.bg.card};
  border-right: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 50;

  @media (max-width: 768px) {
    width: ${({ theme }) => theme.sizes.sidebar.collapsed};
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  padding: 0 0.5rem;

  .logo-icon {
    width: ${({ theme }) => theme.sizes.icon.avatar};
    height: ${({ theme }) => theme.sizes.icon.avatar};
    background: ${({ theme }) => theme.semantics.colors.accent.primary};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: ${({ theme }) => theme.shadows.accent};
    flex-shrink: 0;

    svg {
      width: ${({ theme }) => theme.sizes.icon.lg};
      height: ${({ theme }) => theme.sizes.icon.lg};
    }
  }

  .logo-text {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
    color: ${({ theme }) => theme.semantics.colors.text.primary};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const NavContainer = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0.875rem ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.components.navItem.activeBg : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.components.navItem.activeColor : theme.components.navItem.defaultColor};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  width: 100%;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.components.navItem.hoverBg};
    color: ${({ theme }) => theme.components.navItem.hoverColor};
  }

  svg {
    width: ${({ theme }) => theme.sizes.icon.md};
    height: ${({ theme }) => theme.sizes.icon.md};
    flex-shrink: 0;
  }

  .nav-label {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ProfileSection = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.5rem;

  .avatar {
    width: ${({ theme }) => theme.sizes.icon.avatar};
    height: ${({ theme }) => theme.sizes.icon.avatar};
    background: ${({ theme }) => theme.semantics.colors.bg.main};
    border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.semantics.colors.accent.primary};
    flex-shrink: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 768px) {
      display: none;
    }

    .name {
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      color: ${({ theme }) => theme.semantics.colors.text.primary};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .subtitle {
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
      color: ${({ theme }) => theme.semantics.colors.text.secondary};
      text-transform: capitalize;
    }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.semantics.colors.border.subtle};
  background: transparent;
  color: ${({ theme }) => theme.semantics.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0.75rem;

    .label {
      display: none;
    }
  }
`;

const ThemeToggleButton = styled(ActionButton)`
  &:hover {
    border-color: ${({ theme }) => theme.semantics.colors.accent.primary};
    color: ${({ theme }) => theme.semantics.colors.accent.primary};
    background: ${({ theme }) => theme.semantics.colors.accent.subtleBg};
  }
`;

const LogoutButton = styled(ActionButton)`
  &:hover {
    border-color: ${({ theme }) => theme.components.logoutButton.hoverBorder};
    color: ${({ theme }) => theme.components.logoutButton.hoverColor};
    background: ${({ theme }) => theme.components.logoutButton.hoverBg};
  }
`;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({
  logoTitle = 'Lightning POS',
  logoIcon,
  navItems,
  user,
  themeMode,
  onThemeToggle,
  onLogout,
}) => (
  <Container>
    <LogoWrapper>
      {logoIcon && <div className="logo-icon">{logoIcon}</div>}
      <span className="logo-text">{logoTitle}</span>
    </LogoWrapper>

    <NavContainer>
      {navItems.map((item, i) => (
        <NavButton key={i} $active={item.active} onClick={item.onClick}>
          {item.icon}
          <span className="nav-label">{item.label}</span>
        </NavButton>
      ))}
    </NavContainer>

    {(user || onThemeToggle || onLogout) && (
      <ProfileSection>
        {user && (
          <UserInfoWrapper>
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="details">
              <span className="name">{user.name}</span>
              {user.subtitle && <span className="subtitle">{user.subtitle}</span>}
            </div>
          </UserInfoWrapper>
        )}
        {onThemeToggle && (
          <ThemeToggleButton onClick={onThemeToggle}>
            {themeMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span className="label">{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </ThemeToggleButton>
        )}
        {onLogout && (
          <LogoutButton onClick={onLogout}>
            <LogoutIcon />
            <span className="label">Logout</span>
          </LogoutButton>
        )}
      </ProfileSection>
    )}
  </Container>
);
