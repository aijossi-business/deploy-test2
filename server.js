require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const occupations = require('./data/occupations.json');
const deaths = require('./data/deaths.json');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatYear(year) {
  if (year <= -10000) {
    const abs = Math.abs(year);
    if (abs >= 1000000000) return `약 ${(abs / 1000000000).toFixed(0)}억년 전`;
    if (abs >= 1000000) return `약 ${(abs / 1000000).toFixed(0)}백만년 전`;
    if (abs >= 10000) return `약 ${(abs / 10000).toFixed(0)}만년 전`;
  }
  if (year < 0) return `기원전 ${Math.abs(year)}년`;
  return `${year}년`;
}

function generatePastLife() {
  const occupation = getRandomItem(occupations);
  const [eraStart, eraEnd] = occupation.era;
  const year = Math.floor(Math.random() * (eraEnd - eraStart + 1)) + eraStart;
  const deathList = deaths[occupation.category] || deaths.human;
  const deathCause = getRandomItem(deathList);

  return {
    occupation: occupation.name,
    category: occupation.category,
    year,
    yearFormatted: formatYear(year),
    deathCause,
  };
}

app.post('/api/past-life', async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: '이름을 입력해주세요.' });
  }

  const pastLife = generatePastLife();

  const categoryLabel = {
    human: '인간',
    animal: '동물',
    microbe: '미생물',
    object: '무생물',
    alien: '외계/초월적 존재',
  };

  const prompt = `당신은 전생 스토리텔러입니다. 유저의 이름과 전생 정보를 바탕으로 재미있고 몰입감 있는 전생 이야기를 만들어주세요.

유저 이름: ${name}
전생 시기: ${pastLife.yearFormatted}
전생 존재 유형: ${categoryLabel[pastLife.category] || '인간'}
전생 직업/정체: ${pastLife.occupation}
사망 원인: ${pastLife.deathCause}

규칙:
1. 한국어로 작성하세요.
2. 2-3문단, 약 200-300자 내외로 작성하세요.
3. 유머와 드라마를 적절히 섞어주세요.
4. 유저의 이름을 자연스럽게 이야기에 녹여주세요.
5. 전생의 시대적 배경을 생생하게 묘사해주세요.
6. 마지막에 사망 원인을 극적으로 마무리해주세요.
7. 마지막 문장은 현생의 유저에게 전생과 연결짓는 한마디를 해주세요 (예: "그래서 지금도 ○○을 무서워하는 건지도 모릅니다")
8. 존재 유형이 인간이 아닌 경우(동물, 미생물, 무생물, 외계인), 그 존재의 관점에서 이야기를 들려주세요.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 1.0,
    });

    const story = completion.choices[0].message.content;

    res.json({
      name,
      ...pastLife,
      story,
    });
  } catch (err) {
    console.error('OpenAI API error:', err.message);
    res.status(500).json({ error: 'AI 스토리 생성에 실패했습니다. 잠시 후 다시 시도해주세요.' });
  }
});

// Vercel serverless export
module.exports = app;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
  });
}
