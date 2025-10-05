import { useUser } from '@/contexts/UserContext';
import { useTelegram } from '@/contexts/TelegramContext';
import { DiamondIcon, ZapIcon, CheckIcon } from '@/components/Icons';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useTelegram();
  const { userData, loading } = useUser();

  if (loading) {
    return (
      <div className="page-container">
        <div className="loader"></div>
      </div>
    );
  }

  const subscription = userData?.subscription;

  return (
    <div className="page-container profile-page">
      <div className="profile-hero card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-text">{user?.first_name?.[0]?.toUpperCase() || '?'}</span>
            <div className="avatar-glow" />
          </div>
          <div className="profile-info">
            <h1>{user?.first_name} {user?.last_name}</h1>
            {user?.username && <p className="username">@{user.username}</p>}
            <p className="user-id">#{userData?.telegramId?.toString().slice(-6)}</p>
          </div>
        </div>
      </div>

      <div className="subscription-card card">
        <div className="card-header">
          <DiamondIcon className="card-icon" />
          <h3>Подписка</h3>
        </div>
        {subscription ? (
          <div className="subscription-details">
            <div className="subscription-badge-large">
              <DiamondIcon className="badge-icon-large" />
              <div className="badge-info">
                <div className="badge-plan">{subscription.plan}</div>
                <div className="badge-status">
                  <CheckIcon className="check-icon" />
                  <span>Активна</span>
                </div>
              </div>
            </div>

            <div className="subscription-stats">
              {subscription.requestsLimit > 0 ? (
                <div className="stat-block">
                  <div className="stat-label">Запросы</div>
                  <div className="stat-progress">
                    <div 
                      className="stat-progress-bar"
                      style={{
                        width: `${(subscription.requestsUsed / subscription.requestsLimit) * 100}%`
                      }}
                    />
                  </div>
                  <div className="stat-value">
                    {subscription.requestsUsed} / {subscription.requestsLimit}
                  </div>
                </div>
              ) : (
                <div className="stat-block">
                  <div className="stat-label">Запросы</div>
                  <div className="stat-value-unlimited">
                    <ZapIcon className="unlimited-icon" />
                    <span>Безлимит</span>
                  </div>
                </div>
              )}
              
              {subscription.endDate && (
                <div className="stat-block">
                  <div className="stat-label">Действует до</div>
                  <div className="stat-value">
                    {new Date(subscription.endDate).toLocaleDateString('ru-RU')}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="no-subscription-block">
            <p>Нет активной подписки</p>
            <button className="btn btn-primary">Выбрать план</button>
          </div>
        )}
      </div>

      <div className="stats-grid-profile">
        <div className="stat-card-mini card">
          <ZapIcon className="stat-card-icon" />
          <div className="stat-card-value">{userData?.stats?.totalRequests || 0}</div>
          <div className="stat-card-label">Запросов</div>
        </div>
        <div className="stat-card-mini card">
          <DiamondIcon className="stat-card-icon" />
          <div className="stat-card-value">{userData?.stats?.totalSpent || 0} ₽</div>
          <div className="stat-card-label">Потрачено</div>
        </div>
      </div>

      <div className="referral-card card">
        <h3>Реферальная программа</h3>
        <p className="referral-description">
          Приглашайте друзей и получайте бонусы
        </p>
        <button className="btn btn-secondary btn-copy">
          Скопировать ссылку
        </button>
      </div>
    </div>
  );
}
