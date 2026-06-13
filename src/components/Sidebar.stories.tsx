import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Sidebar } from './Sidebar'

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const LogoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const defaultNavItems = [
  { label: 'Dashboard', icon: <HomeIcon />, active: true, onClick: fn() },
  { label: 'Orders', icon: <ShoppingCartIcon />, active: false, onClick: fn() },
  { label: 'Products', icon: <BoxIcon />, active: false, onClick: fn() },
  { label: 'Settings', icon: <SettingsIcon />, active: false, onClick: fn() },
]

const meta = {
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    logoTitle: 'Lightning POS',
    logoIcon: <LogoIcon />,
    navItems: defaultNavItems,
  },
}

export const WithUser: Story = {
  args: {
    logoTitle: 'Lightning POS',
    logoIcon: <LogoIcon />,
    navItems: defaultNavItems,
    user: { name: 'John Doe', subtitle: 'Admin' },
  },
}

export const WithAllActions: Story = {
  args: {
    logoTitle: 'Lightning POS',
    logoIcon: <LogoIcon />,
    navItems: defaultNavItems,
    user: { name: 'Jane Smith', subtitle: 'Cashier' },
    themeMode: 'light',
    onThemeToggle: fn(),
    onLogout: fn(),
  },
}

export const DarkMode: Story = {
  args: {
    logoTitle: 'Lightning POS',
    logoIcon: <LogoIcon />,
    navItems: defaultNavItems,
    user: { name: 'Jane Smith', subtitle: 'Cashier' },
    themeMode: 'dark',
    onThemeToggle: fn(),
    onLogout: fn(),
  },
}

export const NoLogo: Story = {
  args: {
    navItems: defaultNavItems,
    user: { name: 'John Doe' },
  },
}

const InteractiveSidebarExample = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const navItems = [
    { label: 'Dashboard', icon: <HomeIcon />, active: activeIndex === 0, onClick: () => setActiveIndex(0) },
    { label: 'Orders', icon: <ShoppingCartIcon />, active: activeIndex === 1, onClick: () => setActiveIndex(1) },
    { label: 'Products', icon: <BoxIcon />, active: activeIndex === 2, onClick: () => setActiveIndex(2) },
    { label: 'Settings', icon: <SettingsIcon />, active: activeIndex === 3, onClick: () => setActiveIndex(3) },
  ]

  return (
    <Sidebar
      logoTitle="Lightning POS"
      logoIcon={<LogoIcon />}
      navItems={navItems}
      user={{ name: 'John Doe', subtitle: 'Admin' }}
      themeMode={mode}
      onThemeToggle={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
      onLogout={() => alert('Logged out')}
    />
  )
}

export const Interactive: Story = {
  args: { navItems: defaultNavItems },
  render: () => <InteractiveSidebarExample />,
}
