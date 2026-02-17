import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  closeRecipientModal,
  confirmOrder,
  closeSuccessModal,
} from '../../store/slices/sendItemsSlice';

const { Option } = Select;

// Shoe placeholder
const ShoeSVG: React.FC = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="78" rx="54" ry="8" fill="#e9d5ff" opacity="0.5" />
    <path d="M15 65 C15 40 35 15 62 18 C85 21 105 40 108 58 C110 66 106 70 99 72 L15 72 Z" fill="#c084fc" opacity="0.8" />
    <path d="M15 65 C15 65 45 48 75 52 C98 55 108 62 108 62 L108 68 L15 70 Z" fill="#a855f7" opacity="0.6" />
    <rect x="10" y="67" width="102" height="11" rx="5.5" fill="var(--primary-color)" opacity="0.85" />
  </svg>
);

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Japan',
];

const SendConnectModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { recipientModalOpen, successModalOpen, selectedProduct } = useAppSelector(
    (s) => s.sendItems
  );
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      await new Promise((res) => setTimeout(res, 400));
      dispatch(confirmOrder());
      form.resetFields();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  // ---- SUCCESS STATE ----
  if (successModalOpen) {
    return (
      <Modal
        open={successModalOpen}
        onCancel={() => dispatch(closeSuccessModal())}
        footer={null}
        width={320}
        centered
        className="success-modal"
        closeIcon={<CloseOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />}
      >
        <div className="success-modal__icon-wrap">
          <CheckCircleFilled className="success-modal__icon" />
        </div>
        <div className="success-modal__title">Order Sent Successfully!</div>
        <div className="success-modal__sub">Your Order has been successfully created.</div>
        <Button
          type="primary"
          className="btn-primary"
          block
          onClick={() => dispatch(closeSuccessModal())}
          style={{ borderRadius: 8, height: 38 }}
        >
          Done
        </Button>
      </Modal>
    );
  }

  // ---- FORM STATE ----
  return (
    <Modal
      open={recipientModalOpen}
      onCancel={() => dispatch(closeRecipientModal())}
      footer={null}
      width={820}
      centered
      className="send-connect-modal"
      closeIcon={<CloseOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />}
      destroyOnClose={false}
    >
      {/* Header */}
      <div className="modal-header">
        <div className="modal-header__title">Send EGP Connect</div>
        <div className="modal-header__sub">
          Send a gift to your recipient through filling out the details in this connect
        </div>
      </div>

      {/* Body */}
      <div className="send-connect-body">
        {/* Left: Selected Item */}
        <div className="send-connect-left">
          <div className="send-connect-item-label">Selected Item</div>

          <div className="send-connect-product-img">
            <ShoeSVG />
          </div>

          <div className="send-connect-product-name">
            {selectedProduct?.name ?? 'Item Name'}
          </div>
          <div className="send-connect-product-price">
            ${selectedProduct?.price.toFixed(2) ?? '0.00'}
          </div>

          <div className="send-connect-value-box">
            <div className="send-connect-value-label">Product Value</div>
            <div className="send-connect-value-amount">
              ${selectedProduct?.price.toFixed(2) ?? '0.00'}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="send-connect-right">
          <Form form={form} layout="vertical" requiredMark={false}>
            {/* Recipient Details */}
            <div className="send-connect-section-title">Recipient Details</div>

            <div className="form-grid-1">
              <Form.Item
                name="recipientEmail"
                label="Recipient Email *"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Enter a valid email address' },
                ]}
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </div>

            <div className="form-grid-2">
              <Form.Item
                name="recipientName"
                label="Recipient Name *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>

              <Form.Item
                name="recipientCompany"
                label="Recipient Company"
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Enter Company (optional)" />
              </Form.Item>
            </div>

            {/* Address Details */}
            <div className="send-connect-section-title" style={{ marginTop: 6 }}>
              Address Details
            </div>

            <div className="form-grid-2">
              <Form.Item
                name="addressLine1"
                label="Address Line 1 *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Enter Address" />
              </Form.Item>

              <Form.Item
                name="addressLine2"
                label="Address Line 2"
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Enter Address (optional)" />
              </Form.Item>
            </div>

            <div className="form-grid-2">
              <Form.Item
                name="country"
                label="Country *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ marginBottom: 12 }}
              >
                <Select placeholder="Select Country">
                  {COUNTRIES.map((c) => (
                    <Option key={c} value={c}>{c}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="zipCode"
                label="Zip Code *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ marginBottom: 12 }}
              >
                <Input placeholder="Enter Zip Code" />
              </Form.Item>
            </div>

            <div className="form-grid-2">
              <Form.Item
                name="city"
                label="City *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="City Name" />
              </Form.Item>

              <Form.Item
                name="state"
                label="State *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="State Name" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <Button
          className="btn-default"
          onClick={() => dispatch(closeRecipientModal())}
        >
          ← Back
        </Button>
        <Button
          type="primary"
          className="btn-primary"
          onClick={handleSubmit}
          loading={loading}
        >
          Confirm Order
        </Button>
      </div>
    </Modal>
  );
};

export default SendConnectModal;
