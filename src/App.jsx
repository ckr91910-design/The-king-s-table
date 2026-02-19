import React, { useState, useEffect } from 'react';

// 월별 주제 및 데이터 생성 로직 (기존 유지)
const MONTHLY_THEMES = {
  1: "새로운 시작과 갈릴리의 부름", 2: "광야에서 만나는 하나님의 음성", 3: "성막의 뜰에서 지성소까지",
  4: "십자가와 부활의 영성", 5: "가정 속에 흐르는 생명의 강", 6: "본질을 꿰뚫는 영적 패러다임",
  7: "성육신 묵상의 깊은 품", 8: "A.D.의 삶으로 나가는 파송", 9: "진설병의 말씀과 영적 배부름",
  10: "성령의 조명과 인생의 결단", 11: "감사와 축제의 왕의 식탁", 12: "다시 오실 왕을 기다리는 삶"
};

const allMeditationData = []; // (이전 코드의 데이터 생성 로직 동일)
for (let m = 1; m <= 12; m++) {
  const daysInMonth = new Date(2026, m, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    allMeditationData.push({
      id: `${m}-${d}`, month: m, day: d,
      title: `${m}월 ${d}일 왕의 식탁`,
      verse: "출애굽기 24:11",
      verseText: "그들은 하나님을 뵙고 먹고 마셨더라",
      lishma: "내면의 헬라식 사고를 물두멍에 씻어내고 나를 비웁니다.",
      tota: "하늘 양식이 내 영혼의 창자에 채워짐을 경험합니다.",
      christo: "오늘 나는 주님의 통치를 대행하는 파송된 왕입니다."
    });
  }
}

export default function App() {
  const [view, setView] = useState('menu');
  const [selectedData, setSelectedData] = useState(null);
  const [memo, setMemo] = useState('');
  const appUrl = "https://kings-table-app.vercel.app"; // 목사님의 앱 주소

  // 공유하기 함수
  const handleShare = () => {
    const shareText = `[왕의 식탁 묵상 카드]\n\n"${selectedData.verseText}"\n(${selectedData.verse})\n\n오늘의 한 줄: ${selectedData.tota}\n\n지금 왕의 식탁에 참여해 보세요!\n${appUrl}\n\n© 2026 THE KING'S BANQUET. All rights reserved.`;
    
    if (navigator.share) {
      navigator.share({ title: '왕의 식탁 묵상 공유', text: shareText, url: appUrl });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("묵상 내용이 복사되었습니다. 카톡 등에 붙여넣기 하세요!");
    }
  };

  if (view === 'menu') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f2ee', padding: '40px 20px', textAlign: 'center', fontFamily: 'serif' }}>
        <h1 style={{ color: '#4b2c20', fontSize: '24px', letterSpacing: '2px', marginBottom: '5px' }}>미리토크 365</h1>
        <p style={{ color: '#78350f', fontSize: '18px', marginBottom: '30px' }}>[ 왕의 식탁 ]</p>
        
        {/* 월별 버튼 생략... (기존 메뉴 로직) */}
        
        <footer style={{ marginTop: '50px', fontSize: '12px', color: '#a8a29e' }}>
          <p>© 2026 THE KING'S BANQUET. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // 상세 묵상 카드 화면
  if (view === 'detail') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f2ee', padding: '15px', fontFamily: 'serif' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '20px', color: '#1a1a1a', textAlign: 'center', marginBottom: '20px' }}>{selectedData.title}</h2>
            
            {/* 묵상 단계 내용 (기존 카드 디자인 동일) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderLeft: '3px solid #ddd', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11px', color: '#999', fontWeight: 'bold' }}>MIQRA</span>
                <p style={{ fontSize: '15px', margin: '4px 0' }}>{selectedData.verseText}</p>
              </div>
              <div style={{ borderLeft: '3px solid #8B00FF', paddingLeft: '12px' }}>
                <span style={{ fontSize: '11px', color: '#8B00FF', fontWeight: 'bold' }}>TOTA</span>
                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{selectedData.tota}</p>
              </div>
            </div>

            {/* 공유하기 버튼 추가 */}
            <button onClick={handleShare} style={{ width: '100%', marginTop: '30px', padding: '12px', backgroundColor: '#fff', color: '#78350f', border: '1px solid #78350f', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              📤 친구에게 묵상 카드 공유하기
            </button>

            <button onClick={() => setView('menu')} style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: '#4b2c20', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
              만찬 완료
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#ccc' }}>
              {appUrl}<br/>
              © 2026 THE KING'S BANQUET
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // 나머지 뷰 로직 생략
}
