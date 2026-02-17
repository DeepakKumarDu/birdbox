import React, { useMemo } from 'react';
import { Table, Input, Select, Button, Dropdown, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  ExportOutlined,
  CustomerServiceOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  openAddModal,
  setSearchTerm,
  setStatusFilter,
  setCategoryFilter,
  setSortBy,
  setCurrentPage,
  setPageSize,
  deleteProduct,
} from '../store/slices/productsSlice';
import { Product, SortOption } from '../types';
import { PRODUCT_CATEGORIES } from '../data/mockData';
import AddProductModal from '../components/modals/AddProductModal';

const { Option } = Select;

const SHOE_SVG = (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 22c0 0 4-8 10-10s12-2 16 2 4 8 0 10H2z" fill="#c084fc" opacity="0.6" />
    <path d="M2 22h24l2-2c0 0-8-6-16-4S2 22 2 22z" fill="#a855f7" opacity="0.5" />
    <rect x="0" y="21" width="32" height="5" rx="2.5" fill="#7B2FBE" opacity="0.7" />
  </svg>
);

const ProductListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, searchTerm, statusFilter, categoryFilter, sortBy, currentPage, pageSize } =
    useAppSelector((s) => s.products);

  // ---- Filtered & sorted products ----
  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.id.toLowerCase().includes(lower)
      );
    }

    // Category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, categoryFilter, statusFilter, sortBy]);

  const activeCount = products.filter((p) => p.status === 'Active').length;
  const inactiveCount = products.filter((p) => p.status === 'Inactive').length;

  // ---- Table columns ----
  const columns: ColumnsType<Product> = [
    {
      title: '',
      dataIndex: 'image',
      width: 60,
      render: () => (
        <div className="product-thumb">{SHOE_SVG}</div>
      ),
    },
    {
      title: 'PRODUCT NAME',
      dataIndex: 'name',
      render: (name: string, record: Product) => (
        <div>
          <div className="product-name-cell__name">{name}</div>
          <div className="product-name-cell__price">${record.price.toFixed(2)}</div>
        </div>
      ),
    },
    {
      title: 'PRODUCT ID',
      dataIndex: 'id',
      render: (id: string) => <span className="product-id">{id}</span>,
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      render: (cat: string) => (
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{cat}</span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (status: string) => (
        <span
          className={`status-badge ${status === 'Active' ? 'status-badge--active' : 'status-badge--inactive'
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_: unknown, record: Product) => (
        <Dropdown
          menu={{
            items: [
              { key: 'edit', label: 'Edit' },
              { key: 'view', label: 'View' },
              {
                key: 'delete',
                label: <span style={{ color: '#ef4444' }}>Delete</span>,
                onClick: () => dispatch(deleteProduct(record.id)),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<MoreOutlined style={{ fontSize: 16, color: 'var(--text-muted)' }} />}
            size="small"
          />
        </Dropdown>
      ),
    },
  ];

  // ---- Pagination Logic ----
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      {/* Green Banner */}
      <div className="page-banner">
        <h1>Add Product</h1>
      </div>

      {/* Main card */}
      <div className="product-page">
        {/* Header: Title + Category filter */}
        <div className="product-page__header">
          <span className="product-page__title">Product List</span>
          <Select
            value={categoryFilter}
            onChange={(v) => dispatch(setCategoryFilter(v))}
            style={{ width: 160 }}
            suffixIcon={<DownOutlined style={{ fontSize: 11, color: 'var(--text-muted)' }} />}
          >
            <Option value="All Categories">All Categories</Option>
            {PRODUCT_CATEGORIES.map((c) => (
              <Option key={c} value={c}>{c}</Option>
            ))}
          </Select>
        </div>

        {/* Status tabs */}
        <div className="status-tabs">
          {(['All', 'Active', 'Inactive'] as const).map((tab) => (
            <button
              key={tab}
              className={`status-tab ${statusFilter === tab ? 'active' : ''}`}
              onClick={() => dispatch(setStatusFilter(tab))}
            >
              {tab}
              <span className="status-tab__count">
                {tab === 'All'
                  ? products.length
                  : tab === 'Active'
                    ? activeCount
                    : inactiveCount}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="product-toolbar">
          <div className="product-toolbar__search" style={{ flex: 1, display: 'flex', gap: 12 }}>
            <Input
              prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />}
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              allowClear
              style={{ maxWidth: 320 }}
            />
            <Button
              icon={<span className="anticon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.75 4.08333H12.25M3.5 7H10.5M5.25 9.91667H8.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
            />

            <Dropdown
              menu={{
                items: [
                  { key: 'activate', label: 'Activate' },
                  { key: 'deactivate', label: 'Deactivate' },
                  { key: 'delete', label: 'Delete', danger: true },
                ]
              }}
              trigger={['click']}
            >
              <Button style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12 }}>✓</span>
                Bulk Action
              </Button>
            </Dropdown>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Dropdown
              menu={{
                items: [
                  { key: 'id_asc', label: 'Default' },
                  { key: 'name_asc', label: 'Name A–Z' },
                  { key: 'name_desc', label: 'Name Z–A' },
                  { key: 'price_asc', label: 'Price ↑' },
                  { key: 'price_desc', label: 'Price ↓' },
                ],
                onClick: ({ key }) => dispatch(setSortBy(key as SortOption))
              }}
              trigger={['click']}
            >
              <Button style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Sort
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>⇅</span>
              </Button>
            </Dropdown>

            <Button className="btn-icon" icon={<CustomerServiceOutlined />}>
              Support
            </Button>

            <Button
              type="primary"
              className="btn-primary"
              icon={<PlusOutlined />}
              onClick={() => dispatch(openAddModal())}
              style={{ background: '#a855f7', borderColor: '#a855f7' }}
            >
              Add Product
            </Button>
          </div>
        </div>

        {/* Card containing Table and Pagination */}
        <div className="product-card">
          {/* Table */}
          <div className="product-table-wrap">
            <Table
              rowSelection={{ type: 'checkbox' }}
              columns={columns}
              dataSource={paginatedProducts} // Use paginated data
              pagination={false}
              rowKey="id"
              className="product-table"
              locale={{ emptyText: 'No products found' }}
            />
          </div>

          <div className="pagination-bar">
            <div className="pagination-wrap">
              <div className="custom-pagination">
                <button
                  className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {'<'}
                </button>

                {getPageNumbers().map((page, idx) => (
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="page-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`page-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(Number(page))}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {'>'}
                </button>
              </div>
            </div>

            <div className='pagination-wrap'>
              <div className="pagination-total">
                Total {totalItems} Products
              </div>
              <Select
                value={`${pageSize}/ page`}
                size="small"
                style={{ width: 100 }}
                onChange={(val) => dispatch(setPageSize(Number(val)))}
              >
                <Option value="8">8/ page</Option>
                <Option value="16">16/ page</Option>
                <Option value="32">32/ page</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal />
    </div>
  );
};

export default ProductListPage;
