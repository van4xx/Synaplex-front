import { useUser } from '@/contexts/UserContext';
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
      <div className="hero-main">
        <div className="hero-badge">AI Агрегатор</div>
        <h1 className="hero-title-big">NeiroBOT</h1>
        <p className="hero-description">
          Доступ ко всем популярным нейросетям в одном месте. 
          Генерация текста, изображений, видео и музыки.
        </p>
      </div>

      {hasActiveSubscription ? (
        <div className="usage-card card">
          <div className="usage-header">
            <span className="usage-label">Ваша подписка</span>
            <span className="usage-plan">{subscription.plan}</span>
          </div>
          <div className="usage-stats">
            <div className="usage-item">
              <div className="usage-number">{subscription.requestsUsed}</div>
              <div className="usage-text">использовано</div>
            </div>
            <div className="usage-divider" />
            <div className="usage-item">
              <div className="usage-number">
                {subscription.requestsLimit > 0 ? subscription.requestsLimit - subscription.requestsUsed : '∞'}
              </div>
              <div className="usage-text">осталось</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-subscription-banner card">
          <p className="banner-text">Выберите подписку для начала работы</p>
          <a href="/subscription" className="btn btn-primary">
            Посмотреть тарифы
          </a>
        </div>
      )}

      <div className="features-simple">
        <h3 className="section-title">Что умеет бот</h3>
        
        <div className="feature-item">
          <div className="feature-emoji">✨</div>
          <div className="feature-content">
            <div className="feature-title">Текст</div>
            <div className="feature-desc">GPT-4, Claude, Gemini, Llama</div>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-emoji">🎨</div>
          <div className="feature-content">
            <div className="feature-title">Изображения</div>
            <div className="feature-desc">FLUX.1, SDXL, Stable Diffusion</div>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-emoji">🎬</div>
          <div className="feature-content">
            <div className="feature-title">Видео</div>
            <div className="feature-desc">Runway, Pika, Kling, Veo</div>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-emoji">🎵</div>
          <div className="feature-content">
            <div className="feature-title">Музыка и голос</div>
            <div className="feature-desc">Suno, ElevenLabs, PlayHT</div>
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary btn-large"
        onClick={() => window.Telegram?.WebApp?.close()}
      >
        Открыть чат с ботом
      </button>
    </div>
  );
}