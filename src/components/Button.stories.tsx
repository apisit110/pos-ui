import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Click me', onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, args }) => {
    await expect(canvas.getByRole('button')).toBeDisabled()
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const Loading: Story = {
  args: { isLoading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled()
    await expect(canvas.queryByText('Click me')).toBeNull()
  },
}
