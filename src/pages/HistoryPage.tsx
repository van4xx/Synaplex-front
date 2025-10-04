import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';
import './HistoryPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const typeIcons: Record<string, string> = {
  TEXT_GENERATION: '✍️',
  IMAGE_GENERATION: '🎨',
  VIDEO_GENERATION: '🎬',
  AUDIO_GENERATION: '🎵',
  MUSIC_GENERATION: '🎼'
};

const statusEmoji: Record<string, string> = {
  PENDING: '⏳',
  PROCESSING: '⚙️',
  COMPLETED: '✅',
  FAILED: '❌',
  CANCELLED: '🚫'
};

export default function HistoryPage() {
  const { userData } = useUser();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [userData]);

  const fetchHistory = async () => {
    if (!userData?.telegramId) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/user/${userData.telegramId}/requests?limit=50`
      );
      
      if (response.data.success) {
        setRequests(response.data.data.requests);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
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
    <div className="page-container history-page">
      <h1>📜 История запросов</h1>

      {requests.length === 0 ? (
        <div className="empty-state card">
          <p className="empty-icon">📭</p>
          <p>Пока нет запросов</p>
          <p className="text-muted">Начните использовать бота</p>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className="request-card card">
              <div className="request-header">
                <span className="request-type">
                  {typeIcons[request.serviceType]} {request.modelName}
                </span>
                <span className={`badge badge-${request.status === 'COMPLETED' ? 'success' : request.status === 'FAILED' ? 'danger' : 'warning'}`}>
                  {statusEmoji[request.status]} {request.status}
                </span>
              </div>
              
              <div className="request-prompt">
                <p className="prompt-label">Промпт:</p>
                <p className="prompt-text">{request.prompt}</p>
              </div>

              {request.response && (
                <div className="request-response">
                  <p className="response-label">Результат:</p>
                  <p className="response-text">{request.response}</p>
                </div>
              )}

              <div className="request-footer">
                <span className="request-date">
                  {new Date(request.createdAt).toLocaleString('ru-RU')}
                </span>
                {request.processingTime && (
                  <span className="request-time">
                    ⏱️ {(request.processingTime / 1000).toFixed(1)}с
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
