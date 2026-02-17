import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload } from 'antd';
import { CheckCircleFilled, InboxOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeAddModal, addProduct } from '../../store/slices/productsSlice';
import { PRODUCT_CATEGORIES } from '../../data/mockData';

const { TextArea } = Input;
const { Option } = Select;

const AddProductModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { addModalOpen, addModalSuccess } = useAppSelector((s) => s.products);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    form.resetFields();
    dispatch(closeAddModal());
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // Simulate async
      await new Promise((res) => setTimeout(res, 400));
      dispatch(
        addProduct({
          name: values.name,
          description: values.description,
          category: values.category,
          processingTime: values.processingTime,
          price: parseFloat(values.price),
        })
      );
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  // ---- SUCCESS STATE ----
  if (addModalSuccess) {
    return (
      <Modal
        open={addModalOpen}
        onCancel={handleClose}
        footer={null}
        width={320}
        centered
        className="success-modal"
        closeIcon={<CloseOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />}
      >
        <div className="success-modal__icon-wrap">
          <CheckCircleFilled className="success-modal__icon" />
        </div>
        <div className="success-modal__title">Product added Successfully</div>
        <div className="success-modal__sub">Your request has been completed.</div>
        <Button
          type="primary"
          className="btn-primary"
          block
          onClick={handleClose}
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
      open={addModalOpen}
      onCancel={handleClose}
      footer={null}
      width={700}
      centered
      className="add-product-modal"
      closeIcon={<CloseOutlined style={{ fontSize: 14, color: 'var(--text-muted)' }} />}
      destroyOnClose
    >
      {/* Header */}
      <div className="modal-header">
        <div className="modal-header__title">Add Product</div>
        <div className="modal-header__sub">
          Provide product details, images, and pricing to make your Product available on the platform
        </div>
      </div>

      {/* Body: Two columns */}
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="modal-body--two-col">
          {/* Left: General Info */}
          <div className="modal-col--general">
            <div className="modal-col-title">General Information</div>

            <Form.Item
              name="name"
              label="Name *"
              rules={[{ required: true, message: 'Product name is required' }]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description *"
              rules={[{ required: true, message: 'Description is required' }]}
            >
              <TextArea
                placeholder="Add Description..."
                rows={3}
                style={{ resize: 'none', borderRadius: 8 }}
              />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category *"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Select">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
            </Form.Item>

            <div style={{ display: 'flex', gap: 12 }}>
              <Form.Item
                name="processingTime"
                label="Processing Time *"
                rules={[{ required: true, message: 'Required' }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input placeholder="Enter Time" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price *"
                rules={[
                  { required: true, message: 'Required' },
                  {
                    validator: (_, value) => {
                      if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
                        return Promise.reject('Enter a valid price');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input placeholder="$ Enter Price" type="number" min={0} />
              </Form.Item>
            </div>
          </div>

          {/* Right: Product Media */}
          <div className="modal-col--media">
            <div className="modal-col-title">Product Media</div>
            <div className="modal-col-subtitle">Product Photos *</div>

            <Upload.Dragger
              accept="image/*"
              multiple
              showUploadList={false}
              beforeUpload={() => false}
              style={{ border: 'none', background: 'transparent' }}
            >
              <div className="upload-zone">
                <InboxOutlined className="upload-zone__icon" />
                <div className="upload-zone__text">
                  Drop your Images, or{' '}
                  <span className="upload-zone__link">Click to Browse</span>
                </div>
                <div className="upload-zone__hint">
                  1024 × 1024 (4:3) recommended, up to 10MB
                </div>
              </div>
            </Upload.Dragger>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <Button className="btn-default" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="btn-primary"
            onClick={handleSubmit}
            loading={loading}
          >
            Add Product
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
