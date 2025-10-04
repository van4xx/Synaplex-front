import { NavLink } from 'react-router-dom';
import { HomeIcon, ProfileIcon, DiamondIcon, HistoryIcon, StatsIcon } from './Icons';
import './Navigation.css';

export default function Navigation() {
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Главная' },
    { path: '/profile', icon: ProfileIcon, label: 'Профиль' },
    { path: '/subscription', icon: DiamondIcon, label: 'Подписка' },
    { path: '/history', icon: HistoryIcon, label: 'История' },
    { path: '/stats', icon: StatsIcon, label: 'Статистика' }
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
