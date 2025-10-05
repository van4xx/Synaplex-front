import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}
