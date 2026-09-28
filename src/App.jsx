import React, { useState, useEffect } from 'react';

export default function App() {
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  // 타이머 카운트다운 로직
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        setMode('break');
        setTimeLeft(BREAK_TIME);
      } else {
        setMode('focus');
        setTimeLeft(FOCUS_TIME);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  // 분:초 포맷팅
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 모드 변경
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  // 스타일 정의 (박스 폭 및 폰트 크기 수정)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#3b9ed8', // 뽀로로 블루 배경
    fontFamily: 'sans-serif',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2.5rem 2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '440px', // 네모 박스 너비를 넓혀 글자가 넘어가지 않도록 수정
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    margin: '0.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* 상단 타이틀 */}
        <h1 style={{ color: '#1e293b', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span>🐧</span>
          <span>뽀로로 타이머</span>
          <span>🐧</span>
        </h1>
        
        {/* 모드 전환 탭 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <button
            onClick={() => handleModeChange('focus')}
            style={{
              ...buttonStyle,
              flex: 1,
              backgroundColor: mode === 'focus' ? '#2563eb' : '#f1f5f9',
              color: mode === 'focus' ? 'white' : '#475569',
              border: mode === 'focus' ? 'none' : '1px solid #cbd5e1'
            }}
          >
            노는 시간 (25분)
          </button>
          <button
            onClick={() => handleModeChange('break')}
            style={{
              ...buttonStyle,
              flex: 1,
              backgroundColor: mode === 'break' ? '#16a34a' : '#f1f5f9',
              color: mode === 'break' ? 'white' : '#475569',
              border: mode === 'break' ? 'none' : '1px solid #cbd5e1'
            }}
          >
            쉬는 시간 (5분)
          </button>
        </div>

        {/* 타이머 시간 표시 */}
        <div style={{ fontSize: '4.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-2px', marginBottom: '2rem' }}>
          {formatTime(timeLeft)}
        </div>

        {/* 제어 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              ...buttonStyle,
              backgroundColor: isRunning ? '#d97706' : '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              fontSize: '1.1rem'
            }}
          >
            {isRunning ? '일시정지' : '시작'}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
            }}
            style={{
              ...buttonStyle,
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: '1px solid #cbd5e1',
              padding: '0.75rem 1.5rem',
              fontSize: '1.1rem'
            }}
          >
            리셋
          </button>
        </div>

        {/* 하단 세션 카운터 (여유 공간 확보) */}
        <div style={{ color: '#334155', fontSize: '1.1rem', fontWeight: 'bold', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
          완료한 뽀로로 탐험: <span style={{ color: '#2563eb' }}>{completedSessions}회</span>
        </div>
      </div>
    </div>
  );
}