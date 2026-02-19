import React, { useState, useEffect } from 'react';

// 1월 & 2월 핵심 데이터 (나머지는 자동 생성)
const meditationData = [
  { id: 1, month: 1, day: 1, title: "갈릴리 조반", verse: "와서 조반을 먹으라 (요 21:12)", lishma: "실패한 밤의 그물을 씻으십시오. 결과 중심의 사고를 물두멍에 던지고 나를 비웁니다.", tota: "주님이 구워주신 생선의 따뜻함이 창자에 채워집니다. 나는 사랑받는 자입니다.", christo: "사명을 받은 베드로처럼 오늘 나는 주님의 사랑으로 세상을 향해 나갑니다." },
  { id: 32, month: 2, day: 1, title: "사랑의 부르심", verse: "나의 사랑, 내 어여쁜 자야 함께 가자 (아 2:10)", lishma: "영적 게으름과 분주함을 물두멍에 씻어냅니다. 주님을 맞이하기 위해 나를 비웁니다.", tota: "나를 향한 주님의 뜨거운 열망을 창자에 채우십시오. 나는 사랑받는 존재입니다.", christo: "오늘 당신을 초청하시는 주님의 손을 잡고 세상 속으로 나아가십시오." }
];

// 365일 데이터 구조 자동 생성 (데이터가 없는 날짜용)
for (let m = 1; m <= 12; m++) {
  for (let d = 1; d <= 31; d++) {
    const id = (m - 1) * 31 + d;
    if (!meditationData.find(item => item.id === id)) {
      meditationData.push({
        id: id, month: m, day: d, title: `${m}월 ${d}일 거룩한 만찬`, verse: "왕의 식탁으로의 초대",
        lishma: "내 안의 사심을 씻어내고 나를 비웁니다.", tota: "주님의 성품을 창자에 채웁니다.", christo: "예수로 사는 삶을 위해 나갑니다."
      });
    }
  }
}

export default function App() {
  const [view, setView] = useState('menu'); // 'menu', 'calendar', 'detail'
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedData, setSelectedData] = useState(null);
  const [memo, setMemo] = useState("");

  // 1. 메인 메뉴 화면 (The Entrance)
  if (view === 'menu') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '40px 20px', fontFamily: 'serif', textAlign: 'center' }}>
        <div style={{ marginBottom: '50px' }}>
          <h1 style={{ color: '#78350f', fontSize: '36px', margin: '0 0 10px 0', letterSpacing: '2px' }}>KING'S TABLE</h1>
          <div style={{ width: '50px', h: '2px', backgroundColor: '#78350f', margin: '10px auto' }}></div>
          <p style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold' }}>휘장을 지나 왕의 식탁으로</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
            <button key={m} onClick={() => { setSelectedMonth(m); setView('calendar'); }}
              style={{ padding: '25px 10px', backgroundColor: 'white', border: '1px solid #d6d3d1', borderRadius: '8px', color: '#78350f', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              {m}월
            </button>
          ))}
        </div>
        <p style={{ marginTop: '40px', fontSize: '12px', color: '#a8a29e' }}>섬김이: 이대희 목사</p>
      </div>
    );
  }

  // 2. 월별 날짜 선택 화면 (The Banquet)
  if (view === 'calendar') {
    const monthDays = meditationData.filter(d => d.month === selectedMonth).sort((a,b) => a.day - b.day);
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '30px 20px', fontFamily: 'serif' }}>
        <button onClick={() => setView('menu')} style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#78350f', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>◀ 메뉴로 돌아가기</button>
        <h2 style={{ textAlign: 'center', color: '#78350f', fontSize: '24px', marginBottom: '30px' }}>{selectedMonth}월의 만찬</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', maxWidth: '500px', margin: '0 auto' }}>
          {monthDays.map(d => (
            <button key={d.id} onClick={() => { setSelectedData(d); setView('detail'); }}
              style={{ padding: '15px 5px', backgroundColor: 'white', border: '1px solid #e7e5e4', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
              {d.day}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 3. 묵상 상세 화면 (The Table)
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '15px', fontFamily: 'serif' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {/* 상단 헤더 로고 */}
        <div style={{ backgroundColor: '#78350f', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setView('calendar')} style={{ color: 'white', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>◀ 목록</button>
          <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>KING'S TABLE</span>
          <div style={{ width: '30px' }}></div>
        </div>

        <div style={{ padding: '30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ color: '#92400e', fontSize: '14px', fontWeight: 'bold' }}>{selectedData.month}월 {selectedData.day}일 거룩한 만찬</span>
            <h2 style={{ fontSize: '24px', color: '#444', margin: '10px 0' }}>{selectedData.title}</h2>
            <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#78716c', lineHeight: '1.6' }}>"{selectedData.verse}"</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <section>
              <h3 style={{ color: '#92400e', fontSize: '17px', borderLeft: '3px solid #92400e', paddingLeft: '10px', marginBottom: '8px' }}>Lishma: 정결</h3>
              <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7', margin: 0 }}>{selectedData.lishma}</p>
            </section>
            <section>
              <h3 style={{ color: '#92400e', fontSize: '17px', borderLeft: '3px solid #92400e', paddingLeft: '10px', marginBottom: '8px' }}>Tota: 체화</h3>
              <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7', margin: 0 }}>{selectedData.tota}</p>
            </section>
            <section>
              <h3 style={{ color: '#92400e', fontSize: '17px', borderLeft: '3px solid #92400e', paddingLeft: '10px', marginBottom: '8px' }}>Christo: 파송</h3>
              <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7', margin: 0 }}>{selectedData.christo}</p>
            </section>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid #f5f5f4', paddingTop: '25px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#78350f' }}>📝 나의 실천 메모</h4>
            <textarea 
              style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '10px', border: '1px solid #e7e5e4', backgroundColor: '#fafaf9', outline: 'none', boxSizing: 'border-box', fontSize: '15px' }} 
              placeholder="주님 앞에 오늘의 다짐을 기록하십시오..." 
            />
          </div>

          <button onClick={() => { alert('오늘의 만찬을 마쳤습니다.'); setView('calendar'); }}
            style={{ width: '100%', marginTop: '20px', padding: '18px', backgroundColor: '#78350f', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '17px', cursor: 'pointer' }}>
            만찬 완료
          </button>
        </div>
      </div>
    </div>
  );
}
