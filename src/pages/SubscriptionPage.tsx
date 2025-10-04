import './SubscriptionPage.css';

const plans = [
  {
    id: 'BASIC',
    name: 'Basic',
    nameRu: 'Базовый',
    icon: '🥉',
    price: 490,
    requests: 100,
    features: [
      'Базовые текстовые модели',
      'GPT-3.5, Claude Instant',
      'Стандартная очередь'
    ]
  },
  {
    id: 'PRO',
    name: 'Pro',
    nameRu: 'Про',
    icon: '🥈',
    price: 1490,
    requests: 500,
    features: [
      'GPT-4, Claude 3',
      'Генерация изображений',
      'ElevenLabs TTS',
      'Приоритетная очередь'
    ],
    popular: true
  },
  {
    id: 'PRO_PLUS',
    name: 'Pro+',
    nameRu: 'Про+',
    icon: '🥇',
    price: 2990,
    requests: 1500,
    features: [
      'Все текстовые модели',
      'Генерация видео',
      'Генерация музыки',
      'Высокий приоритет'
    ]
  },
  {
    id: 'ULTRA',
    name: 'Ultra',
    nameRu: 'Ультра',
    icon: '💎',
    price: 4990,
    requests: 5000,
    features: [
      'Все возможности',
      'Максимальный приоритет',
      'Расширенная поддержка'
    ]
  },
  {
    id: 'ELITE',
    name: 'Elite',
    nameRu: 'Элита',
    icon: '👑',
    price: 9990,
    requests: 0,
    features: [
      'Безлимитные запросы',
      'VIP поддержка',
      'Мгновенная обработка',
      'Все премиум модели'
    ]
  }
];

export default function SubscriptionPage() {
  const handleSubscribe = (planId: string) => {
    // Здесь будет логика оплаты через T-Bank
    alert(`Подписка ${planId} выбрана. Интеграция с оплатой будет добавлена.`);
  };

  return (
    <div className="page-container subscription-page">
      <h1>💎 Подписки</h1>
      <p className="page-subtitle">
        Выберите план, который подходит именно вам
      </p>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`plan-card card ${plan.popular ? 'popular' : ''}`}
          >
            {plan.popular && (
              <div className="popular-badge">Популярный</div>
            )}
            
            <div className="plan-icon">{plan.icon}</div>
            <h3 className="plan-name">{plan.nameRu}</h3>
            
            <div className="plan-price">
              <span className="price-amount">{plan.price}</span>
              <span className="price-currency">₽/мес</span>
            </div>

            <div className="plan-requests">
              {plan.requests > 0 ? (
                <>{plan.requests} запросов</>
              ) : (
                <>♾️ Безлимит</>
              )}
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} subscribe-btn`}
              onClick={() => handleSubscribe(plan.id)}
            >
              Выбрать план
            </button>
          </div>
        ))}
      </div>

      <div className="subscription-info card">
        <h3>ℹ️ Информация о подписках</h3>
        <ul className="info-list">
          <li>Подписка продлевается автоматически каждый месяц</li>
          <li>Вы можете отменить подписку в любое время</li>
          <li>Неиспользованные запросы не переносятся на следующий месяц</li>
          <li>Все цены указаны в рублях</li>
        </ul>
      </div>
    </div>
  );
}
