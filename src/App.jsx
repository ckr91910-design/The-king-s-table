import React, { useState, useEffect } from 'react';
import { 
  Crown, BookOpen, User, Home, ArrowLeft, Droplets, Flame, Sparkles, ChevronDown 
} from 'lucide-react';

/**
 * 왕의 식탁 365 미리토크 (The King's Banquet)
 * [데이터 입력 안내] 
 * 아래 SAMPLE_MEDITATIONS 객체 안에 "월-일" 형식의 키값으로 365일 데이터를 추가하세요.
 */

// --- 12개월 테마 설정 ---
const MONTHS_DATA = [
  { id: 1, title: "1월: 새로운 시작", theme: "결단의 절제", desc: "갈릴리 조반에서 시작되는 초대", icon: "🌅" },
  { id: 2, title: "2월: 사랑과 연결", theme: "사랑의 절제", desc: "신랑 되신 주님의 인격적 사귐", icon: "💖" },
  { id: 3, title: "3월: 생명의 깨어남", theme: "경청의 절제", desc: "영적 감각을 깨우는 말씀 씹기", icon: "🌱" },
  { id: 4, title: "4월: 성장과 고난", theme: "십자가의 절제", desc: "자기 부인과 부활의 실재", icon: "✝️" },
  { id: 5, title: "5월: 감사와 축복", theme: "욕심의 절제", desc: "우리가 곧 주님의 거룩한 성전", icon: "🎁" },
  { id: 6, title: "6월: 성령의 임재", theme: "순종의 절제", desc: "성령의 바람을 타는 동행의 삶", icon: "🔥" },
  { id: 7, title: "7월: 열정과 비전", theme: "집중의 절제", desc: "푯대를 향해 질주하는 사명자", icon: "⚡" },
  { id: 8, title: "8월: 자유와 해방", theme: "멍에의 절제", desc: "진리가 주는 완전한 자유의 노래", icon: "🕊️" },
  { id: 9, title: "9월: 은혜의 예비", theme: "인내의 절제", desc: "결실을 위해 마음의 밭을 기경함", icon: "🏹" },
  { id: 10, title: "10월: 결실과 감사", theme: "공로의 절제", desc: "하나님을 뵙고 먹고 마시는 잔치", icon: "🍇" },
  { id: 11, title: "11월: 화해와 평화", theme: "관용의 절제", desc: "치유와 용납으로 하나 되는 사귐", icon: "🤝" },
  { id: 12, title: "12월: 강림과 탄생", theme: "기다림의 절제", desc: "만물을 새롭게 하시는 왕의 오심", icon: "🌟" },
];

// --- 365일 상세 묵상 데이터 (여기에 데이터를 계속 추가하세요) ---
const SAMPLE_MEDITATIONS = {
  "1-1": {
    title: "갈릴리 조반",
    verse: "와서 조반을 먹으라 (요 21:12)",
    lishma: "실패한 밤의 그물을 씻으십시오. 결과 중심의 헬라식 사고를 물두멍에 던지고 오직 나를 위해 숯불을 피우신 주님의 이름을 위하여 나를 비웁니다.",
    tota: "주님이 구워주신 생선의 따뜻함이 내 영혼의 창자에 채워집니다. 나는 사랑받는 자입니다.",
    christo: "배부른 베드로가 사명을 받았듯, 오늘 나는 주님의 사랑으로 배불러 세상을 향해 나갑니다."
  },
  "5-16": {
    title: "내가 곧 주님의 성전",
    verse: "함께 지어져 가느니라 (엡 2:22)",
    lishma: "인생을 내 취향대로 지으려던 욕심의 도면을 씻어내십시오. 하나님이 거하시기에 편안한 깨끗한 처소가 되기 위해 나를 비웁니다.",
    tota: "나는 움직이는 지성소라는 정체성을 뼈와 근육에 새기십시오. 나는 주님을 모시고 다닙니다.",
    christo: "오늘 당신이 걷는 모든 길이 성전의 지경입니다. 만나는 사람들에게 주님의 임재를 서빙하십시오."
  }
  // 추가 데이터 예시: "1-2": { title: "...", verse: "...", ... },
};

// 성막 배경 래퍼 컴포넌트
const TabernacleBackground = ({ children, className = "" }) => (
  <div className={`relative min-h-screen overflow-hidden ${className}`}>
    <div className="absolute inset-0 z-0 bg-[#0A0514]">
      {/* 오로라 효과 (청색, 자색, 홍색) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#0A192F] blur-[120px] opacity-40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#1A0B2E] blur-[120px] opacity-40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#2B0505] blur-[150px] opacity-30 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
      {/* 베실 텍스처 (반투명 레이어) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/linen-design.png')` }}></div>
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToDetail = (month, day) => {
    setSelectedMonth(month);
    setSelectedDay(day);
    setActiveTab('detail');
    window.scrollTo(0, 0);
  };

  // 1. 홈 화면 (Royal Entrance)
  const renderHome = () => (
    <TabernacleBackground className="animate-in fade-in duration-1000">
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="space-y-12 max-w-6xl relative z-10">
          <div className="flex justify-center">
            <Crown size={110} className="text-[#D4AF37] drop-shadow-[0_0_40px_rgba(212,175,55,0.7)] animate-bounce" />
          </div>
          
          <div className="space-y-6">
            <p className="font-serif italic text-[#F3E5AB]/70 text-2xl md:text-3xl tracking-wide">
              "그들은 하나님을 뵙고 먹고 마셨더라"
            </p>
            <h1 className="text-6xl md:text-[8rem] font-black text-white font-serif leading-none tracking-tighter drop-shadow-2xl">
              왕의 식탁<br />
              <span className="text-[#D4AF37]">365 미리토크</span>
            </h1>
            <p className="text-white/40 font-serif text-xl md:text-2xl leading-relaxed italic px-10 py-4">
              "볼지어다 내가 문 밖에 서서 두드리노니 <br className="hidden md:block"/> 누구든지 내 음성을 듣고 문을 열면..."
            </p>
          </div>

          <div className="pt-12 flex flex-col md:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => setActiveTab('menu')}
              className="bg-[#D4AF37] text-[#1A0B2E] px-16 py-6 rounded-full font-black text-lg tracking-[0.3em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] uppercase"
            >
              만찬에 참여하기
            </button>
            <button className="text-white/60 px-10 py-6 border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">
              성막형 묵상 철학
            </button>
          </div>
        </div>
      </section>

      {/* 4가지 색상 의미 섹션 */}
      <section className="bg-[#0A0514]/80 py-32 px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { color: "#0A192F", label: "청색 (Blue)", mean: "하늘의 권위", desc: "미크라: 왕의 부르심" },
            { color: "#1A0B2E", label: "자색 (Purple)", mean: "그리스도의 왕권", desc: "리쉬마: 사심의 정결" },
            { color: "#2B0505", label: "홍색 (Scarlet)", mean: "대속의 보혈", desc: "토타: 인격적 체화" },
            { color: "#FDFBF7", label: "베실 (White)", mean: "거룩한 순결", desc: "크리스토: 예수의 파송" }
          ].map((item, idx) => (
            <div key={idx} className="p-10 rounded-3xl border border-white/5 bg-white/[0.02] text-center hover:border-[#D4AF37]/50 transition-all">
              <div className="w-6 h-6 rounded-full mx-auto mb-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }}></div>
              <h4 className="text-[#D4AF37] font-bold text-sm tracking-widest mb-2 uppercase">{item.label}</h4>
              <p className="text-white text-xl font-serif font-bold mb-2">{item.mean}</p>
              <p className="text-white/40 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </TabernacleBackground>
  );

  // 2. 메뉴 화면 (365 Banquet)
  const renderMenu = () => (
    <TabernacleBackground className="animate-in fade-in duration-700 pt-32 pb-48 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <Crown size={48} className="text-[#D4AF37] mx-auto" />
          <h2 className="text-5xl md:text-7xl font-serif font-black text-white">365 성막 만찬</h2>
          <p className="text-[#F3E5AB]/50 text-xl font-light italic">"휘장을 지나 왕이 예비하신 식탁으로 나오십시오."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MONTHS_DATA.map(m => (
            <div key={m.id} className="bg-white/[0.03] rounded-[3rem] p-10 border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <span className="text-5xl">{m.icon}</span>
                <span className="bg-[#D4AF37] text-[#0A0514] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">{m.theme}</span>
              </div>
              <h3 className="text-3xl font-serif font-black text-white mb-4">{m.title}</h3>
              <p className="text-white/40 text-sm mb-8 font-light">{m.desc}</p>
              
              <div className="grid grid-cols-6 gap-2">
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const meditationKey = `${m.id}-${day}`;
                  const isAvailable = SAMPLE_MEDITATIONS[meditationKey];
                  return (
                    <button 
                      key={day}
                      onClick={() => isAvailable ? navigateToDetail(m.id, day) : null}
                      className={`h-10 rounded-xl text-xs font-bold transition-all border
                        ${isAvailable 
                          ? 'bg-[#D4AF37] text-[#0A0514] border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)] cursor-pointer hover:scale-110' 
                          : 'bg-transparent text-white/10 border-white/5 cursor-default'}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TabernacleBackground>
  );

  // 3. 상세 묵상 화면 (Holy Banquet)
  const renderDetail = () => {
    const data = SAMPLE_MEDITATIONS[`${selectedMonth}-${selectedDay}`] || SAMPLE_MEDITATIONS["1-1"];
    return (
      <TabernacleBackground className="pt-32 pb-48 px-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-2 text-white/30 hover:text-[#D4AF37] mb-16 font-bold uppercase text-xs tracking-[0.3em]"
          >
            <ArrowLeft size={16} /> 메뉴로 돌아가기
          </button>

          <article className="space-y-32">
            <div className="text-center space-y-8">
              <div className="inline-block px-8 py-2 bg-white/5 text-[#D4AF37] text-xs font-black rounded-full tracking-[0.3em] uppercase border border-[#D4AF37]/20">
                {selectedMonth}월 {selectedDay}일 거룩한 만찬
              </div>
              <h2 className="text-6xl md:text-8xl font-serif font-black text-white leading-none tracking-tighter">{data.title}</h2>
            </div>

            {/* Stage 1: Miqra (Blue) */}
            <section className="text-center space-y-8 animate-in slide-in-from-bottom duration-500">
              <div className="text-[#0A192F] font-black tracking-[0.5em] text-xs uppercase bg-[#D4AF37] inline-block px-4 py-1">Stage 01: Miqra</div>
              <blockquote className="text-3xl md:text-5xl font-serif font-bold text-[#F3E5AB] leading-relaxed italic px-8 py-8 border-y border-white/10">
                "{data.verse}"
              </blockquote>
            </section>

            {/* Stage 2: Lishma (Purple) */}
            <section className="bg-[#1A0B2E]/60 rounded-[3rem] p-12 border border-white/10 relative overflow-hidden animate-in slide-in-from-bottom duration-700">
               <div className="absolute top-0 right-0 p-10 opacity-10 text-[#D4AF37]"><Droplets size={200} /></div>
              <div className="relative z-10">
                <h4 className="text-xl font-black text-white mb-6 uppercase tracking-widest text-[#D4AF37]">Lishma: 정결의 물두멍</h4>
                <p className="text-2xl text-white/80 leading-relaxed font-light">
                  <span className="font-bold text-white mr-2">리쉬마:</span> {data.lishma}
                </p>
              </div>
            </section>

            {/* Stage 3: Tota (Scarlet) */}
            <section className="bg-gradient-to-br from-[#2B0505]/80 to-[#0A0514] rounded-[3rem] p-12 border border-white/10 animate-in slide-in-from-bottom duration-900">
              <h4 className="text-xl font-black text-[#D4AF37] mb-6 uppercase tracking-widest">Stage 03: Tota</h4>
              <p className="text-3xl md:text-4xl font-serif font-medium leading-relaxed text-white">
                {data.tota}
              </p>
            </section>

            {/* Stage 4: Christo (White) */}
            <section className="text-center space-y-12 animate-in slide-in-from-bottom duration-1000">
               <div className="flex justify-center"><Flame size={60} className="text-[#FDFBF7]" /></div>
               <div className="space-y-6">
                 <h4 className="text-xl font-black text-white/50 uppercase tracking-[0.5em]">Christo: 파송의 제단</h4>
                 <p className="text-3xl md:text-5xl font-black text-white leading-relaxed italic">"{data.christo}"</p>
               </div>
               
               <button 
                  onClick={() => alert("왕의 인격으로 오늘 하루를 통치하십시오!")}
                  className="w-full py-10 bg-[#D4AF37] text-[#1A0B2E] font-black rounded-[3rem] shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:bg-[#FDFBF7] transition-all tracking-[0.5em] text-xl uppercase flex items-center justify-center gap-4"
                >
                  <Crown size={28} /> 만찬 완료: 파송
                </button>
            </section>
          </article>
        </div>
      </TabernacleBackground>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0514] font-sans text-white overflow-x-hidden">
      {/* 상단 네비게이션 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all px-8 py-6 flex justify-between items-center ${isScrolled ? 'bg-[#0A0514]/90 backdrop-blur-md border-b border-white/10' : ''}`}>
        <div onClick={() => setActiveTab('home')} className="flex items-center gap-4 cursor-pointer">
          <Crown size={32} className="text-[#D4AF37]" />
          <span className="font-serif font-bold text-2xl tracking-tighter text-white uppercase">King's Table</span>
        </div>
        <div className="hidden md:flex gap-12 text-xs font-bold uppercase tracking-widest text-white/40">
          <button onClick={() => setActiveTab('home')} className={`hover:text-[#D4AF37] transition-colors ${activeTab === 'home' ? 'text-[#D4AF37]' : ''}`}>
            HOME
          </button>
          <button onClick={() => setActiveTab('menu')} className={`hover:text-[#D4AF37] transition-colors ${activeTab === 'menu' ? 'text-[#D4AF37]' : ''}`}>
            BANQUET MENU
          </button>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#1A0B2E]">
          <User size={20} />
        </div>
      </nav>

      <main>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'detail' && renderDetail()}
      </main>

      {/* 푸터 */}
      <footer className="bg-black py-24 px-8 border-t border-white/5 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Crown size={40} className="text-[#D4AF37] mx-auto md:mx-0" />
            <h5 className="font-serif text-2xl font-bold">왕의 식탁</h5>
            <p className="text-white/30 text-sm">"그들은 하나님을 뵙고 먹고 마셨더라"</p>
          </div>
          <div className="space-y-6 text-white/30 text-sm">
            <p>섬김이 이대희 목사 | ckr9191@hanmail.net</p>
            <p>© 2026 THE KING'S BANQUET. DESIGNED FOR THE ROYAL PRIESTHOOD.</p>
          </div>
        </div>
      </footer>

      {/* 모바일 하단 네비게이션 */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-[#1A0B2E]/90 backdrop-blur-xl rounded-full shadow-2xl flex justify-around items-center px-8 z-50 border border-white/10">
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-[#D4AF37]' : 'text-white/20'}><Home size={24} /></button>
        <button onClick={() => setActiveTab('menu')} className={activeTab === 'menu' ? 'text-[#D4AF37]' : 'text-white/20'}><BookOpen size={24} /></button>
        <button className="text-white/20"><User size={24} /></button>
      </div>
    </div>
  );
}
