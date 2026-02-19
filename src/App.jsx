import React, { useState, useEffect } from 'react';

// 1월(성막/만찬) & 2월(사랑/연합) 통합 데이터
const meditationData = [
  // --- 1월 데이터 (생략 없이 1~5일 샘플 후 루프 처리) ---
  { id: 1, month: 1, day: 1, title: "갈릴리 조반", verse: "와서 조반을 먹으라 (요 21:12)", lishma: "실패한 밤의 그물을 씻으십시오. 결과 중심의 사고를 물두멍에 던지고 나를 비웁니다.", tota: "주님이 구워주신 생선의 따뜻함이 창자에 채워집니다. 나는 사랑받는 자입니다.", christo: "사명을 받은 베드로처럼 오늘 나는 주님의 사랑으로 세상을 향해 나갑니다." },
  { id: 2, month: 1, day: 2, title: "비둘기 눈", verse: "내 사랑아... 네 눈이 비둘기 같구나 (아 1:15)", lishma: "복잡한 계산과 염려로 혼탁해진 눈을 씻어내십시오. 오직 주님만 바라보도록 비웁니다.", tota: "주님이 보시는 나의 아름다움을 창자에 채우십시오. 나는 주님의 보석입니다.", christo: "오늘 만나는 사람들에게 주님의 따뜻한 시선을 전달하는 통로가 되십시오." },
  // ... (중략) 
];

// 데이터 자동 생성 로직 (1월 31일치 + 2월 28일치)
const generateData = () => {
  const fullData = [...meditationData];
  
  // 1월 나머지 채우기 (기존 로직 유지)
  for (let d = 3; d <= 31; d++) {
    if(!fullData.find(item => item.month === 1 && item.day === d)) {
      fullData.push({
        id: d, month: 1, day: d, title: `${d}일차 성막 만찬`, verse: "왕의 식탁으로의 초대",
        lishma: "내 안의 사심과 고집을 물두멍에서 깨끗이 씻어내고 나를 비웁니다.",
        tota: "주님의 인격과 성품을 내 영혼의 창자에 가득 채웁니다.",
        christo: "오늘도 예수로 사는 삶을 위해 세상으로 나갑니다."
      });
    }
  }

  // 2월 데이터 추가 (주제: 사랑과 연결)
  const febThemes = [
    { t: "사랑의 확신", v: "내가 너를 영원한 사랑으로 사랑하기에 (렘 31:3)" },
    { t: "연합의 기쁨", v: "형제가 연합하여 동거함이 어찌 그리 선하고 (시 133:1)" },
    { t: "친구를 위한 목숨", v: "사람이 친구를 위하여 자기 목숨을 버리면 (요 15:13)" },
    { t: "사랑의 수고", v: "너희의 믿음의 역사와 사랑의 수고와 (살전 1:3)" },
    { t: "용서의 넓이", v: "일곱 번뿐 아니라 일곱 번을 일흔 번까지라도 (마 18:22)" }
  ];

  for (let d = 1; d <= 28; d++) {
    const theme = febThemes[(d-1) % febThemes.length];
    fullData.push({
      id: 31 + d, month: 2, day: d,
      title: `2월 ${d}일: ${theme.t}`,
      verse: theme.v,
      lishma: "관계 속의 미움과 시기를 씻어내십시오. 내 안의 좁은 마음을 비웁니다.",
      tota: "주님의 무조건적인 사랑을 창자에 채우십시오. 사랑만이 사람을 변화시킵니다.",
      christo: "오늘 만나는 지체에게 주님의 사랑을 구체적으로 표현하고 서빙하십시오."
    });
  }
  return fullData;
};

const allMeditations = generateData();

export default function App() {
  const [index, setIndex] = useState(0);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const savedMemo = localStorage.getItem(`memo-${allMeditations[index].id}`);
    setMemo(savedMemo || "");
  }, [index]);

  const data = allMeditations[index];

  const handleNext = () => {
    localStorage.setItem(`memo-${data.id}`, memo);
    if (index < allMeditations.length - 1) {
      setIndex(index + 1);
      setMemo("");
      window.scrollTo(0, 0);
    } else {
      alert("2월의 모든 만찬까지 마쳤습니다! 대장정이 계속됩니다.");
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '15px', fontFamily: 'serif', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#78350f', color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', margin: 0 }}>King's Table</h1>
          <p style={{ fontSize: '12px', opacity: 0.8, margin: '5px 0 0 0' }}>휘장을 지나 왕의 식탁으로</p>
        </div>

        <div style={{ padding: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
             <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: '#78350f', cursor: 'pointer' }}>◀ 이전</button>
             <span style={{ fontSize: '14px', color: '#92400e', fontWeight: 'bold' }}>{data.month}월 {data.day}일</span>
             <button onClick={handleNext} style={{ background: 'none', border: 'none', color: '#78350f', cursor: 'pointer' }}>다음 ▶</button>
          </div>

          <div style={{ textAlign: 'center', borderBottom: '2px solid #f5f5f4', marginBottom: '20px', paddingBottom: '15px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>{data.title}</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#6b7280', lineHeight: 1.4 }}>"{data.verse}"</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ padding: '12px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Lishma: 정결</h3>
              <p style={{ fontSize: '15px', color: '#374151', margin: 0 }}>{data.lishma}</p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Tota: 체화</h3>
              <p style={{ fontSize: '15px', color: '#374151', margin: 0 }}>{data.tota}</p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Christo: 파송</h3>
              <p style={{ fontSize: '15px', color: '#374151', margin: 0 }}>{data.christo}</p>
            </div>
          </div>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>📝 오늘의 실천 메모</h3>
            <textarea
              style={{ width: '100%', height: '80px', padding: '10px', border: '1px solid #d1d5db', borderRadius: '10px', boxSizing: 'border-box' }}
              placeholder="주님께 드릴 고백을 적으세요..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <button onClick={handleNext} style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#78350f', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
            오늘의 만찬 완료
          </button>
        </div>
      </div>
    </div>
  );
}
