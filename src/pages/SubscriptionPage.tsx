import { Link } from 'react-router-dom';
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
      <h1>Подписки</h1>

      <div className="plans-compact">
        {plans.map((plan, index) => (
          <div 
            key={plan.id}
            className={`plan-row card ${plan.popular ? 'plan-popular' : ''} stagger-item`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="plan-main">
              <div className="plan-title-row">
                <h3 className="plan-title">{plan.nameRu}</h3>
                {plan.popular && <span className="badge badge-success">Популярный</span>}
              </div>
              <div className="plan-details-row">
                <span className="plan-requests-mini">
                  {plan.requests > 0 ? `${plan.requests} запросов` : '∞ Безлимит'}
                </span>
                <div className="plan-price-mini">
                  <span className="price-number">{plan.price}</span>
                  <span className="price-rub">₽/мес</span>
                </div>
              </div>
            </div>
            
            <button
              className={`btn-compact ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleSubscribe(plan.id)}
            >
              Выбрать
            </button>
          </div>
        ))}
      </div>

      <div className="subscription-info card stagger-item">
        <h3>Информация о подписках</h3>
        <ul className="info-list">
          <li>Подписка продлевается автоматически каждый месяц</li>
          <li>Вы можете отменить подписку в любое время</li>
          <li>Неиспользованные запросы не переносятся на следующий месяц</li>
          <li>Все цены указаны в рублях</li>
        </ul>
      </div>

      <div className="legal-links">
        <Link to="/privacy" className="legal-link">
          Политика конфиденциальности
        </Link>
        <span className="legal-divider">•</span>
        <Link to="/terms" className="legal-link">
          Условия использования
        </Link>
      </div>
    </div>
  );
}
