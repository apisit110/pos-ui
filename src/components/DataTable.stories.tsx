import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within, userEvent, fn } from 'storybook/test'
import { DataTable } from './DataTable'
import type { Column } from './DataTable'

interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const sampleData: Product[] = [
  { id: 1, name: 'Espresso Shot',     sku: 'BVR-001', category: 'Beverage', price: 45,  stock: 120, status: 'In Stock'     },
  { id: 2, name: 'Cappuccino',        sku: 'BVR-002', category: 'Beverage', price: 65,  stock: 80,  status: 'In Stock'     },
  { id: 3, name: 'Croissant',         sku: 'FD-001',  category: 'Food',     price: 55,  stock: 5,   status: 'Low Stock'    },
  { id: 4, name: 'Blueberry Muffin',  sku: 'FD-002',  category: 'Food',     price: 60,  stock: 0,   status: 'Out of Stock' },
  { id: 5, name: 'Green Tea Latte',   sku: 'BVR-003', category: 'Beverage', price: 70,  stock: 45,  status: 'In Stock'     },
  { id: 6, name: 'Americano',         sku: 'BVR-004', category: 'Beverage', price: 50,  stock: 200, status: 'In Stock'     },
  { id: 7, name: 'Chocolate Cake',    sku: 'FD-003',  category: 'Food',     price: 95,  stock: 3,   status: 'Low Stock'    },
  { id: 8, name: 'Orange Juice',      sku: 'BVR-005', category: 'Beverage', price: 55,  stock: 60,  status: 'In Stock'     },
]

const statusColors: Record<Product['status'], string> = {
  'In Stock':     '#22c55e',
  'Low Stock':    '#f59e0b',
  'Out of Stock': '#ef4444',
}

const basicColumns: Column<Product>[] = [
  { header: 'Name',     key: 'name'  },
  { header: 'Category', key: 'category' },
  { header: 'Price',    key: 'price', textAlign: 'right', render: (item) => `฿${item.price}` },
  { header: 'Stock',    key: 'stock', textAlign: 'right' },
]

const richColumns: Column<Product>[] = [
  {
    header: 'Product',
    subHeader: 'SKU · Category',
    key: 'name',
    render: (item) => <strong>{item.name}</strong>,
    subRender: (item) => `${item.sku} · ${item.category}`,
  },
  {
    header: 'Price',
    subHeader: 'THB',
    key: 'price',
    textAlign: 'right',
    render: (item) => `฿${item.price.toFixed(2)}`,
    subRender: (item) => item.price > 60 ? 'Premium' : 'Standard',
  },
  {
    header: 'Stock',
    subHeader: 'Available units',
    key: 'stock',
    textAlign: 'right',
    render: (item) => item.stock,
    subRender: (item) => item.stock === 0 ? 'Reorder needed' : item.stock < 10 ? 'Reorder soon' : 'Sufficient',
  },
  {
    header: 'Status',
    key: 'status',
    render: (item) => (
      <span style={{ color: statusColors[item.status], fontWeight: 600 }}>
        {item.status}
      </span>
    ),
  },
]

const meta = {
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// ─── Basic ──────────────────────────────────────────────────────────────────

export const Basic: Story = {
  args: {
    columns: basicColumns as Column<unknown>[],
    data: sampleData,
    rowKey: 'id',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Espresso Shot')).toBeVisible()
    await expect(canvas.getByText('Cappuccino')).toBeVisible()
  },
}

// ─── Two-line header & cells ─────────────────────────────────────────────────

export const TwoLineColumns: Story = {
  args: {
    columns: richColumns as Column<unknown>[],
    data: sampleData,
    rowKey: 'id',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('SKU · Category')).toBeVisible()
    await expect(canvas.getByText('Available units')).toBeVisible()
  },
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    columns: basicColumns as Column<unknown>[],
    data: [],
    isLoading: true,
    pageSize: 5,
    rowKey: 'id',
  },
}

// ─── Empty state ──────────────────────────────────────────────────────────────

export const Empty: Story = {
  args: {
    columns: basicColumns as Column<unknown>[],
    data: [],
    emptyMessage: 'No products found.',
    rowKey: 'id',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('No products found.')).toBeVisible()
  },
}

// ─── Custom empty state ───────────────────────────────────────────────────────

export const CustomEmptyState: Story = {
  args: {
    columns: basicColumns as Column<unknown>[],
    data: [],
    rowKey: 'id',
    emptyState: (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
        <div style={{ fontWeight: 600 }}>No products yet</div>
        <div style={{ opacity: 0.6, fontSize: '0.875rem' }}>Add your first product to get started</div>
      </div>
    ),
  },
}

// ─── With pagination ──────────────────────────────────────────────────────────

const PaginatedTable = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const start = (page - 1) * pageSize
  const paginated = sampleData.slice(start, start + pageSize)

  return (
    <DataTable
      columns={basicColumns as Column<unknown>[]}
      data={paginated}
      rowKey="id"
      totalItems={sampleData.length}
      currentPage={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(size) => { setPageSize(size); setPage(1) }}
    />
  )
}

export const WithPagination: Story = {
  args: { columns: [], data: [] },
  render: () => <PaginatedTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('1-3 of 8')).toBeVisible()
  },
}

// ─── Sticky header ────────────────────────────────────────────────────────────

export const StickyHeader: Story = {
  args: {
    columns: basicColumns as Column<unknown>[],
    data: sampleData,
    rowKey: 'id',
    stickyHeader: true,
  },
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Header stays fixed when the table scrolls.' } },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px', overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
}

// ─── Clickable rows ───────────────────────────────────────────────────────────

export const ClickableRows: Story = {
  args: {
    columns: basicColumns as Column<unknown>[],
    data: sampleData,
    rowKey: 'id',
    onRowClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const row = canvas.getByText('Espresso Shot').closest('tr')!
    await userEvent.click(row)
    await expect(args.onRowClick).toHaveBeenCalledOnce()
  },
}

// ─── Row class names (highlight low / out of stock) ──────────────────────────

export const RowHighlighting: Story = {
  args: {
    columns: richColumns as Column<unknown>[],
    data: sampleData,
    rowKey: 'id',
    getRowClassName: (item: unknown) => {
      const p = item as Product
      if (p.status === 'Out of Stock') return 'row-danger'
      if (p.status === 'Low Stock')    return 'row-warn'
      return ''
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .row-danger td { background: rgba(239,68,68,0.08); }
          .row-warn   td { background: rgba(245,158,11,0.08); }
        `}</style>
        <Story />
      </>
    ),
  ],
}
