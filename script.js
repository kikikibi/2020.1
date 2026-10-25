'use strict';

/* =========================================================
 *  SCENARIO
 *  대사 · 이름 · 날짜 · 점수는 전부 이 객체에서만 수정하세요.
 *  [점수]는 화면에 절대 노출되지 않고 엔딩 후에만 공개됩니다.
 * ========================================================= */

// 데이터 작성용 짧은 도우미 (여러 줄을 한 번에 적을 수 있어요)
const say = (from, ...texts) => texts.map((text) => ({ type: 'msg', from, text }));
const kang = (...t) => say('kang', ...t);
const me = (...texts) => texts.map((text) => ({ type: 'me', text }));
const think = (...texts) => texts.map((text) => ({ type: 'thought', text }));
const narr = (text, who) => ({ type: 'narr', text, who });
const lines = (...pairs) => pairs.map(([who, text]) => narr(text, who));

const scenario = {
  title: '치즈볼 100개로는 어림도 없다구!',

  characters: {
    me:    { name: '계현' },
    kang:  { name: '강냉이', full: '유강민', avatar: '🌽', color: '#FFE7A3', img: 'assets/kang_profile.jpg', img26: 'assets/insta_profile.jpg' },
    honey: { name: '허니형', full: '동헌',   avatar: '🍯', color: '#FFD6A5', img: 'assets/honey_profile.jpg' },
    yong:  { name: '용승이', full: '용승',   avatar: '🐉', color: '#C8F0D8', img: 'assets/yong_profile.jpg' },
  },

  rooms: {
    kang:   { name: '강냉이' },
    group:  { name: '베리베리', members: 4 },
    kang26: { name: '강냉이' },
  },

  assets: {
    titleBgm: 'assets/title_bgm.mp3',
    chatBgm: 'assets/chat_bgm.mp3',
    endingBgm: 'assets/ending_bgm.mp3',
    song: 'assets/tangerine.mp3',
    songPhoto: 'assets/song_photo.jpg',
    album: 'assets/album.jpg',
    insta: 'assets/insta.jpg',
    instaProfile: 'assets/insta_profile.jpg',
    hiddenVideo: 'assets/hidden1.mp4',
  },

  song: { title: 'Tangerine', artist: 'B.I', seconds: 25 },

  startYear: 2020,

  systemText:
    '당신은 2020년으로 회귀하였습니다.\n\n' +
    '당신은 같은 그룹 멤버 유강민의 호감도를 100으로 올려야만 2026년으로 돌아갈 수 있습니다.\n\n' +
    '유강민의 호감도는 100이 될 때까지는 확인할 수 없으며, 100이 되는 즉시 당신은 2026년으로 돌아갑니다.\n\n' +
    '돌아간 이후에 당신의 선택에 따른 유강민의 호감도 내역을 확인할 수 있습니다.\n\n' +
    '그럼 지금부터 시작합니다!',

  events: [
    {
      id: 'prologue', date: '1월 9일', time: '8:47', room: 'kang',
      steps: [
        narr('꿈인가...', '계현'),
        narr('(볼을 꼬집어본다)'),
        narr('아야!', '계현'),
      ],
    },
    {
      id: '0109', date: '1월 9일', time: '9:03', room: 'kang',
      steps: [
        kang('형 오늘 등산가면 안돼요?'),
        think('(등산..?)'),
        {
          type: 'choice', q: '형 오늘 등산가면 안돼요?',
          options: [
            { text: '혼자 열심히 가시길 바랍니다', score: 1, reply: kang('같이 하기로 했잖아 그때..') },
            { text: '고민 조금만 해볼게', score: 3, reply: kang('지금 딱 가면 좋을 것 같은데 ㅎㅎ') },
            { text: '아 알겠어 한번 도전해볼게', score: 5, reply: kang('그럼 지금 준비할게요!!') },
          ],
        },
      ],
    },
    {
      id: '0125', date: '1월 25일', time: '0:01', room: 'group',
      steps: [
        say('honey', '강민아 생일축하한다!'),
        say('yong', '우리 막내 생일 축하해'),
        me('생일 ㅊㅋㅊㅋ'),
        { type: 'room', room: 'kang' },
        think('(단톡으로만 축하하기엔... 좀 그런가?)'),
        {
          type: 'choice', q: '강민이 생일, 개인 톡을 보낼까?',
          options: [
            { text: '개인 톡으로 생일 축하를 보낸다', score: 10,
              send: '강민아 생일축하해 비록 지금 같이 없지만 형이 선물 사갖고 올라갈께 😘😘' },
            { text: '연락을 기다린다', score: 1, silent: true, reply: think('(...먼저 연락 오겠지?)') },
          ],
        },
        kang('형 생일 축하해줘서 고마워요!!', '생일선물 다른 건 필요없고 뽀뽀나 해줘요 계현이형'),
        {
          type: 'choice', q: '형 생일 축하해줘서 고마워요!!',
          quote: '형 생일 축하해줘서 고마워요!!',
          options: [
            { text: '그래 잘 자고 올라가면 보자', score: 3 },
            { text: '갖고싶은 거 있으면 말해', score: 5 },
            { text: '읽씹한다', score: 1, silent: true, reply: think('(읽고... 그냥 폰을 엎어두었다)') },
          ],
        },
        {
          type: 'choice', q: '생일선물 다른 건 필요없고 뽀뽀나 해줘요 계현이형',
          quote: '생일선물 다른 건 필요없고 뽀뽀나 해줘요 계현이형',
          options: [
            { text: '뭔소리야 ㅋㅋ 올라가면 보자 잘 자', score: 3,
              reply: kang('ㅠㅠ 뽀뽀한다고 입술이 닳는 것도 아니고.. 잘 자요') },
            { text: '뽀뽀? 그정도는 당연히 해줄 수 있지', score: 10, reply: kang('진짜요?????') },
            { text: '(뽀뽀 이모티콘) 됐지?', send: '😘\n됐지?', score: 10, reply: kang('형.. 형은 진짜 너무 귀여워요') },
          ],
        },
      ],
    },
    {
      id: '0207', date: '2월 7일', time: '13:20', room: 'kang',
      steps: [
        kang('형 오늘 저랑 커플후리스에요!'),
        {
          type: 'choice', q: '형 오늘 저랑 커플후리스에요!',
          options: [
            { text: '아닌데?', score: 1, reply: kang('허니형이 말한건데..') },
            { text: '그런가 ㅋㅋㅋ', score: 3, reply: kang('제가 먼저 입었어요 ㅎㅎ') },
            { text: '너가 먼저 입었길래 나도 입었어', score: 5, reply: kang('오늘따라 왜케 샥 땡겨요... 평소엔 밀기만 하더니') },
          ],
        },
      ],
    },
    {
      id: '0514', date: '5월 14일', time: '0:00', room: 'kang',
      steps: [
        { type: 'msg', from: 'kang', letter: true, typingMs: 3800,
          text: '형 생일축하해요!! 벌써 형의 생일이에요 ㅎㅎ 형을 처음 봤을 때부터 기억나는 하루하루를 다시 한번 생각해보고 있는데 너무 형한테 고맙고 \'우리 형 너무 수고했구나\' 생각도 들고 참 많은 감정이 오가는 거 같아요 ㅎㅎ 물론 저한테 항상 틱틱대긴 하지만.. (장난이에요) 항상 우리 베리베리의 나이 중심뿐만 아니라 정말 팀의 중심으로서 고생하고 있는 걸 알고 있고 형의 그 역할들이 얼마나 힘들지 알기 때문에 너무 미안하고 항상 너무 고마워요 💗 정말 형이 있어 더 재미있는 하루하루를 보내고 있고 형이 있어 우리 베리베리는 더 좋은 무대, 더 좋은 음악을 할 수 있다는 걸 잊지 마요!! 형은 우리의 자랑스러운 아티스트입니다~ 💗💗 - 형을 제일 사랑하는 강민이' },
        {
          type: 'choice', q: '강민이의 긴 생일 편지',
          options: [
            { text: '진짜 길게 썼네 강민아 고마워 형이랑 재미있게 앞으로도 베리베리하자', score: 5 },
            { text: '강민아 고마워 형이 항상 틱틱거리는건 애정표현이야~ㅋㅋ 형도 ㅅ...ㅏ...사랑해^^', score: 10 },
          ],
        },
      ],
    },
    {
      id: '0610', date: '6월 10일', time: '23:24', room: 'kang',
      steps: [
        { type: 'img', from: 'kang', src: 'assets/song_photo.jpg', alt: '노래 캡처 사진' },
        kang('형 이노래 알아요?', '가사가 완전 형 같아요 ㅎㅎ'),
        {
          type: 'choice', q: '형 이노래 알아요? 가사가 완전 형 같아요 ㅎㅎ',
          options: [
            { text: '그러네 눈가의 점이 특히 나랑 비슷하네', score: 5 },
            { text: '그정도는 아닌데?', score: 1 },
          ],
        },
        kang('웃을 때 눈이 초승달 모양인것도 비슷해요', '아 그리고 또 머리색도!', '저희 되게 다른 것 까지도 비슷한데...'),
        me('그런가? ㅋㅋㅋㅋㅋ', '저 노래 나도 들어볼게'),
        // 홈 바 → 음악 앱 → 재생하면 playedSong = true (히든엔딩1 확정)
        { type: 'song', thought: '(...한번 들어볼까? 홈 화면에 음악 앱이 있었던 것 같은데)' },
      ],
    },
    {
      id: '0619', date: '6월 19일', time: '19:42', room: 'kang',
      steps: [
        kang('형 오늘 알마치 드실?'),
        {
          type: 'choice', q: '형 오늘 알마치 드실?',
          options: [
            { text: '왜케 너가 말 하는 건 별로 안땡기지..', score: 1 },
            { text: 'ㄱㄱ', score: 5 },
          ],
        },
        kang('형 제가 시킴 12500원 보내면 돼여'),
        { type: 'transfer', from: 'kang', amount: '12,500' },
        me('강민아 ㅋㅋㅋㅋㅋ 고마워', '너가 사주고', '돈도 주는 거야?'),
        kang('엥? 이거 어떻게하는거에요?'),
        me('잘 먹을게'),
        kang('???'),
        { type: 'transfer', from: 'me', amount: '12,500' },
        me('받을 줄은 알지?'),
        // 답장 없는 상황 (실제로는 1분, 게임에서는 5초) — "..." 대기 중에 선택지 등장
        {
          type: 'pending', from: 'kang', ms: 5000, choiceAfter: 2500,
          choice: {
            type: 'choice', q: '(답장이 없다...)',
            options: [{ text: '강민아 형이 그냥 해줄게 ㅋㅋㅋㅋㅋ', score: 10 }],
          },
        },
        narr('강민에게 송금받기도 도와주고, 알마치 통닭도 함께 먹었다.'),
        narr('강민이 그날 새벽에 같은 이층침대 아래에서 누워 갑자기 카톡을 보냈다.'),
        { type: 'date', date: '6월 20일', time: '3:12' },
        kang('형.. 저 그냥 지금 말할래요', '저 형 좋아해요', '형은 어때요?'),
        { type: 'wait', ms: 1800 },
      ],
    },
  ],

  // 2026년으로 전환된 직후 공통 속마음
  epilogue: think('(뭐야... 돌아온거야?)', '(벌써 호감도 100을 채웠다고...?)', '(그리고 아직 나 강민이한테 답을 못했는데..)', '(어떻게 된 거지?)'),

  // 판정 우선순위: 히든2(전부 첫 번째) → 히든1(노래 재생) → 비율 기준 grades 순서대로
  grades: [
    { min: 90, id: 'e1' },
    { min: 75, id: 'e4' },
    { min: 70, id: 'e2' },
    { min: 40, id: 'e3' },
    { min: 0,  id: 'e3' },
  ],

  endingOrder: ['e1', 'e2', 'e3', 'e4', 'h1', 'h2'],

  endings: {
    e1: {
      label: '엔딩 1', title: 'happy ending',
      year: 2026, date: '6월 20일', time: '16:30', room: 'kang26', roomName: '강냉이 💗',
      steps: [
        kang('형 오랜만에 한강 ㅇㄸ??', '싫다고 하기 ㄴㄴ'),
        me('ㅇㅋ'),
        narr('강민이랑 한강에 앉아서 이런저런 이야기를 나누다가 알게 됐다.'),
        narr('그 당시의 내가 강민이의 고백을 받아들였다는 것도..'),
        narr('아무래도 그때나 지금이나 제일 강민이를 못 당해내는 건 나인 듯하다.'),
      ],
    },
    e2: {
      label: '엔딩 2', title: '이거 마시면 나랑 사귀는 거다..?',
      year: 2026, date: '6월 20일', time: '22:10', room: 'kang26',
      steps: [
        kang('형 지금 뭐해요?', '저 이제 러닝하고 들어가는 길인데', '오랜만에 한잔 하실?'),
        me('좋지', '편의점 갈거면 나 지금 내려갈까?'),
        kang('5분뒤에 내려와요'),
        narr('그날 고백을 받아준 것 같진 않지만 잘 지내고 있구나.'),
        narr('근데 이 이상한 기분은 뭐지? 강민이도 나랑 같은 기분인 걸까.....'),
      ],
    },
    e3: {
      label: '엔딩 3', title: 'minecraft love...',
      year: 2026, date: '6월 20일', time: '21:05', room: 'kang26',
      steps: [
        narr('강민이랑 마지막 카톡이 한 달 전이구나.. 하긴 짝사랑은 진작 끝났겠지..'),
        narr('강민이가 나를 그렇게 좋아했던 걸 이제서야 깨달았네. 다시... 무리일려나?'),
        me('강민아', '바빠?'),
        kang('ㄴㄴ', '왜요?'),
        me('그냥 안 바쁘면 같이 마크나할래?'),
        kang('형이 먼저 웬일임', '각자 방에서 할거?'),
        me('아니', '내가 너 방으로 갈게'),
        lines(
          ['강민', '아 계현이형! 저 살려줘요'],
          ['계현', '잠만 지금 가는중'],
          ['강민', '아 잠만 나 죽었다..'],
          ['계현', '강민아 나도......'],
        ),
        narr('방 안에는 둘의 웃음소리로 가득 찼다.'),
        lines(
          ['강민', '형... 뜬금없긴 한데 혹시 예전에 제가 고백한 거 기억나요?'],
          ['계현', '어..'],
          ['강민', '지나서야 하는 말이지만 저 그때 형 진짜 좋아했었는데'],
          ['계현', '지금은?'],
          ['강민', '네?'],
          ['계현', '...'],
          ['계현', '나 그때랑 똑같은 머리 했는데.. 지금은 어떠냐고'],
          ['강민', '...'],
          ['강민', '몰라요..'],
        ),
      ],
    },
    e4: {
      label: '엔딩 4', title: '미안 계현이형.. 그치만 너무너무 귀여운걸',
      year: 2026, date: '6월 20일', time: '14:48', room: 'kang26',
      steps: [
        { type: 'black', text: '아.. 나 강민이랑 사귀었다가 헤어졌구나...', ms: 3000 },
        { type: 'insta', src: 'assets/insta.jpg', caption: '미안 계현이형.. 그치만 너무너무 귀여운걸 🧀', ms: 3000 },
        think('(저건 언제 찍어갔대)', '(잠든 지도 몰랐네)', '(근데 아무리 강민이라도 전남친한테 저런 말을 하는 건가..?)'),
        kang('형', '인스타봄?'),
        me('봤지'),
        kang('아..', '딱히 말이 없길래', '형 너무너무 귀여워서 찍은건데', '형이 싫으면 내릴게요'),
        me('ㄴㄴ 괜찮아'),
        kang('형은 왜 다 괜찮다고만 함?', '전남친이 귀엽다고 인스타에 올려도 괜찮은 거면', '뭐가 안 괜찮은 건데요', '사귈 때도 그랬지'),
        { type: 'wait', ms: 3000, typing: 'kang' },
        me('강민아...'),
        kang('갑자기 화내서 미안해요', '난 아직', '형이 아직 좋아요... 계현이형'),
      ],
    },
    h1: {
      label: '히든 엔딩 1', title: 'Tangerine Love',
      year: 2026, date: '6월 20일', time: '0:25', room: 'kang26',
      steps: [
        { type: 'insta', video: 'assets/hidden1.mp4', caption: '🍊 Tangerine - B.I' },
        think('(이 노래는...)', '(그때 강민이가 나 같다고 보냈었던 노랜데)', '(갑자기 왜 올린거지)'),
        kang('형 근데 혹시', '형도.. 2020년 꿈 꿨어요?'),
        me('너도?'),
        kang('그거 꿈 아니죠..?', '꿈속의 형은 예전 형이랑 뭔가 달라서', '이상하다고 생각했어요',
          '그리고 제가 형한테 고백했는데', '잠에서 깼거든요', '형', '그래서 대답이 뭐에요?'),
      ],
    },
    h2: {
      label: '히든 엔딩 2', title: '헤어지자고? 나 지금 치즈볼 백만개 튀기고 있는데...?',
      year: 2020, date: '6월 20일', time: '3:15', room: 'kang',
      bgm: 'assets/ending_bgm_h2.mp3', // 히든 엔딩 2 전용 BGM (다른 엔딩은 기본 ending_bgm 사용)
      steps: [
        think('(잠시만)', '(아직 현실로 돌아온 게 아니라)', '(2020년인데...?)'),
        kang('형 저희 헤어져요.', '그리고', '치즈볼 백만개가 있어야', '미래로 돌아갈 수 있어요'),
        me('뭐...?'),
      ],
    },
  },
};

/* =========================================================
 *  ENGINE
 * ========================================================= */
const KEYS = { save: 'cheeseball.save.v1', endings: 'cheeseball.endings.v1', settings: 'cheeseball.settings.v1' };
const ABORT = Symbol('abort');

const $ = (s, r = document) => r.querySelector(s);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const CB = '<svg class="cb" aria-hidden="true"><use href="#cheeseball"/></svg>';

/* ---------- [수정] 프사 원형 / 인스타 미디어 스타일 (CSS를 덮어씀) ---------- */
(function injectFixStyle() {
  const st = document.createElement('style');
  st.textContent = `
    .ava{width:38px;height:38px;border-radius:50%;overflow:hidden;flex:0 0 auto;aspect-ratio:1/1;
      display:inline-flex;align-items:center;justify-content:center}
    .ava img,.post-ava img{width:100%;height:100%;object-fit:cover;object-position:center;border-radius:50%;display:block}
    .post-ava{width:32px;height:32px;border-radius:50%;overflow:hidden;flex:0 0 auto;aspect-ratio:1/1;
      display:inline-flex;align-items:center;justify-content:center}
    .post-media{min-height:260px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#111}
    .post-media img,.post-media video{width:100%;height:100%;max-height:70vh;object-fit:contain;display:block;background:#000}
  `;
  document.head.appendChild(st);
})();

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 저장 불가 환경 */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* noop */ } },
};

const settings = Object.assign({ bgm: 0.6, sfx: 0.7, speed: 1 }, store.get(KEYS.settings, {}));

/* ---------- 최고 점수 자동 계산 ---------- */
function collectChoices(steps, out = []) {
  [steps].flat(Infinity).forEach((s) => {
    if (!s) return;
    if (s.type === 'choice') {
      out.push(s);
      s.options.forEach((o) => o.reply && collectChoices(o.reply, out));
    }
    if (s.type === 'pending') collectChoices([s.choice], out);
  });
  return out;
}
const bestOf = (choice) => Math.max(...choice.options.map((o) => o.score || 0));
const MAX_SCORE = collectChoices(scenario.events.map((e) => e.steps)).reduce((sum, c) => sum + bestOf(c), 0);

/* ---------- 상태 ---------- */
function freshState() {
  return {
    eventIndex: 0, score: 0, history: [], playedSong: false, firstOnly: true,
    logs: {}, room: 'kang', roomName: scenario.rooms.kang.name,
    year: scenario.startYear, date: '', time: '9:41',
  };
}
let state = freshState();
let GEN = 0; // 진행 중인 시나리오 실행 식별자 (타이틀로 나가면 증가 → 이전 실행 중단)

function save() {
  const { eventIndex, score, history, playedSong, firstOnly, logs, room, roomName, year, date, time } = state;
  store.set(KEYS.save, { v: 1, eventIndex, score, history, playedSong, firstOnly, logs, room, roomName, year, date, time });
}
const ratio = () => (MAX_SCORE ? Math.round((state.score / MAX_SCORE) * 100) : 0);

/* ---------- 오디오 (파일이 없어도 조용히 넘어감) ---------- */
function safePlay(media) {
  try { const p = media.play(); if (p && p.catch) p.catch(() => {}); } catch { /* noop */ }
}
function fadeOut(a, ms = 600) {
  const v0 = a.volume; const t0 = performance.now();
  const step = () => {
    const k = Math.min(1, (performance.now() - t0) / ms);
    try { a.volume = v0 * (1 - k); } catch { /* noop */ }
    if (k < 1) requestAnimationFrame(step); else { try { a.pause(); } catch { /* noop */ } }
  };
  requestAnimationFrame(step);
}
const sound = {
  bgm: null, src: null, unlocked: false,
  play(src) {
    if (!src) return;
    if (this.src === src && this.bgm) { if (this.unlocked && this.bgm.paused) safePlay(this.bgm); return; }
    this.stop();
    this.src = src;
    try {
      const a = new Audio(src);
      a.loop = true; a.volume = settings.bgm;
      a.addEventListener('error', () => {});
      this.bgm = a;
      if (this.unlocked) safePlay(a);
    } catch { this.bgm = null; }
  },
  stop() { const a = this.bgm; this.bgm = null; this.src = null; if (a) fadeOut(a); },
  pause() { try { this.bgm && this.bgm.pause(); } catch { /* noop */ } },
  resume() { if (this.bgm && this.unlocked) safePlay(this.bgm); },
  volume(v) { try { if (this.bgm) this.bgm.volume = v; } catch { /* noop */ } },
};
let actx = null;
function blip(freq = 880) {
  if (!settings.sfx || !sound.unlocked) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime;
    const o = actx.createOscillator(); const g = actx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 1.4, t + 0.08);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12 * settings.sfx, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g).connect(actx.destination);
    o.start(t); o.stop(t + 0.18);
  } catch { /* noop */ }
}

/* ---------- 기다림 (탭하면 스킵) ---------- */
let skipper = null;
function wait(ms) {
  return new Promise((res) => {
    let done = false;
    const fin = () => { if (done) return; done = true; clearTimeout(t); if (skipper === fin) skipper = null; res(); };
    const t = setTimeout(fin, ms / settings.speed);
    skipper = fin;
  });
}

// 장면이 바뀌기 전 2.5초 대기 (그 전에 탭하면 바로 넘어감)
const tapNext = () => wait(2500);

/* ---------- 화면 전환 ---------- */
const fader = $('#fader');

// [수정] CSS가 꼬여도 다음 화면이 반드시 보이도록 보정
const FORCE_PROPS = ['display', 'flexDirection', 'visibility', 'opacity', 'pointerEvents', 'zIndex', 'position', 'inset'];
function clearForce() {
  document.querySelectorAll('.screen').forEach((s) => FORCE_PROPS.forEach((p) => { s.style[p] = ''; }));
}
function ensureVisible(el) {
  if (!el || !el.classList.contains('active')) return;
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const hidden = cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.95;
  const collapsed = r.width < 10 || r.height < 10;
  if (hidden || collapsed) {
    console.warn('화면 강제 표시:', el.id, { display: cs.display, visibility: cs.visibility, opacity: cs.opacity, w: r.width, h: r.height });
    Object.assign(el.style, { display: 'flex', flexDirection: 'column', visibility: 'visible', opacity: '1', pointerEvents: 'auto', zIndex: '6' });
    if (collapsed) Object.assign(el.style, { position: 'absolute', inset: '0' });
  }
}

async function goScreen(id, mode = 'cross', dur = 900) {
  const next = $('#' + id);
  if (!next) { console.error(new Error('화면 #' + id + ' 이(가) HTML에 없어요')); return; }
  const cur = $('.screen.active');
  if (cur === next) return;
  clearForce();
  if (mode === 'black') {
    fader.style.setProperty('--fade', dur + 'ms');
    fader.classList.add('show');
    await sleep(dur);
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active', 'leaving'));
    next.classList.add('active');
    updateHomebar();
    await sleep(500);
    ensureVisible(next);
    fader.classList.remove('show');
    await sleep(dur);
  } else {
    document.querySelectorAll('.screen').forEach((s) => { if (s !== cur) s.classList.remove('active', 'leaving'); });
    if (cur) { cur.classList.add('leaving'); cur.classList.remove('active'); }
    next.classList.add('active');
    updateHomebar();
    await sleep(1100);
    cur && cur.classList.remove('leaving');
    ensureVisible(next);
  }
}
const activeId = () => ($('.screen.active') || {}).id;

/* ---------- 타자기 ---------- */
function typewrite(node, text, speed = 40) {
  const chars = Array.from(text);
  let i = 0; let done = false;
  node.textContent = '';
  const api = {
    onDone: null,
    isDone: () => done,
    finish() { if (done) return; clearInterval(t); node.textContent = text; done = true; api.onDone && api.onDone(); },
  };
  const t = setInterval(() => {
    i += 1;
    node.textContent = chars.slice(0, i).join('');
    if (i >= chars.length) { clearInterval(t); done = true; api.onDone && api.onDone(); }
  }, speed);
  return api;
}

/* ---------- 토스트 / 모달 ---------- */
let toastT;
function toast(text) {
  const t = $('#toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 1800);
}
function openModal(title, body, actions = [{ label: '닫기' }]) {
  const m = $('#modal');
  $('#modalTitle').textContent = title;
  const b = $('#modalBody'); b.innerHTML = '';
  if (typeof body === 'string') b.innerHTML = body; else b.appendChild(body);
  const a = $('#modalActions'); a.innerHTML = '';
  actions.forEach((act) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-btn' + (act.primary ? ' primary' : '');
    btn.textContent = act.label;
    btn.onclick = () => { closeModal(); act.onClick && act.onClick(); };
    a.appendChild(btn);
  });
  m.hidden = false;
  m.onclick = (e) => { if (e.target === m) closeModal(); };
}
function closeModal() { $('#modal').hidden = true; }

/* =========================================================
 *  메신저 렌더링
 * ========================================================= */
const chatLog = $('#chatLog');
const chatBody = $('#chatBody');
const bottomEl = $('#chatBottom');
const choicesEl = $('#choices');
const thoughtEl = $('#thought');

function scrollDown() {
  requestAnimationFrame(() => { chatBody.scrollTop = chatBody.scrollHeight; });
}
function safeImg(src, alt, label) {
  const img = new Image();
  img.alt = alt;
  img.onerror = () => {
    const ph = document.createElement('div');
    ph.className = 'ph';
    ph.innerHTML = `<span>🖼️</span>${esc(label || alt)}`;
    img.replaceWith(ph);
  };
  img.src = src;
  return img;
}
const isEmojiOnly = (t) => /^[\p{Extended_Pictographic}‍️\s]+$/u.test(t) && t.trim().length <= 8;

function bubbleFor(e) {
  if (e.kind === 'img') {
    const b = document.createElement('div');
    b.className = 'bubble photo';
    b.appendChild(safeImg(e.src, e.alt, e.alt));
    return b;
  }
  if (e.kind === 'transfer') {
    const b = document.createElement('div');
    b.className = 'transfer';
    b.innerHTML = `<div class="t-top"><span class="t-ico">₩</span><p class="t-txt"><b>${esc(e.amount)}원</b>을 송금하였습니다</p></div><p class="t-bot">송금</p>`;
    return b;
  }
  const b = document.createElement('div');
  b.className = 'bubble' + (e.letter ? ' letter' : '');
  const parts = String(e.text).split('\n');
  if (!e.quote && parts.length === 2 && isEmojiOnly(parts[0])) {
    // 큰 이모티콘 + 텍스트 (예: 😘 / 됐지?)
    const frag = document.createDocumentFragment();
    const big = document.createElement('div'); big.className = 'bubble big'; big.textContent = parts[0];
    b.textContent = parts[1];
    frag.append(big, b);
    return frag;
  }
  if (!e.quote && isEmojiOnly(e.text)) b.classList.add('big');
  if (e.quote) {
    const q = document.createElement('span');
    q.className = 'quote';
    q.innerHTML = `<b>${esc(scenario.characters.kang.name)}에게 답장</b>${esc(e.quote)}`;
    b.appendChild(q);
    b.appendChild(document.createTextNode(e.text));
  } else {
    b.textContent = e.text;
  }
  return b;
}

function renderEntry(e, prev) {
  if (e.kind === 'date') {
    const d = document.createElement('div');
    d.className = 'divider';
    d.textContent = e.text;
    return d;
  }
  const mine = e.from === 'me';
  const row = document.createElement('div');
  row.className = 'row ' + (mine ? 'me' : 'them');
  if (mine) {
    const content = bubbleFor(e);
    if (content instanceof DocumentFragment) {
      const col = document.createElement('div');
      col.className = 'col'; col.style.alignItems = 'flex-end';
      col.appendChild(content);
      row.appendChild(col);
    } else row.appendChild(content);
    return row;
  }
  const ch = scenario.characters[e.from] || { name: e.from, avatar: '🙂', color: '#eee' };
  const cont = prev && prev.from === e.from && prev.kind !== 'date';
  if (cont) row.classList.add('cont');
  const ava = document.createElement('span');
  ava.className = 'ava';
  ava.style.background = ch.color;
  // 2026년(현실 복귀 후)에는 img26(인스타 프로필과 동일한 사진) 사용
  const avaSrc = (state.year !== scenario.startYear && ch.img26) || ch.img;
  if (avaSrc) {
    const im = new Image();
    im.alt = ch.name;
    im.draggable = false;
    im.onerror = () => { im.remove(); ava.textContent = ch.avatar; };
    im.src = avaSrc;
    ava.appendChild(im);
  } else ava.textContent = ch.avatar;
  const col = document.createElement('div');
  col.className = 'col';
  if (!cont) {
    const n = document.createElement('span');
    n.className = 'name';
    n.textContent = ch.name;
    col.appendChild(n);
  }
  col.appendChild(bubbleFor(e));
  row.append(ava, col);
  return row;
}

const curLog = () => (state.logs[state.room] = state.logs[state.room] || []);

function addMsg(entry) {
  const log = curLog();
  const prev = log[log.length - 1];
  log.push(entry);
  chatLog.classList.remove('no-anim');
  chatLog.appendChild(renderEntry(entry, prev));
  scrollDown();
  if (entry.from) blip(entry.from === 'me' ? 1040 : 700);
}
function renderLog() {
  chatLog.classList.add('no-anim');
  chatLog.innerHTML = '';
  const log = curLog();
  log.forEach((e, i) => chatLog.appendChild(renderEntry(e, log[i - 1])));
  chatBody.style.scrollBehavior = 'auto';
  chatBody.scrollTop = chatBody.scrollHeight;
  requestAnimationFrame(() => { chatBody.style.scrollBehavior = ''; });
}
function addTyping(from) {
  const log = curLog();
  const prev = log[log.length - 1];
  const row = renderEntry({ from, text: '' }, prev);
  row.classList.add('typing-row');
  const bubble = row.querySelector('.bubble');
  bubble.classList.add('typing');
  bubble.innerHTML = '<i></i><i></i><i></i>';
  bubble.setAttribute('aria-label', '입력 중');
  chatLog.classList.remove('no-anim');
  chatLog.appendChild(row);
  scrollDown();
  return row;
}
async function typing(from, ms) {
  const row = addTyping(from);
  await wait(ms ?? rand(1300, 2100));
  row.remove();
}

function updateHeader() {
  const room = scenario.rooms[state.room] || {};
  $('#roomName').textContent = state.roomName;
  $('#roomCount').textContent = room.members ? room.members : '';
  $('#roomDate').textContent = state.year !== scenario.startYear ? `${state.year}년 ${state.date}` : state.date;
  document.querySelectorAll('.sb-time').forEach((n) => { n.textContent = state.time; });
  $('#homeDate').textContent = `${state.year}년 ${state.date}`;
}
function addDivider() {
  if (!state.date) return;
  const text = `${state.year}년 ${state.date}`;
  const log = curLog();
  const last = [...log].reverse().find((e) => e.kind === 'date');
  if (!last || last.text !== text) addMsg({ kind: 'date', text });
}
function setDate(date, time) {
  state.date = date;
  if (time) state.time = time;
  updateHeader();
  addDivider();
}
async function switchRoom(room, name) {
  chatLog.classList.add('fade');
  await sleep(800);
  state.room = room;
  state.roomName = name || scenario.rooms[room].name;
  renderLog();
  updateHeader();
  addDivider();
  chatLog.classList.remove('fade');
  await sleep(900);
}

function showThought(text) { thoughtEl.textContent = text; thoughtEl.classList.add('show'); }
function clearThought() { thoughtEl.classList.remove('show'); }

function hideChoices() { bottomEl.classList.remove('choosing'); }
function presentChoices(step) {
  return new Promise((res) => {
    choicesEl.innerHTML = '';
    if (step.quote) {
      const q = document.createElement('p');
      q.className = 'choice-quote';
      q.textContent = `↳ "${step.quote}"에 답장`;
      choicesEl.appendChild(q);
    }
    step.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'choice-btn';
      b.innerHTML = `<span class="num">${i + 1}</span><span>${esc(o.text)}</span>`;
      b.onclick = (ev) => {
        ev.stopPropagation();
        choicesEl.querySelectorAll('button').forEach((x) => { x.disabled = true; });
        b.classList.add('picked');
        blip(1200);
        setTimeout(() => { hideChoices(); res(i); }, 500);
      };
      choicesEl.appendChild(b);
    });
    bottomEl.classList.add('choosing');
    scrollDown();
  });
}

/* ---------- 나레이션 박스 ---------- */
const narrEl = $('#narr');
let narrHideT;
function narrate(text, who) {
  return new Promise((res) => {
    clearTimeout(narrHideT);
    $('#narrName').textContent = who || '';
    narrEl.classList.toggle('inner', !who && /^\(/.test(text));
    narrEl.classList.remove('done');
    narrEl.hidden = false;
    requestAnimationFrame(() => narrEl.classList.add('show'));
    const tw = typewrite($('#narrText'), text, 55 / settings.speed);
    tw.onDone = () => narrEl.classList.add('done');
    narrEl.onclick = (e) => {
      e.stopPropagation();
      if (!tw.isDone()) { tw.finish(); return; }
      narrEl.onclick = null;
      narrHideT = setTimeout(() => {
        narrEl.classList.remove('show');
        setTimeout(() => { if (!narrEl.classList.contains('show')) narrEl.hidden = true; }, 320);
      }, 80);
      res();
    };
  });
}

/* ---------- 연출 ---------- */
async function blackText(text, ms = 3000) {
  const b = $('#blackText');
  b.querySelector('p').textContent = text;
  b.classList.add('show');
  await sleep(1300 + ms);
  b.classList.remove('show');
  await sleep(900);
}
async function timeSlip(swap) {
  const g = $('#glitch');
  g.className = 'glitch on';
  await sleep(5200);
  g.classList.add('hold');
  swap();
  await sleep(2400);
  g.classList.add('out');
  await sleep(1800);
  g.className = 'glitch';
}

// [수정] 영상: 소리 차단 시 음소거 재시도, 10초 내 재생 시작 안 되면 건너뜀
function playVideo(src) {
  return new Promise((res) => {
    const media = $('#postMedia');
    const skip = $('#instaSkip');
    const scr = $('#insta');
    media.innerHTML = '';
    let done = false;
    let watchdog;
    const v = document.createElement('video');
    const fin = () => {
      if (done) return; done = true;
      scr.onclick = null;
      clearTimeout(watchdog);
      try { v.pause(); } catch { /* noop */ }
      skip.hidden = true;
      res();
    };
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.controls = false;
    v.preload = 'auto';
    v.volume = settings.bgm;
    v.onended = fin;
    v.onerror = () => {
      const code = v.error ? v.error.code : '?';
      console.error('영상 로드 실패 (code ' + code + ') ' + src);
      media.innerHTML = '<div class="ph"><span>🎬</span>영상을 불러올 수 없어요</div>';
      setTimeout(fin, 3000);
    };
    media.appendChild(v);
    skip.hidden = false;
    skip.onclick = (e) => { e.stopPropagation(); fin(); };
    scr.onclick = fin; // 영상 화면 아무 데나 탭하면 바로 넘어감

    watchdog = setTimeout(() => {
      if (v.currentTime === 0) { toast('영상이 재생되지 않아 넘어갑니다'); fin(); }
    }, 10000);
    v.addEventListener('playing', () => clearTimeout(watchdog), { once: true });

    v.src = src;
    v.load();
    const p = v.play();
    if (p && p.catch) {
      p.catch(() => {
        v.muted = true;
        const p2 = v.play();
        if (p2 && p2.catch) p2.catch(() => {});
      });
    }
  });
}
// [수정] 인스타 화면: 요소 null 방어 + 화면 보정
async function showInsta(step) {
  const pa = $('#postAva');
  const cap = $('#postCap');
  const media = $('#postMedia');

  if (pa) {
    pa.textContent = '🌽';
    const pim = new Image();
    pim.alt = '';
    pim.onload = () => { pa.textContent = ''; pa.appendChild(pim); };
    pim.src = scenario.assets.instaProfile;
  }
  if (cap) cap.textContent = step.caption || '';
  if (media) {
    media.innerHTML = '';
    if (!step.video) media.appendChild(safeImg(step.src, '피드 사진', '피드 사진'));
  }

  await tapNext();
  await goScreen('insta');

  if (step.video) {
    sound.pause();
    await playVideo(step.video);
    sound.resume();
  } else {
    await sleep(step.ms || 3000);
  }
  await goScreen('messenger');
}

/* ---------- 홈 화면 · 음악 앱 (6월 10일) ---------- */
let songDone = null;
let songOpen = false;
const homebar = $('#homebar');
const music = { playing: false, audio: null, raf: 0, timer: 0 };

function updateHomebar() {
  const id = activeId();
  homebar.classList.toggle('on', ['messenger', 'home', 'music'].includes(id));
}
function songWindow(step) {
  return new Promise((res) => {
    songOpen = true;
    $('#home').classList.add('song-open');
    homebar.classList.add('glow');
    showThought(step.thought);
    choicesEl.innerHTML = '';
    const hint = document.createElement('p');
    hint.className = 'choice-hint';
    hint.textContent = '나중에 찾아서 들어볼까…';
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'choice-btn ghost';
    b.textContent = '나중에 들어봐야지 →';
    b.onclick = (ev) => { ev.stopPropagation(); songDone(false); };
    choicesEl.append(hint, b);
    bottomEl.classList.add('choosing');
    songDone = () => {
      songDone = null;
      songOpen = false;
      $('#home').classList.remove('song-open');
      homebar.classList.remove('glow');
      hideChoices();
      clearThought();
      res();
    };
  });
}
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
function resetMusicUI() {
  $('#musicBar').style.width = '0%';
  $('#musicCur').textContent = '0:00';
  $('#playBtn').textContent = '▶';
  $('#playBtn').disabled = false;
  $('#musicNote').textContent = '재생을 누르면 노래가 흘러나와요';
  $('#music').classList.remove('playing');
}
function stopMusic() {
  music.playing = false;
  clearTimeout(music.timer);
  cancelAnimationFrame(music.raf);
  if (music.audio) { fadeOut(music.audio, 500); music.audio = null; }
  $('#music').classList.remove('playing');
}
function playSong() {
  if (music.playing || !songOpen) return;
  music.playing = true;
  music.gen = GEN;
  $('#music').classList.add('playing');
  $('#playBtn').textContent = '❚❚';
  $('#playBtn').disabled = true;
  $('#musicNote').textContent = '♪ 재생 중... (화면을 탭하면 넘어가요)';
  sound.pause();
  try {
    music.audio = new Audio(scenario.assets.song);
    music.audio.volume = settings.bgm;
    music.audio.addEventListener('error', () => {});
    safePlay(music.audio);
  } catch { music.audio = null; }
  const dur = scenario.song.seconds * 1000;
  const t0 = performance.now();
  const tick = () => {
    const k = Math.min(1, (performance.now() - t0) / dur);
    $('#musicBar').style.width = (k * 100) + '%';
    $('#musicCur').textContent = fmt((k * dur) / 1000);
    if (k < 1 && music.playing) music.raf = requestAnimationFrame(tick);
  };
  tick();
  music.timer = setTimeout(finishSong, dur);
}

// 25초가 끝나거나, 재생 중 화면을 탭하면 바로 메신저로 넘어간다
let songFinishing = false;
async function finishSong() {
  if (songFinishing || !music.playing) return;
  songFinishing = true;
  const g = music.gen;
  stopMusic();
  if (g !== GEN) { songFinishing = false; return; }
  state.playedSong = true;
  await goScreen('messenger');
  resetMusicUI();
  sound.resume();
  songFinishing = false;
  if (songDone) songDone(true);
}

homebar.addEventListener('click', () => {
  const id = activeId();
  if (id === 'messenger') {
    if (songOpen) goScreen('home');
    else { homebar.classList.remove('nudge'); void homebar.offsetWidth; homebar.classList.add('nudge'); }
  } else if (id === 'home') goScreen('messenger');
  else if (id === 'music') { if (music.playing) finishSong(); else goScreen('home'); }
});
document.querySelectorAll('.app').forEach((a) => {
  a.addEventListener('click', () => {
    const app = a.dataset.app;
    if (app === 'messenger') goScreen('messenger');
    else if (app === 'music') goScreen('music');
    else toast('지금은 열 수 없어요');
  });
});
$('#musicBack').addEventListener('click', () => { if (!music.playing) goScreen('home'); });
$('#playBtn').addEventListener('click', (e) => { e.stopPropagation(); playSong(); });
$('#music').addEventListener('click', () => { if (music.playing) finishSong(); });
$('#musicDur').textContent = fmt(scenario.song.seconds);

/* =========================================================
 *  시나리오 실행
 * ========================================================= */
async function runSteps(steps, g) {
  for (const step of [steps].flat(Infinity)) {
    if (g !== GEN) throw ABORT;
    if (step) await runStep(step, g);
  }
  if (g !== GEN) throw ABORT;
}

async function runChoice(step, g, beforeSend) {
  const idx = await presentChoices(step);
  if (g !== GEN) throw ABORT;
  const o = step.options[idx];
  state.history.push({ date: state.date, q: step.q, a: o.text, d: o.score || 0, max: bestOf(step) });
  state.score += o.score || 0;
  if (idx !== 0) state.firstOnly = false;
  clearThought();
  if (beforeSend) beforeSend();
  if (!o.silent) {
    await wait(rand(900, 1300));
    addMsg({ from: 'me', text: o.send ?? o.text, quote: step.quote });
  }
  if (o.reply) await runSteps(o.reply, g);
}

async function runStep(s, g) {
  switch (s.type) {
    case 'msg':
      await typing(s.from, s.typingMs);
      addMsg({ from: s.from, text: s.text, letter: s.letter });
      break;
    case 'me':
      await wait(rand(1200, 1800));
      addMsg({ from: 'me', text: s.text });
      break;
    case 'img':
      await typing(s.from);
      addMsg({ from: s.from, kind: 'img', src: s.src, alt: s.alt });
      break;
    case 'transfer':
      if (s.from === 'me') await wait(rand(1300, 1800)); else await typing(s.from);
      addMsg({ from: s.from, kind: 'transfer', amount: s.amount });
      break;
    case 'thought':
      showThought(s.text);
      await wait(2200 + s.text.length * 60);
      break;
    case 'narr':
      await narrate(s.text, s.who);
      break;
    case 'room':
      await tapNext();
      await switchRoom(s.room, s.name);
      break;
    case 'date':
      await tapNext();
      setDate(s.date, s.time);
      break;
    case 'wait':
      if (s.typing) await typing(s.typing, s.ms); else await wait(s.ms);
      break;
    case 'choice':
      await runChoice(s, g);
      break;
    case 'pending': {
      // 상대가 "..." 상태로 대기하는 사이 선택지가 올라옴
      const row = addTyping(s.from);
      await sleep(Math.min(s.choiceAfter ?? s.ms / 2, s.ms));
      if (g !== GEN) throw ABORT;
      await runChoice(s.choice, g, () => row.remove());
      break;
    }
    case 'song':
      await songWindow(s);
      break;
    case 'black':
      await blackText(s.text, s.ms);
      break;
    case 'insta':
      await showInsta(s);
      break;
    default:
      break;
  }
}

async function enterEvent(ev) {
  // 날짜나 톡방이 바뀔 때만 탭을 기다린다 (첫 이벤트 제외)
  const changes = state.date && (ev.date !== state.date || (ev.room && ev.room !== state.room));
  if (changes) await tapNext();
  clearThought();
  state.date = ev.date;
  state.time = ev.time || state.time;
  if (ev.room && ev.room !== state.room) await switchRoom(ev.room);
  else { updateHeader(); addDivider(); }
}

function decideEnding() {
  if (state.firstOnly && state.history.length) return 'h2'; // 히든2가 히든1보다 우선
  if (state.playedSong) return 'h1';
  const r = ratio();
  return (scenario.grades.find((x) => r >= x.min) || scenario.grades[scenario.grades.length - 1]).id;
}

async function runGame(from) {
  const g = ++GEN;
  try {
    for (let i = from; i < scenario.events.length; i += 1) {
      state.eventIndex = i;
      save();
      await enterEvent(scenario.events[i]);
      await runSteps(scenario.events[i].steps, g);
    }
    state.eventIndex = scenario.events.length;
    save();
    await runEnding(g);
  } catch (e) {
    if (e !== ABORT) {
      console.error(e);
      toast('오류: ' + (e && e.message ? e.message : e)); // [수정] 에러를 화면에도 표시
    }
  }
}

async function runEnding(g) {
  const id = decideEnding();
  const E = scenario.endings[id];
  await tapNext();
  sound.stop();
  clearThought();
  await timeSlip(() => {
    state.year = E.year;
    state.room = E.room;
    state.roomName = E.roomName || scenario.rooms[E.room].name;
    state.date = E.date;
    state.time = E.time || state.time;
    renderLog();
    updateHeader();
    addDivider();
  });
  if (g !== GEN) throw ABORT;
  sound.play(E.bgm || scenario.assets.endingBgm);
  await runSteps(scenario.epilogue, g);
  await runSteps(E.steps, g);
  await tapNext();
  clearThought();
  if (g !== GEN) throw ABORT;

  const got = store.get(KEYS.endings, []);
  if (!got.includes(id)) store.set(KEYS.endings, [...got, id]);
  store.del(KEYS.save);
  state.endingId = id;

  const hidden = id.startsWith('h');
  $('#endLabel').textContent = hidden ? `HIDDEN ENDING ${id.slice(1)}` : `ENDING ${id.slice(1)}`;
  $('#endTitle').textContent = E.title;
  await goScreen('endcard', 'black', 1400);
}

/* ---------- 호감도 공개 ---------- */
function showReveal() {
  const E = scenario.endings[state.endingId];
  const r = ratio();
  $('#revealEnding').textContent = `${E.label} · ${E.title}`;
  $('#revealRaw').textContent = `모은 치즈볼 ${state.score} / ${MAX_SCORE}`;
  const list = $('#historyList');
  list.innerHTML = '';
  state.history.forEach((h, i) => {
    const li = document.createElement('li');
    li.style.animationDelay = (i * 0.06) + 's';
    li.innerHTML =
      `<span class="h-date">${esc(h.date)}</span>` +
      `<p class="h-q">${esc(h.q)}</p>` +
      `<p class="h-a">→ ${esc(h.a)}</p>` +
      `<span class="h-d">+${h.d} ${CB}</span>`;
    list.appendChild(li);
  });
  if (state.playedSong) {
    const li = document.createElement('li');
    li.className = 'flag';
    li.innerHTML = '<span class="h-date">6월 10일 · 히든 플래그</span><p class="h-q">강민이가 보낸 노래</p>' +
      `<p class="h-a">→ ${esc(scenario.song.title)} - ${esc(scenario.song.artist)} 를 들었다</p><span class="h-d">🍊</span>`;
    list.appendChild(li);
  }
  goScreen('reveal', 'black').then(() => {
    const el = $('#ratio'); const t0 = performance.now();
    const tick = () => {
      const k = Math.min(1, (performance.now() - t0) / 1200);
      el.textContent = Math.round(r * (1 - Math.pow(1 - k, 3))) + '%';
      if (k < 1) requestAnimationFrame(tick);
    };
    tick();
  });
}

/* =========================================================
 *  타이틀 · 메뉴
 * ========================================================= */
function cleanup() {
  skipper = null;
  hideChoices();
  clearThought();
  narrEl.onclick = null;
  narrEl.classList.remove('show');
  narrEl.hidden = true;
  songDone = null;
  songOpen = false;
  $('#home').classList.remove('song-open');
  homebar.classList.remove('glow');
  stopMusic();
  resetMusicUI();
  const v = $('#postMedia video'); if (v) { try { v.pause(); } catch { /* noop */ } }
  $('#instaSkip').hidden = true;
  $('#insta').onclick = null;
  $('#blackText').classList.remove('show');
  $('#glitch').className = 'glitch';
  $('#system').onclick = null;
}

function refreshContinue() {
  $('[data-act="continue"]').disabled = !store.get(KEYS.save, null);
}

async function toTitle() {
  GEN += 1;
  cleanup();
  sound.stop();
  await goScreen('title', 'black', 1100);
  refreshContinue();
  sound.play(scenario.assets.titleBgm);
}

// 한 문단씩 출력하고, 탭하면 이전 문단을 지우고 다음 문단만 보여준다
function runSystem(g) {
  return new Promise((res) => {
    const next = $('#sysNext');
    const text = $('#sysText');
    const paras = scenario.systemText.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
    let i = 0; let tw; let busy = false;
    const show = () => {
      next.classList.remove('show');
      text.classList.remove('out');
      tw = typewrite(text, paras[i], 75);
      tw.onDone = () => next.classList.add('show');
    };
    show();
    $('#system').onclick = async () => {
      if (busy) return;
      if (!tw.isDone()) { tw.finish(); return; }
      if (i < paras.length - 1) {
        busy = true;
        next.classList.remove('show');
        text.classList.add('out');
        await sleep(600);
        busy = false;
        if (g !== GEN) return;
        i += 1; show();
        return;
      }
      $('#system').onclick = null;
      if (g === GEN) res();
    };
  });
}

async function newGame() {
  store.del(KEYS.save);
  state = freshState();
  const g = ++GEN;
  cleanup();
  sound.stop();
  $('#sysText').textContent = '';
  await goScreen('system', 'black', 1400);
  await sleep(700);
  await runSystem(g);
  if (g !== GEN) return;
  renderLog();
  updateHeader();
  await goScreen('messenger', 'black', 1200);
  sound.play(scenario.assets.chatBgm);
  runGame(0);
}

async function continueGame() {
  const sv = store.get(KEYS.save, null);
  if (!sv) return;
  state = Object.assign(freshState(), sv);
  cleanup();
  sound.stop();
  renderLog();
  updateHeader();
  await goScreen('messenger', 'black', 1200);
  sound.play(scenario.assets.chatBgm);
  runGame(state.eventIndex);
}

function openGallery() {
  const got = store.get(KEYS.endings, []);
  const wrap = document.createElement('div');
  const count = document.createElement('p');
  count.className = 'g-count';
  count.textContent = `달성한 엔딩 ${got.length} / ${scenario.endingOrder.length}`;
  const grid = document.createElement('div');
  grid.className = 'gallery';
  scenario.endingOrder.forEach((id) => {
    const E = scenario.endings[id];
    const open = got.includes(id);
    const c = document.createElement('div');
    c.className = 'g-card' + (open ? ' open' : '');
    c.innerHTML = `${CB}<span>${esc(E.label)}</span><b>${open ? esc(E.title) : '???'}</b>`;
    grid.appendChild(c);
  });
  wrap.append(count, grid);
  openModal('엔딩 도감', wrap);
}

function openSettings() {
  const wrap = document.createElement('div');
  const pct = (v) => Math.round(v * 100) + '%';
  wrap.innerHTML = `
    <div class="setting">
      <label for="volBgm"><span>배경음악</span><span id="volBgmV">${pct(settings.bgm)}</span></label>
      <input id="volBgm" type="range" min="0" max="1" step="0.05" value="${settings.bgm}">
    </div>
    <div class="setting">
      <label for="volSfx"><span>효과음</span><span id="volSfxV">${pct(settings.sfx)}</span></label>
      <input id="volSfx" type="range" min="0" max="1" step="0.05" value="${settings.sfx}">
    </div>
    <div class="setting">
      <label><span>메시지 속도</span></label>
      <div class="seg" id="speedSeg">
        <button type="button" data-v="0.75">느리게</button>
        <button type="button" data-v="1">보통</button>
        <button type="button" data-v="1.6">빠르게</button>
      </div>
    </div>
    <button type="button" class="danger" id="resetData">저장 데이터 · 엔딩 도감 초기화</button>`;
  const persist = () => store.set(KEYS.settings, settings);
  wrap.querySelector('#volBgm').oninput = (e) => {
    settings.bgm = +e.target.value; sound.volume(settings.bgm);
    wrap.querySelector('#volBgmV').textContent = pct(settings.bgm); persist();
  };
  wrap.querySelector('#volSfx').oninput = (e) => {
    settings.sfx = +e.target.value;
    wrap.querySelector('#volSfxV').textContent = pct(settings.sfx); persist();
  };
  wrap.querySelector('#volSfx').onchange = () => blip(900);
  const seg = wrap.querySelector('#speedSeg');
  const mark = () => seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', +b.dataset.v === settings.speed));
  seg.onclick = (e) => { const b = e.target.closest('button'); if (!b) return; settings.speed = +b.dataset.v; mark(); persist(); };
  mark();
  wrap.querySelector('#resetData').onclick = () => {
    store.del(KEYS.save); store.del(KEYS.endings);
    refreshContinue();
    toast('초기화했어요');
  };
  openModal('설정', wrap);
}

/* ---------- 이벤트 연결 ---------- */
$('#title').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-act]');
  if (!btn || btn.disabled) return;
  const act = btn.dataset.act;
  if (act === 'start') newGame();
  if (act === 'continue') continueGame();
  if (act === 'gallery') openGallery();
  if (act === 'settings') openSettings();
});

// 메신저 화면 탭 → 대기 스킵
$('#messenger').addEventListener('click', (e) => {
  if (e.target.closest('button')) return;
  if (skipper) skipper();
});

$('#backBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  openModal('타이틀로 돌아갈까요?',
    '<p class="msg">진행 상황은 자동으로 저장돼요.<br>\'이어하기\'로 이 날짜부터 다시 시작할 수 있어요.</p>',
    [{ label: '계속하기' }, { label: '타이틀로', primary: true, onClick: toTitle }]);
});

$('#toReveal').addEventListener('click', showReveal);
$('#againBtn').addEventListener('click', newGame);
$('#titleBtn').addEventListener('click', toTitle);

// 첫 터치 이후 배경음악 재생 (브라우저 자동재생 정책)
function unlockAudio() {
  if (sound.unlocked) return;
  sound.unlocked = true;
  $('#titleFoot').classList.add('off');
  sound.resume();
}
document.addEventListener('pointerdown', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });

refreshContinue();
updateHomebar();
sound.play(scenario.assets.titleBgm);
