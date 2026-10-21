import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { StatusTimeline } from './StatusTimeline'

const meta = {
  component: StatusTimeline,
  tags: ['autodocs'],
  args: {
    steps: [
      { label: 'Created', time: '21 Oct 2026, 10:00', done: true },
      { label: 'Processing', time: '21 Oct 2026, 10:02', done: true },
      { label: 'Completed', done: false },
    ],
  },
} satisfies Meta<typeof StatusTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Created')).toBeVisible()
    await expect(canvas.getByText('Completed')).toBeVisible()
  },
}

export const AllDone: Story = {
  args: {
    steps: [
      { label: 'Created', time: '21 Oct 2026, 10:00', done: true },
      { label: 'Completed', time: '21 Oct 2026, 10:05', done: true },
    ],
  },
}

export const NoneDone: Story = {
  args: {
    steps: [
      { label: 'Created', done: false },
      { label: 'Completed', done: false },
    ],
  },
}
