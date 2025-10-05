import { useUser } from '@/contexts/UserContext';
import { BrainIcon, ImageIcon, VideoIcon, MusicIcon, ZapIcon, RocketIcon } from '@/components/Icons';
import './HomePage.css';

export default function HomePage() {
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
        <div className="hero-icon">
          <RocketIcon className="rocket-icon" />
        </div>
        <h1>Мощь нейросетей в одном месте</h1>
        <p className="hero-subtitle">
          Создавайте с помощью лучших AI моделей
        </p>
      </div>

      {hasActiveSubscription && (
        <div className="quick-stats card">
          <div className="stat-item-inline">
            <ZapIcon className="stat-icon-inline" />
            <div className="stat-info-inline">
              <div className="stat-value-inline">{subscription.requestsUsed}</div>
              <div className="stat-label-inline">Использовано</div>
            </div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item-inline">
            <ZapIcon className="stat-icon-inline" />
            <div className="stat-info-inline">
              <div className="stat-value-inline">
                {subscription.requestsLimit > 0 ? subscription.requestsLimit - subscription.requestsUsed : '∞'}
              </div>
              <div className="stat-label-inline">Осталось</div>
            </div>
          </div>
        </div>
      )}

      <div className="capabilities-section">
        <h2>Что вы можете создать</h2>
        
        <div className="capabilities-grid">
          <div className="capability-card card">
            <div className="capability-icon-wrapper">
              <BrainIcon className="capability-icon" />
            </div>
            <h3>Текст</h3>
            <p>GPT-4, Claude 3, Gemini и другие</p>
            <ul className="model-list">
              <li>Статьи и посты</li>
              <li>Код и скрипты</li>
              <li>Переводы</li>
            </ul>
          </div>

          <div className="capability-card card">
            <div className="capability-icon-wrapper">
              <ImageIcon className="capability-icon" />
            </div>
            <h3>Изображения</h3>
            <p>SDXL, Flux.1, SD3</p>
            <ul className="model-list">
              <li>Арты</li>
              <li>Логотипы</li>
              <li>Концепт-арт</li>
            </ul>
          </div>

          <div className="capability-card card">
            <div className="capability-icon-wrapper">
              <VideoIcon className="capability-icon" />
            </div>
            <h3>Видео</h3>
            <p>Runway, Pika, Kling</p>
            <ul className="model-list">
              <li>Ролики</li>
              <li>Анимации</li>
              <li>Визуализации</li>
            </ul>
          </div>

          <div className="capability-card card">
            <div className="capability-icon-wrapper">
              <MusicIcon className="capability-icon" />
            </div>
            <h3>Аудио</h3>
            <p>ElevenLabs, Suno</p>
            <ul className="model-list">
              <li>Озвучка</li>
              <li>Музыка</li>
              <li>Эффекты</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cta-section card">
        <div className="cta-icon-wrapper">
          <RocketIcon className="cta-icon" />
        </div>
        <h3>Готовы начать?</h3>
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
