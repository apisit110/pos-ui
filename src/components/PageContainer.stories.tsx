import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { PageContainer } from './PageContainer'

const meta = {
  component: PageContainer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: <p>Page content</p> },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Page content')).toBeVisible()
  },
}

export const WithTotalCount: Story = {
  args: { children: <span className="total-count">120 items</span> },
}
