import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['autodocs'],
  args: { $variant: 'success', children: 'Paid' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Paid')).toBeVisible()
  },
}

export const Error: Story = {
  args: { $variant: 'error', children: 'Failed' },
}

export const Info: Story = {
  args: { $variant: 'info', children: 'Pending' },
}

export const Warning: Story = {
  args: { $variant: 'warning', children: 'Pending' },
}

export const Neutral: Story = {
  args: { $variant: 'neutral', children: 'Unknown' },
}

export const Pill: Story = {
  args: { $shape: 'pill' },
}

export const Medium: Story = {
  args: { $size: 'md' },
}
