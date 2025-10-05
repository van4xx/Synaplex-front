import { useTheme } from '@/contexts/ThemeContext';
import './SettingsPage.css';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page-container settings-page">
      <h1>Настройки</h1>

      <div className="settings-section card stagger-item">
        <h3>Внешний вид</h3>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">Тема</div>
            <div className="setting-desc">
              {theme === 'dark' ? 'Темная тема' : 'Светлая тема'}
            </div>
          </div>
          <label className="toggle">
            <input 
              type="checkbox" 
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section card stagger-item">
        <h3>Уведомления</h3>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">Завершение запросов</div>
            <div className="setting-desc">Уведомления о готовности результатов</div>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">Подписка</div>
            <div className="setting-desc">Напоминания об окончании подписки</div>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section card stagger-item">
        <h3>О приложении</h3>
        <div className="info-rows">
          <div className="info-row">
            <span className="info-label">Версия</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-row">
            <span className="info-label">Разработчик</span>
            <span className="info-value">NeiroBOT Team</span>
          </div>
        </div>
      </div>

      <div className="settings-section card stagger-item">
        <h3>Ссылки</h3>
        <button className="btn btn-secondary btn-full">
          📖 Документация
        </button>
        <button className="btn btn-secondary btn-full mt-2">
          💬 Поддержка
        </button>
        <button className="btn btn-secondary btn-full mt-2">
          📢 Новости и обновления
        </button>
      </div>

      <div className="danger-zone card stagger-item">
        <h3>Опасная зона</h3>
        <button className="btn btn-outline btn-full">
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
