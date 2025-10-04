import { useUser } from '@/contexts/UserContext';
import { useTelegram } from '@/contexts/TelegramContext';
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
      <h1>👤 Профиль</h1>

      <div className="profile-card card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.first_name?.[0] || '?'}
          </div>
          <div className="profile-info">
            <h2>{user?.first_name} {user?.last_name}</h2>
            {user?.username && <p className="username">@{user.username}</p>}
            <p className="user-id">ID: {userData?.telegramId}</p>
          </div>
        </div>
      </div>

      <div className="subscription-card card">
        <h3>💎 Подписка</h3>
        {subscription ? (
          <div className="subscription-details">
            <div className="detail-row">
              <span className="detail-label">План:</span>
              <span className="detail-value">{subscription.plan}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Статус:</span>
              <span className={`badge ${subscription.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                {subscription.status === 'ACTIVE' ? 'Активна' : 'Неактивна'}
              </span>
            </div>
            {subscription.requestsLimit > 0 && (
              <div className="detail-row">
                <span className="detail-label">Запросов:</span>
                <span className="detail-value">
                  {subscription.requestsUsed} / {subscription.requestsLimit}
                </span>
              </div>
            )}
            {subscription.endDate && (
              <div className="detail-row">
                <span className="detail-label">Действует до:</span>
                <span className="detail-value">
                  {new Date(subscription.endDate).toLocaleDateString('ru-RU')}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted">Нет активной подписки</p>
        )}
      </div>

      <div className="stats-card card">
        <h3>📊 Статистика</h3>
        <div className="stats-list">
          <div className="stat-row">
            <span className="stat-icon">📝</span>
            <span className="stat-name">Всего запросов</span>
            <span className="stat-count">{userData?.stats?.totalRequests || 0}</span>
          </div>
          <div className="stat-row">
            <span className="stat-icon">💰</span>
            <span className="stat-name">Потрачено</span>
            <span className="stat-count">{userData?.stats?.totalSpent || 0} ₽</span>
          </div>
        </div>
      </div>

      <div className="referral-card card">
        <h3>🔗 Реферальная программа</h3>
        <p className="text-muted mb-2">
          Приглашайте друзей и получайте бонусы
        </p>
        <div className="referral-link">
          <input 
            type="text" 
            className="input" 
            value={`https://t.me/bot?start=ref_${userData?.id}`}
            readOnly
          />
          <button className="btn btn-primary mt-2">
            Скопировать ссылку
          </button>
        </div>
      </div>
    </div>
  );
}
