import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { Switch, Tooltip } from 'antd';
import {
  LogoutOutlined,
  SendOutlined,
  TruckFilled,
  LayoutFilled,
  BellFilled,
  MoonFilled,
  ProductFilled,
} from '@ant-design/icons';

// Shoe placeholder for avatars
const UserAvatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div className="sidebar__avatar">{initials}</div>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <img src="/birdbox.svg" alt="Birdbox" style={{ width: 28, height: 28, objectFit: 'contain' }} />
        </div>
        <span className="sidebar__logo-text">BIRDBOX</span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 14,
            color: 'var(--text-muted)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          ‹
        </span>
      </div>

      {/* Links Section */}
      <ul className="sidebar__nav">
        <Tooltip title="" placement="right">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => `sidebar__nav-item${isActive ? ' active' : ''}`}>
              <LayoutFilled className="nav-icon" />
              <span className="nav-label">Dashboard</span>
            </NavLink>
          </li>
        </Tooltip>
        <div className="sidebar__section-label">ORDER</div>

        <Tooltip title="" placement="right">
          <li>
            <NavLink to="/" end className={({ isActive }) => `sidebar__nav-item${isActive ? ' active' : ''}`}>
              <ProductFilled className="nav-icon" />
              <span className="nav-label">Product List</span>
            </NavLink>
          </li>
        </Tooltip>
        <Tooltip title="" placement="right">
          <li>
            <NavLink to="/send-items" className={({ isActive }) => `sidebar__nav-item${isActive ? ' active' : ''}`}>
              <SendOutlined className="nav-icon" />
              <span className="nav-label">Send Items</span>
            </NavLink>
          </li>
        </Tooltip>

        <Tooltip title="" placement="right">
          <li>
            <NavLink to="/orders" className={({ isActive }) => `sidebar__nav-item${isActive ? ' active' : ''}`}>
              <TruckFilled className="nav-icon" />
              <span className="nav-label">Order List</span>
            </NavLink>
          </li>
        </Tooltip>
      </ul>

      {/* System Section */}
      <div className="sidebar__section-label">SYSTEM</div>
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item" onClick={() => navigate('/notifications')}>
          <BellFilled className="nav-icon" />
          <span className="nav-label">Notifications</span>
          <span className="sidebar__nav-badge">20</span>
        </li>

        <li className="sidebar__dark-toggle">
          <MoonFilled className="nav-icon" style={{ color: 'var(--text-secondary)', fontSize: 15 }} />
          <span className="nav-label" style={{ flex: 1 }}>Dark Mode</span>
          <Switch
            size="small"
            checked={darkMode}
            onChange={toggleDarkMode}
            style={{ flexShrink: 0 }}
          />
        </li>
      </ul>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__user">
          <UserAvatar initials="MS" />
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">Mia Smith</div>
            <div className="sidebar__user-role">Vendor</div>
          </div>
        </div>

        <div className="sidebar__logout">
          <LogoutOutlined style={{ fontSize: 13 }} />
          <span>Log Out</span>
        </div>

      </div>
    </aside >
  );
};

export default Sidebar;
