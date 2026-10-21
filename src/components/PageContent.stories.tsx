import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { PageContent } from './PageContent'

const meta = {
  component: PageContent,
  tags: ['autodocs'],
} satisfies Meta<typeof PageContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: <p>Main content</p> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('main')).toBeVisible()
  },
}
