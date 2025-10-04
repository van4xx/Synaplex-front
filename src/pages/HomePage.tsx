import { useUser } from '@/contexts/UserContext';
import { useTelegram } from '@/contexts/TelegramContext';
import './HomePage.css';

export default function HomePage() {
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
  const hasActiveSubscription = subscription?.status === 'ACTIVE';

  return (
    <div className="page-container home-page">
      <div className="hero-section">
        <h1>NeiroBOT</h1>
        <p className="hero-subtitle">AI агрегатор нейросетей</p>
      </div>

      <div className="welcome-card card">
        <h2>👋 Привет, {user?.first_name || 'Пользователь'}!</h2>
        <p>
          Добро пожаловать в личный кабинет NeiroBOT — мощного агрегатора 
          искусственного интеллекта.
        </p>
      </div>

      {hasActiveSubscription ? (
        <div className="subscription-status card">
          <div className="flex justify-between items-center">
            <div>
              <h3>💎 Подписка активна</h3>
              <p className="plan-name">{subscription.plan}</p>
            </div>
            <div className="subscription-badge badge badge-success">
              Активна
            </div>
          </div>
          <div className="usage-info mt-2">
            {subscription.requestsLimit > 0 ? (
              <>
                <p>Использовано запросов:</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${(subscription.requestsUsed / subscription.requestsLimit) * 100}%`
                    }}
                  />
                </div>
                <p className="text-muted">
                  {subscription.requestsUsed} / {subscription.requestsLimit}
                </p>
              </>
            ) : (
              <p className="text-center">♾️ Безлимитные запросы</p>
            )}
          </div>
        </div>
      ) : (
        <div className="no-subscription card">
          <h3>❌ Нет активной подписки</h3>
          <p>Оформите подписку, чтобы начать использовать нейросети</p>
          <button className="btn btn-primary mt-2">
            Выбрать подписку
          </button>
        </div>
      )}

      <div className="features-grid">
        <div className="feature-card card">
          <div className="feature-icon">✍️</div>
          <h3>Текст</h3>
          <p>GPT-4, Claude, Gemini, Mistral, Llama</p>
        </div>
        
        <div className="feature-card card">
          <div className="feature-icon">🎨</div>
          <h3>Изображения</h3>
          <p>SDXL, Flux.1, Stable Diffusion 3</p>
        </div>
        
        <div className="feature-card card">
          <div className="feature-icon">🎬</div>
          <h3>Видео</h3>
          <p>Runway, Pika, Kling, Veo 3</p>
        </div>
        
        <div className="feature-card card">
          <div className="feature-icon">🎵</div>
          <h3>Аудио</h3>
          <p>ElevenLabs, Suno, PlayHT</p>
        </div>
      </div>

      <div className="stats-overview card">
        <h3>📊 Ваша статистика</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{userData?.stats?.totalRequests || 0}</div>
            <div className="stat-label">Запросов</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userData?.stats?.totalSpent || 0} ₽</div>
            <div className="stat-label">Потрачено</div>
          </div>
        </div>
      </div>

      <div className="cta-section card">
        <h3>🚀 Начните прямо сейчас</h3>
        <p>Отправьте сообщение боту с вашим промптом</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.Telegram?.WebApp?.close()}
        >
          Открыть бота
        </button>
      </div>
    </div>
  );
}
