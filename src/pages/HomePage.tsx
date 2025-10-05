import { useUser } from '@/contexts/UserContext';
import { BrainIcon, ImageIcon, VideoIcon, MusicIcon } from '@/components/Icons';
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

      <div className="features-grid-chess">
        <div className="feature-chess-item card">
          <BrainIcon className="feature-icon" />
          <h3 className="feature-chess-title">Текст</h3>
          <p className="feature-chess-desc">GPT-4, Claude, Gemini, Llama</p>
        </div>

        <div className="feature-chess-item card">
          <ImageIcon className="feature-icon" />
          <h3 className="feature-chess-title">Изображения</h3>
          <p className="feature-chess-desc">FLUX.1, SDXL, Stable Diffusion</p>
        </div>

        <div className="feature-chess-item card">
          <VideoIcon className="feature-icon" />
          <h3 className="feature-chess-title">Видео</h3>
          <p className="feature-chess-desc">Runway, Pika, Kling, Veo</p>
        </div>

        <div className="feature-chess-item card">
          <MusicIcon className="feature-icon" />
          <h3 className="feature-chess-title">Музыка</h3>
          <p className="feature-chess-desc">Suno, ElevenLabs, PlayHT</p>
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