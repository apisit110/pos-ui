import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { PageHeader } from './PageHeader'

const meta = {
  component: PageHeader,
  tags: ['autodocs'],
  args: { title: 'Orders' },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Orders' })).toBeVisible()
  },
}

export const WithBack: Story = {
  args: { onBack: fn() },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: /back/i }))
    await expect(args.onBack).toHaveBeenCalledOnce()
  },
}

export const WithoutLogo: Story = {
  args: { showLogo: false },
}

export const WithUser: Story = {
  args: { user: { username: 'john', role: 'cashier' } },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('john')).toBeVisible()
  },
}

export const WithLogout: Story = {
  args: { user: { username: 'jane', role: 'manager' }, onLogout: fn() },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Logout' }))
    await expect(args.onLogout).toHaveBeenCalledOnce()
  },
}

export const CustomLogoutLabel: Story = {
  args: { onLogout: fn(), logoutLabel: 'ออกจากระบบ' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'ออกจากระบบ' })).toBeVisible()
  },
}

export const WithExtraContent: Story = {
  args: { extraContent: <span>Extra</span> },
}
