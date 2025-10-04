import './SettingsPage.css';

export default function SettingsPage() {
  return (
    <div className="page-container settings-page">
      <h1>⚙️ Настройки</h1>

      <div className="settings-section card">
        <h3>🔔 Уведомления</h3>
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

      <div className="settings-section card">
        <h3>🎨 Интерфейс</h3>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-name">Тема</div>
            <div className="setting-desc">Темная (фиксированная)</div>
          </div>
          <span className="setting-badge">Темная</span>
        </div>
      </div>

      <div className="settings-section card">
        <h3>📱 О приложении</h3>
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

      <div className="settings-section card">
        <h3>🔗 Ссылки</h3>
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

      <div className="danger-zone card">
        <h3>⚠️ Опасная зона</h3>
        <button className="btn btn-outline btn-full">
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
