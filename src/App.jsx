import React, { useState, useEffect } from 'react';

const meditationData = [
  { id: 1, title: "갈릴리 조반", verse: "와서 조반을 먹으라 (요 21:12)", lishma: "실패한 밤의 그물을 씻으십시오. 결과 중심의 헬라식 사고를 물두멍에 던지고 나를 비웁니다.", tota: "주님이 구워주신 생선의 따뜻함이 창자에 채워집니다. 나는 사랑받는 자입니다.", christo: "사명을 받은 베드로처럼 오늘 나는 주님의 사랑으로 세상을 향해 나갑니다." },
  { id: 2, title: "비둘기 눈", verse: "내 사랑아 너는 어여쁘고 어여쁘다 네 눈이 비둘기 같구나 (아 1:15)", lishma: "복잡한 계산과 염려로 혼탁해진 눈을 씻어내십시오. 오직 주님만 바라보도록 내 욕심을 비웁니다.", tota: "주님이 보시는 나의 아름다움을 창자에 채우십시오. 나는 주님의 보석입니다.", christo: "오늘 만나는 사람들에게 주님의 따뜻한 시선을 전달하는 통로가 되십시오." },
  { id: 3, title: "사랑의 깃발", verse: "내 사랑하는 자는 내게 속하였고 나는 그에게 속하였도다 (아 2:16)", lishma: "내가 인생의 주인이라는 고집을 번제단에 태우십시오. 소유권 이전을 방해하는 사심을 씻어냅니다.", tota: "나는 주님의 것이라는 정체성을 영혼의 뼈대에 채우십시오. 주님의 평안이 임합니다.", christo: "왕의 소유 된 자로서 당당하게 사십시오. 세상 그 무엇도 당신을 해할 수 없습니다." }
];

for (let i = 4; i <= 31; i++) {
  meditationData.push({
    id: i, title: `${i}일차 성막 만찬`, verse: "왕의 식탁으로의 초대",
    lishma: "내 안의 사심과 고집을 물두멍에서 깨끗이 씻어내고 나를 비웁니다.",
    tota: "주님의 인격과 성품을 내 영혼의 창자에 가득 채웁니다.",
    christo: "오늘도 예수로 사는 삶을 위해 세상으로 나갑니다."
  });
}

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const savedMemo = localStorage.getItem(`memo-${currentDay}`);
    setMemo(savedMemo || "");
  }, [currentDay]);

  const data = meditationData.find(d => d.id === currentDay) || meditationData[0];

  const handleNextDay = () => {
    localStorage.setItem(`memo-${currentDay}`, memo);
    if (currentDay < 31) {
      setCurrentDay(prev => prev + 1);
      setMemo("");
      window.scrollTo(0, 0);
    } else {
      alert("1월의 모든 만찬을 마쳤습니다!");
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '15px', fontFamily: 'serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#78350f', color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', margin: 0 }}>King's Table</h1>
          <p style={{ fontSize: '12px', opacity: 0.8, margin: '5px 0 0 0' }}>휘장을 지나 왕의 식탁으로</p>
        </div>
        <div style={{ padding: '25px' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #f5f5f4', marginBottom: '20px', paddingBottom: '15px' }}>
            <h2 style={{ fontSize: '18px', color: '#78350f', margin: 0 }}>1월 {currentDay}일 거룩한 만찬</h2>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>{data.title}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#6b7280' }}>"{data.verse}"</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '10px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Lishma: 정결</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.5, margin: 0 }}>{data.lishma}</p>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Tota: 체화</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.5, margin: 0 }}>{data.tota}</p>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Christo: 파송</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.5, margin: 0 }}>{data.christo}</p>
            </div>
          </div>
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>📝 나의 실천 메모</h3>
            <textarea
              style={{ width: '100%', height: '100px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              placeholder="오늘의 다짐을 기록하세요..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
          <button onClick={handleNextDay} style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#78350f', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
            만찬 완료 및 {currentDay < 31 ? currentDay + 1 : 31}일차 이동
          </button>
        </div>
      </div>
    </div>
  );
}
