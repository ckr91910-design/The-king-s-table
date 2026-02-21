import React, { useState, useEffect } from 'react';

// 1. [설명서 데이터] PDF의 4단계 묵상 철학
const PHILOSOPHY = {
  title: "왕의 식탁 묵상 가이드",
  stages: [
    { name: "01 Miqra (미크라)", color: "#ddd", desc: "왕의 부르심: 왕의 음성을 경청하는 시간입니다. (요 21:12)" },
    { name: "02 Lishma (리쉬마)", color: "#8B00FF", desc: "사심의 정결: 나를 비우고 물두멍에 씻는 시간입니다." },
    { name: "03 Tota (토타)", color: "#FF00FF", desc: "인격적 체화: 말씀을 씹어 먹어 영혼의 양식으로 삼는 시간입니다." },
    { name: "04 Christo (크리스토)", color: "#FF0000", desc: "예수의 파송: 왕의 인격으로 오늘 하루를 통치하는 시간입니다." }
  ]
};

// 2. [날짜별 고유 말씀 데이터] - 예시 데이터 (여기에 목사님의 365일 원고를 채우시면 됩니다)
const DAILY_DATA = {
  "1-1": { title: "갈릴리 조반의 초대", verse: "요한복음 21:12", text: "예수께서 이르시되 와서 조반을 먹으라 하시니 제자들이 주님이신 줄 아는 고로 당신이 누구냐 감히 묻는 자가 없더라" },
  "1-2": { title: "문 밖에 서서 두드림", verse: "요한계시록 3:20", text: "볼지어다 내가 문 밖에 서서 두드리노니 누구든지 내 음성을 듣고 문을 열면 내가 그에게로 들어가 그와 더불어 먹고..." },
  "3-1": { title: "지성소로의 초대", verse: "히브리서 10:19", text: "그러므로 형제들아 우리가 예수의 피를 힘입어 성소에 들어갈 담력을 얻었나니" },
  "5-16": { title: "함께 지어져 가는 성전", verse: "에베소서 2:22", text: "너희도 성령 안에서 하나님이 거하실 처소가 되기 위하여 그리스도 예수 안에서 함께 지어져 가느니라" }
};

export default function App() {
  const [view, setView] = useState('menu'); // menu, manual, calendar, detail
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);

  // 날짜별 데이터 가져오기 (데이터가 없으면 기본값 표시)
  const getContent = (m, d) => {
    const key = `${m}-${d}`;
    if (DAILY_DATA[key]) return DAILY_DATA[key];
    return { title: `${m}월 ${d}일의 만나`, verse: "출애굽기 24:11", text: "그들은 하나님을 뵙고 먹고 마셨더라 (오늘의 말씀 준비중)" };
  };

  // 1. 메인 메뉴 화면
  if (view === 'menu') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f7f4', padding: '40px 20px', textAlign: 'center', fontFamily: 'serif' }}>
        <h1 style={{ color: '#4b2c20', fontSize: '28px', marginBottom: '5px' }}>미리토크 365</h1>
        <p style={{ color: '#78350f', fontSize: '18px', fontWeight: 'bold' }}>[ 왕의 식탁 ]</p>
        
        {/* 설명서 버튼 추가 */}
        <button onClick={() => setView('manual')} style={{ width: '100%', padding: '15px', backgroundColor: '#fff', border: '2px solid #8B00FF', borderRadius: '12px', color: '#8B00FF', fontWeight: 'bold', margin: '20px 0', cursor: 'pointer' }}>
          📖 묵상 방법(설명서) 보기
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
            <button key={m} onClick={() => { setSelectedMonth(m); setView('calendar'); }}
              style={{ padding: '20px 0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px' }}>{m}월</button>
          ))}
        </div>
      </div>
    );
  }

  // 2. 설명서(매뉴얼) 화면
  if (view === 'manual') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f2ee', padding: '20px', fontFamily: 'serif' }}>
        <button onClick={() => setView('menu')} style={{ border: 'none', background: 'none', fontWeight: 'bold', fontSize: '16px' }}>◀ 돌아가기</button>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', marginTop: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ textAlign: 'center', color: '#4b2c20' }}>{PHILOSOPHY.title}</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>당신의 인생이 움직이는 지성소가 됩니다.</p>
          {PHILOSOPHY.stages.map((s, idx) => (
            <div key={idx} style={{ marginBottom: '20px', borderLeft: `5px solid ${s.color}`, paddingLeft: '15px' }}>
              <h4 style={{ margin: '0', color: s.color }}>{s.name}</h4>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#444' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. 달력 화면
  if (view === 'calendar') {
    const daysInMonth = new Date(2026, selectedMonth, 0).getDate();
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f7f4', padding: '20px', fontFamily: 'serif' }}>
        <button onClick={() => setView('menu')} style={{ border: 'none', background: 'none', fontWeight: 'bold' }}>🏠 홈으로</button>
        <h2 style={{ textAlign: 'center', color: '#4b2c20', margin: '20px 0' }}>{selectedMonth}월 왕의 식탁</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
            <button key={d} onClick={() => { setSelectedDay(d); setView('detail'); }}
              style={{ padding: '15px 0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '10px', fontWeight: 'bold' }}>{d}</button>
          ))}
        </div>
      </div>
    );
  }

  // 4. 상세 묵상 카드 (날짜별 고유 데이터 반영)
  const content = getContent(selectedMonth, selectedDay);
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f2ee', padding: '15px', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <button onClick={() => setView('calendar')} style={{ background: 'none', border: 'none', color: '#78350f', fontWeight: 'bold' }}>◀ 목록</button>
          <span style={{ color: '#4b2c20', fontWeight: 'bold' }}>{selectedMonth}월 {selectedDay}일</span>
          <button onClick={() => setView('menu')} style={{ background: 'none', border: 'none', color: '#78350f', fontWeight: 'bold' }}>🏠 홈</button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '30px' }}>{content.title}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <section style={{ borderLeft: '4px solid #ddd', paddingLeft: '15px' }}>
              <span style={{ fontSize: '11px', color: '#999', fontWeight: 'bold' }}>01 MIQRA</span>
              <p style={{ fontSize: '16px', margin: '5px 0', lineHeight: '1.6' }}>"{content.text}"</p>
              <p style={{ fontSize: '13px', color: '#92400e', textAlign: 'right' }}>— {content.verse}</p>
            </section>

            <section style={{ borderLeft: '4px solid #8B00FF', paddingLeft: '15px' }}>
              <span style={{ fontSize: '11px', color: '#8B00FF', fontWeight: 'bold' }}>02 LISHMA & 03 TOTA</span>
              <p style={{ fontSize: '14px', color: '#444' }}>내 안의 헬라식 사고를 씻어내고 오늘의 만나를 먹습니다.</p>
            </section>

            <section style={{ borderLeft: '4px solid #FF0000', paddingLeft: '15px' }}>
              <span style={{ fontSize: '11px', color: '#FF0000', fontWeight: 'bold' }}>04 CHRISTO</span>
              <p style={{ fontSize: '14px', color: '#444' }}>왕의 인격으로 승리하며 파송됩니다.</p>
            </section>
          </div>

          <button onClick={() => setView('menu')} style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: '#4b2c20', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>만찬 완료</button>
          <p style={{ textAlign: 'center', fontSize: '10px', color: '#ccc', marginTop: '20px' }}>© 2026 THE KING'S BANQUET</p>
        </div>
      </div>
    </div>
  );
}
