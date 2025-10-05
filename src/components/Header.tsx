import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { DiamondIcon } from './Icons';
import './Header.css';

export default function Header() {
  const { userData } = useUser();
  const subscription = userData?.subscription;
  const hasActiveSubscription = subscription?.status === 'ACTIVE';

  return (
    <header className="mini-header">
      <div className="header-content">
        <Link to="/profile" className="profile-link">
          <div className="profile-avatar-mini">
            {userData?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="profile-name">{userData?.firstName || 'User'}</span>
        </Link>
        
        <div className="header-right">
          {hasActiveSubscription ? (
            <Link to="/subscription" className="plan-badge">
              <DiamondIcon className="badge-icon" />
              <span>{subscription.plan}</span>
            </Link>
          ) : (
            <Link to="/subscription" className="subscribe-button">
              <span>Подписка</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

