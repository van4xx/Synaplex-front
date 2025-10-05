import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TelegramProvider } from './contexts/TelegramContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import ParticleBackground from './components/ParticleBackground';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SubscriptionPage from './pages/SubscriptionPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Инициализация Telegram Mini App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      // Устанавливаем тему
      tg.setHeaderColor('#000000');
      tg.setBackgroundColor('#000000');
      
      setIsReady(true);
    } else {
      // Для разработки без Telegram
      setIsReady(true);
    }

    // Проверяем, показывали ли онбординг
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, []);

  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <ThemeProvider>
      <TelegramProvider>
        <UserProvider>
          <ParticleBackground />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </UserProvider>
      </TelegramProvider>
    </ThemeProvider>
  );
}

export default App;
