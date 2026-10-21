import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { FileDropZone } from './FileDropZone'

const meta = {
  component: FileDropZone,
  tags: ['autodocs'],
  args: {
    accept: '.xlsx',
    icon: '📄',
    hint: 'Sheet "product" (required) and sheet "store_product" (optional)',
    onFile: () => {},
    children: (
      <>
        Drag & drop an Excel (.xlsx) file here, or <strong>browse</strong>
      </>
    ),
  },
} satisfies Meta<typeof FileDropZone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('browse')).toBeVisible()
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithSelectedFile: Story = {
  render: (args) => {
    const [name, setName] = useState('')
    return (
      <>
        <FileDropZone {...args} onFile={(f) => setName(f.name)} />
        {name && <p>Selected: {name}</p>}
      </>
    )
  },
}
