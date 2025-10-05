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
        <div className="header-left">
          <div className="logo-text">NeiroBOT</div>
        </div>
        
        <div className="header-right">
          {userData && (
            <>
              <div className="user-info">
                <span className="user-name">{userData.firstName || 'User'}</span>
                {hasActiveSubscription ? (
                  <div className="subscription-badge">
                    <DiamondIcon className="badge-icon" />
                    <span>{subscription.plan}</span>
                  </div>
                ) : (
                  <Link to="/subscription" className="subscribe-link">
                    <DiamondIcon className="badge-icon" />
                    <span>Подписка</span>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
