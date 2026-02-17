import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';

const Footer: React.FC = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'English',
        },
        {
            key: '2',
            label: 'Spanish',
        },
    ];

    return (
        <footer className="app-footer">
            <div className="app-footer__left">
                <span className="footer-text">@2025 Send365. All Right Reserved</span>
                <a href="#" className="footer-link">Privacy Policy</a>
                <span className="footer-text">Version 2.8.1</span>
            </div>

            <div className="app-footer__right">
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()} className="language-selector">
                        <Space>
                            <img
                                src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/us.svg"
                                alt="US"
                                style={{ width: 16, height: 12, objectFit: 'cover', borderRadius: 2 }}
                            />
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>English</span>
                            <DownOutlined style={{ fontSize: 10, color: 'var(--text-muted)' }} />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </footer>
    );
};

export default Footer;
