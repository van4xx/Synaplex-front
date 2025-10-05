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
      <div className="hero-minimal stagger-item">
        <h1 className="hero-title">NeiroBOT</h1>
        <p className="hero-desc">Доступ к лучшим AI моделям в одном месте</p>
      </div>

      {hasActiveSubscription && (
        <div className="quick-access stagger-item">
          <div className="access-card card">
            <div className="access-label">Использовано</div>
            <div className="access-value">{subscription.requestsUsed}</div>
          </div>
          <div className="access-divider" />
          <div className="access-card card">
            <div className="access-label">Осталось</div>
            <div className="access-value">
              {subscription.requestsLimit > 0 ? subscription.requestsLimit - subscription.requestsUsed : '∞'}
            </div>
          </div>
        </div>
      )}

      <div className="models-grid">
        <div className="model-category card stagger-item">
          <h3>Текст</h3>
          <div className="model-tags">
            <span className="model-tag">GPT-4</span>
            <span className="model-tag">Claude 3</span>
            <span className="model-tag">Gemini</span>
            <span className="model-tag">Llama</span>
          </div>
        </div>

        <div className="model-category card stagger-item">
          <h3>Изображения</h3>
          <div className="model-tags">
            <span className="model-tag">FLUX.1</span>
            <span className="model-tag">SDXL</span>
            <span className="model-tag">SD3</span>
          </div>
        </div>

        <div className="model-category card stagger-item">
          <h3>Видео</h3>
          <div className="model-tags">
            <span className="model-tag">Runway</span>
            <span className="model-tag">Pika</span>
            <span className="model-tag">Kling</span>
          </div>
        </div>

        <div className="model-category card stagger-item">
          <h3>Аудио</h3>
          <div className="model-tags">
            <span className="model-tag">ElevenLabs</span>
            <span className="model-tag">Suno</span>
            <span className="model-tag">PlayHT</span>
          </div>
        </div>
      </div>

      <div className="cta-card card stagger-item">
        <p className="cta-text">Начните работу с ботом</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.Telegram?.WebApp?.close()}
        >
          Открыть чат
        </button>
      </div>
    </div>
  );
}