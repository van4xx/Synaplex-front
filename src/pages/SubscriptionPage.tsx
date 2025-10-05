import { CheckIcon, DiamondIcon } from '@/components/Icons';
import './SubscriptionPage.css';

const plans = [
  {
    id: 'BASIC',
    name: 'Basic',
    nameRu: 'Базовый',
    level: 1,
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
    level: 2,
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
    level: 3,
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
    level: 4,
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
    level: 5,
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
      <div className="subscription-header">
        <DiamondIcon className="header-icon" />
        <h1>Подписки</h1>
        <p className="page-subtitle">
          Выберите план, который подходит именно вам
        </p>
      </div>

      <div className="plans-list">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`plan-card-compact card ${plan.popular ? 'popular' : ''}`}
          >
            {plan.popular && (
              <div className="popular-badge">Популярный</div>
            )}
            
            <div className="plan-header-compact">
              <div className="plan-level">
                {[...Array(plan.level)].map((_, i) => (
                  <DiamondIcon key={i} className="level-icon" />
                ))}
              </div>
              <div className="plan-info-compact">
                <h3 className="plan-name-compact">{plan.nameRu}</h3>
                <div className="plan-requests-compact">
                  {plan.requests > 0 ? `${plan.requests} запросов` : 'Безлимит'}
                </div>
              </div>
              <div className="plan-price-compact">
                <span className="price-amount-compact">{plan.price}</span>
                <span className="price-currency-compact">₽</span>
              </div>
            </div>

            <ul className="plan-features-compact">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <CheckIcon className="feature-check-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} subscribe-btn-compact`}
              onClick={() => handleSubscribe(plan.id)}
            >
              Выбрать
            </button>
          </div>
        ))}
      </div>

      <div className="subscription-info card">
        <h3>Информация о подписках</h3>
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
