import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useTelegram } from '@/contexts/TelegramContext';
import { DiamondIcon } from './Icons';
import './Header.css';

export default function Header() {
  const { userData } = useUser();
  const { user } = useTelegram();
  const subscription = userData?.subscription;
  const hasActiveSubscription = subscription?.status === 'ACTIVE';

  // Получаем имя и фото из Telegram
  const userName = user?.first_name || userData?.firstName || 'User';
  const userPhoto = user?.photo_url;

  return (
    <header className="mini-header">
      <div className="header-content">
        <Link to="/profile" className="profile-link">
          {userPhoto ? (
            <img src={userPhoto} alt={userName} className="profile-avatar-mini" />
          ) : (
            <div className="profile-avatar-mini">
              {userName[0]?.toUpperCase() || 'U'}
            </div>
          )}
          <span className="profile-name">{userName}</span>
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

