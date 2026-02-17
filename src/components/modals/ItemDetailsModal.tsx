import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  closeDetailModal,
  openRecipientModal,
  setSelectedColor,
  setSelectedSize,
} from '../../store/slices/sendItemsSlice';

// Shoe SVG placeholder
const ShoeSVG: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <svg width={size} height={Math.round(size * 0.7)} viewBox="0 0 160 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="95" rx="72" ry="10" fill="#e9d5ff" opacity="0.5" />
    <path d="M20 80 C20 50 50 20 90 25 C120 28 145 50 148 72 C150 82 145 88 135 90 L20 90 Z" fill="#c084fc" opacity="0.8" />
    <path d="M20 80 C20 80 60 60 100 65 C130 68 148 75 148 75 L148 85 L20 88 Z" fill="#a855f7" opacity="0.6" />
    <rect x="14" y="84" width="136" height="14" rx="7" fill="var(--primary-color)" opacity="0.85" />
    <path d="M60 25 L70 55 M80 22 L85 54 M100 24 L100 56" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <path d="M30 60 C50 40 80 35 110 40" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const ThumbSVG: React.FC = () => (
  <svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 24 C4 14 12 4 22 5 C32 6 40 14 40 22 C40 26 38 28 35 28 L4 28 Z" fill="#c084fc" opacity="0.8" />
    <rect x="2" y="25" width="40" height="5" rx="2.5" fill="var(--primary-color)" opacity="0.7" />
  </svg>
);

const ItemDetailsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { detailModalOpen, selectedProduct, selectedColor, selectedSize } =
    useAppSelector((s) => s.sendItems);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!selectedProduct) return null;

  const canProceed = selectedColor && selectedSize;

  return (
    <Modal
      open={detailModalOpen}
      onCancel={() => dispatch(closeDetailModal())}
      footer={null}
      width={760}
      centered
      className="item-details-modal"
      closeIcon={<CloseOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />}
      destroyOnClose
    >
      {/* Header */}
      <div className="modal-header">
        <div className="modal-header__title">Item Details</div>
        <div className="modal-header__sub">
          Review the item details, select your options and click 'Send Item' when ready
        </div>
      </div>

      {/* Body */}
      <div className="item-details-body">
        {/* Left: Images */}
        <div className="item-details-left">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <ShoeSVG size={180} />
          </div>

          {/* Thumbnails */}
          <div className="item-details-thumbs">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`item-thumb ${activeThumb === i ? 'active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                <ThumbSVG />
              </div>
            ))}
          </div>

          {/* Qty badge */}
          <div className="item-details-qty-row">
            <span className="item-qty-badge">
              {selectedProduct.sizes.length * 10} Items
            </span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="item-details-right">
          <div className="item-details-name">{selectedProduct.name}</div>
          <div className="item-details-price">${selectedProduct.price.toFixed(2)}</div>
          <div className="item-details-vendor">{selectedProduct.vendor}</div>

          <div className="item-details-section-label">Description</div>
          <div className="item-details-description">{selectedProduct.description}</div>

          <div className="item-details-section-label" style={{ marginTop: 16 }}>
            Product Options Available
          </div>

          {/* Color Select */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 7 }}>
              Select Colour
            </div>
            <div className="color-swatches">
              {selectedProduct.colors.map((color) => (
                <div
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                  style={{
                    backgroundColor: color,
                    outlineColor: color,
                  }}
                  onClick={() => dispatch(setSelectedColor(color))}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Select */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 7 }}>
              Select Size
            </div>
            <div className="size-buttons">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => dispatch(setSelectedSize(size))}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <Button className="btn-default" onClick={() => dispatch(closeDetailModal())}>
          ← Back
        </Button>
        <Button
          type="primary"
          className="btn-primary"
          onClick={() => dispatch(openRecipientModal())}
          disabled={!canProceed}
          title={!canProceed ? 'Please select color and size first' : ''}
        >
          Send Item
        </Button>
      </div>
    </Modal>
  );
};

export default ItemDetailsModal;
