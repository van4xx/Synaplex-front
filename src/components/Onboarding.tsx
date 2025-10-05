import { useState, useEffect } from 'react';
import { SparklesIcon, BrainIcon, RocketIcon, ZapIcon } from './Icons';
import './Onboarding.css';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  const steps = [
    {
      icon: <BrainIcon className="onboarding-icon" />,
      title: 'Добро пожаловать в NeiroBOT',
      description: 'Мощный агрегатор нейросетей в одном месте. Генерируйте тексты, изображения, видео и музыку с помощью лучших AI моделей.',
      features: [
        'GPT-4, Claude 3, Gemini',
        'SDXL, Flux.1, Stable Diffusion',
        'Runway, Pika, ElevenLabs'
      ]
    },
    {
      icon: <ZapIcon className="onboarding-icon" />,
      title: 'Как это работает?',
      description: 'Просто отправьте промпт боту или используйте Mini App для управления. Ваши запросы обрабатываются в очереди с приоритетом в зависимости от подписки.',
      features: [
        'Отправьте текст боту для генерации',
        'Используйте команды: /image, /video, /audio',
        'Управляйте профилем в Mini App'
      ]
    },
    {
      icon: <RocketIcon className="onboarding-icon" />,
      title: 'Выберите подписку',
      description: 'От базового до безлимитного плана. Начните с бесплатного тестирования или выберите план, который подходит именно вам.',
      features: [
        '5 уровней подписок от 490₽',
        'Приоритетная обработка запросов',
        'Доступ к эксклюзивным моделям'
      ]
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => setStep(step + 1), 100);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  return (
    <div className="onboarding-overlay">
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }} />
        ))}
      </div>

      <div className={`onboarding-content ${isAnimating ? 'fade-in' : ''}`}>
        <div className="onboarding-icon-wrapper">
          {currentStep.icon}
          <div className="icon-glow" />
        </div>

        <h1 className="onboarding-title">{currentStep.title}</h1>
        <p className="onboarding-description">{currentStep.description}</p>

        <div className="onboarding-features">
          {currentStep.features.map((feature, index) => (
            <div key={index} className="feature-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <SparklesIcon className="feature-icon" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="onboarding-footer">
          <div className="progress-dots">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === step ? 'active' : ''} ${index < step ? 'completed' : ''}`}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => setStep(index), 100);
                }}
              />
            ))}
          </div>
        </div>

        <button className="next-button-wide" onClick={handleNext}>
          {step < steps.length - 1 ? 'Далее' : 'Начать'}
          <div className="button-glow" />
        </button>
      </div>
    </div>
  );
}
