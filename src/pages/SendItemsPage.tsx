import React, { useMemo } from 'react';
import { Input, Select, Checkbox, Slider, Button } from 'antd';
import { SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  toggleCategory,
  toggleVendor,
  setPriceRange,
  setSearchTerm,
  setSortBy,
  clearAllFilters,
  openDetailModal,
} from '../store/slices/sendItemsSlice';
import { SendProduct } from '../types';
import { CATEGORIES, VENDORS } from '../data/mockData';
import ItemDetailsModal from '../components/modals/ItemDetailsModal';
import SendConnectModal from '../components/modals/SendConnectModal';


const { Option } = Select;

// Shoe placeholder SVG for product cards
const ShoeSVG: React.FC = () => (
  <svg width="110" height="80" viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="55" cy="70" rx="50" ry="7" fill="#ddd6fe" opacity="0.4" />
    <path d="M10 57 C10 35 28 12 52 14 C74 16 95 34 97 52 C98 60 94 65 87 66 L10 66 Z" fill="#c084fc" opacity="0.75" />
    <path d="M10 57 C10 57 38 42 66 46 C88 49 97 56 97 56 L97 63 L10 64 Z" fill="#a855f7" opacity="0.55" />
    <rect x="6" y="61" width="96" height="10" rx="5" fill="var(--primary-color)" opacity="0.8" />
    <path d="M44 14 L50 40 M60 12 L63 40 M76 14 L74 41" stroke="white" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
  </svg>
);

const SendItemsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, filters } = useAppSelector((s) => s.sendItems);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.searchTerm.trim()) {
      const lower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(lower) || p.vendor.toLowerCase().includes(lower)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.vendors.length > 0) {
      result = result.filter((p) => filters.vendors.includes(p.vendor));
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    if (filters.sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'name_asc') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, filters]);

  return (
    <div>
      {/* Green Banner */}
      <div className="send-product-banner">
        <h1>Send Product</h1>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="send-items-layout">

        {/* Filters Sidebar */}
        <div className="filters-sidebar-wrap">
          <div className="filters-header">
            <span className="filters-title">Filters</span>
            <span
              className="filters-clear"
              onClick={() => dispatch(clearAllFilters())}
            >
              Clear All
            </span>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <div className="filter-label">
              Categories <span style={{ fontSize: 10 }}>^</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CATEGORIES.slice(0, 8).map((cat) => (
                <Checkbox
                  key={cat}
                  checked={filters.categories.includes(cat)}
                  onChange={() => dispatch(toggleCategory(cat))}
                  className="filter-check-item"
                >
                  {cat}
                </Checkbox>
              ))}
              <div style={{ color: '#a855f7', fontSize: 11, cursor: 'pointer', paddingLeft: 24 }}>
                +10 More
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <div className="filter-label">
              Price Range <span style={{ fontSize: 10 }}>^</span>
            </div>
            <Slider
              range
              min={0}
              max={500}
              value={filters.priceRange}
              onChange={(v) => dispatch(setPriceRange(v as [number, number]))}
              trackStyle={[{ background: '#a855f7' }]}
              handleStyle={[{ borderColor: '#a855f7' }, { borderColor: '#a855f7' }]}
            />
            <div className="price-range-labels">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Vendors */}
          <div className="filter-section">
            <div className="filter-label">
              Vendors <span style={{ fontSize: 10 }}>^</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {VENDORS.slice(0, 5).map((vendor) => (
                <Checkbox
                  key={vendor}
                  checked={filters.vendors.includes(vendor)}
                  onChange={() => dispatch(toggleVendor(vendor))}
                  className="filter-check-item"
                >
                  {vendor}
                </Checkbox>
              ))}
              <div style={{ color: '#a855f7', fontSize: 11, cursor: 'pointer', paddingLeft: 24 }}>
                +10 More
              </div>
            </div>
          </div>
        </div>

        {/* Products Content Area */}
        <div className="products-content">
          {/* Header row */}
          <div className="products-header">
            <div className="products-header-title">Send Item</div>
            <div style={{ display: 'flex', gap: 12, flex: 1, justifyContent: 'flex-end' }}>
              <Input
                placeholder="Search items..."
                value={filters.searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                style={{ width: 300, background: '#fff' }}
              />
              <Select
                value={filters.sortBy}
                onChange={(v) => dispatch(setSortBy(v))}
                style={{ width: 100 }}
                suffixIcon={<SortAscendingOutlined />}
                className="toolbar-sort"
              >
                <Option value="default">Sort</Option>
                <Option value="price_asc">Price: Low–High</Option>
                <Option value="price_desc">Price: High–Low</Option>
                <Option value="name_asc">Name A–Z</Option>
              </Select>
            </div>
          </div>

          {/* Grid */}
          <div className="products-grid">
            {filtered.map((product: SendProduct) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => dispatch(openDetailModal(product))}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ItemDetailsModal />
      <SendConnectModal />
    </div>
  );
};

// ---- Product Card ----
interface ProductCardProps {
  product: SendProduct;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => (
  <div className="product-grid-card" onClick={onClick}>
    <div className="product-grid-image">
      <ShoeSVG />
    </div>
    <div className="product-grid-dots">
      <span className="dot active"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
    <div className="product-grid-info">
      <div className="product-name" title={product.name}>{product.name}</div>
      <div className="product-price">${product.price}</div>
      <div className="product-vendor">Vendor</div>
      <div style={{ fontWeight: 600, fontSize: 11 }}>{product.vendor}</div>
    </div>
  </div>
);

export default SendItemsPage;
