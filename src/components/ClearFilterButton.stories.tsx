import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { ClearFilterButton } from './ClearFilterButton'

const meta = {
  component: ClearFilterButton,
  tags: ['autodocs'],
  args: { children: 'Clear', onClick: fn() },
} satisfies Meta<typeof ClearFilterButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
