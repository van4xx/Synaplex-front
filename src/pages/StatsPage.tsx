import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';
import './StatsPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const typeNames: Record<string, string> = {
  TEXT_GENERATION: 'Текст',
  IMAGE_GENERATION: 'Изображения',
  VIDEO_GENERATION: 'Видео',
  AUDIO_GENERATION: 'Аудио',
  MUSIC_GENERATION: 'Музыка'
};

export default function StatsPage() {
  const { userData } = useUser();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userData]);

  const fetchStats = async () => {
    if (!userData?.telegramId) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/user/${userData.telegramId}/stats`
      );
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="page-container stats-page">
      <h1>📊 Статистика</h1>

      <div className="total-stats card">
        <h3>Общая статистика</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">{stats?.total || 0}</div>
            <div className="stat-label">Всего запросов</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{userData?.stats?.totalSpent || 0} ₽</div>
            <div className="stat-label">Потрачено</div>
          </div>
        </div>
      </div>

      {stats?.byType && stats.byType.length > 0 && (
        <div className="type-stats card">
          <h3>По типам</h3>
          <div className="stats-list">
            {stats.byType.map((item: any) => {
              const total = stats.total || 1;
              const percentage = ((item._count / total) * 100).toFixed(1);
              
              return (
                <div key={item.serviceType} className="stat-item">
                  <div className="stat-item-header">
                    <span className="stat-item-name">
                      {typeNames[item.serviceType] || item.serviceType}
                    </span>
                    <span className="stat-item-count">{item._count}</span>
                  </div>
                  <div className="stat-progress">
                    <div 
                      className="stat-progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="stat-percentage">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stats?.byModel && stats.byModel.length > 0 && (
        <div className="model-stats card">
          <h3>По моделям</h3>
          <div className="models-list">
            {stats.byModel.map((item: any) => (
              <div key={item.modelName} className="model-item">
                <span className="model-name">{item.modelName}</span>
                <span className="model-count">{item._count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!stats?.byType || stats.byType.length === 0) && (
        <div className="empty-state card">
          <p className="empty-icon">📊</p>
          <p>Пока нет статистики</p>
          <p className="text-muted">Начните использовать бота</p>
        </div>
      )}
    </div>
  );
}
