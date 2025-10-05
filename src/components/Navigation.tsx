import { NavLink } from 'react-router-dom';
import { HomeIcon, ProfileIcon, DiamondIcon, HistoryIcon, SettingsIcon } from './Icons';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <HomeIcon className="nav-icon" />
        <span className="nav-label">Главная</span>
      </NavLink>

      <NavLink
        to="/subscription"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <DiamondIcon className="nav-icon" />
        <span className="nav-label">Подписки</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => `nav-item nav-item-center ${isActive ? 'active' : ''}`}
      >
        <div className="profile-circle">
          <ProfileIcon className="nav-icon-center" />
        </div>
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <HistoryIcon className="nav-icon" />
        <span className="nav-label">История</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <SettingsIcon className="nav-icon" />
        <span className="nav-label">Настройки</span>
      </NavLink>
    </nav>
  );
}
