import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Languages, RotateCcw, Sparkles } from 'lucide-react'
import { tarotDeck, type TarotCard } from './data/tarot'

type Lang = 'ru' | 'en'
type DrawnCard = { card: TarotCard; reversed: boolean }
const positions = {
  ru: { 1: ['Главная тема'], 3: ['Прошлое', 'Настоящее', 'Будущее'], 5: ['Суть ситуации', 'Что влияет', 'Что скрыто', 'Совет', 'Возможное направление'] },
  en: { 1: ['The central theme'], 3: ['Past', 'Present', 'Future'], 5: ['The situation', 'What influences it', 'What is hidden', 'Guidance', 'Possible direction'] },
}

export default function Readings() {
  const [lang, setLang] = useState<Lang>('ru')
  const [size, setSize] = useState<1 | 3 | 5>(3)
  const [question, setQuestion] = useState('')
  const [cards, setCards] = useState<DrawnCard[]>([])
  const [revealed, setRevealed] = useState(false)
  const [drawKey, setDrawKey] = useState(0)
  const copy = lang === 'ru'
    ? { back: 'На главную', eyebrow: 'ИНТЕРАКТИВНОЕ ПРОСТРАНСТВО ТАРО', title: 'Расклад начинается с вопроса.', intro: 'Сделайте паузу, сформулируйте то, что действительно хотите прояснить, и выберите формат расклада.', question: 'Ваш вопрос', placeholder: 'Например: на что мне сейчас стоит обратить внимание?', choose: 'Выберите расклад', one: '1 карта', three: '3 карты', five: '5 карт', draw: 'Перемешать и вытянуть', again: 'Новый расклад', reveal: 'Открыть карты', focus: 'Сосредоточьтесь на вопросе и нажмите кнопку, чтобы перемешать колоду.', upright: 'Прямое положение', reversed: 'Перевёрнутое положение', result: 'ВАШ РАСКЛАД', note: 'Трактовки символические и предназначены для саморефлексии. Они не предсказывают события и не заменяют профессиональную помощь.', footer: '78 КАРТ · БЕЗ ПОВТОРОВ · ОДИН РАСКЛАД' }
    : { back: 'Back to home', eyebrow: 'AN INTERACTIVE TAROT SPACE', title: 'Every reading begins with a question.', intro: 'Take a pause, frame what you would like to explore and choose a spread.', question: 'Your question', placeholder: 'For example: what should I pay attention to right now?', choose: 'Choose a spread', one: '1 card', three: '3 cards', five: '5 cards', draw: 'Shuffle and draw', again: 'New reading', reveal: 'Reveal cards', focus: 'Focus on your question and shuffle the deck to begin.', upright: 'Upright position', reversed: 'Reversed position', result: 'YOUR READING', note: 'Interpretations are symbolic prompts for self-reflection. They do not predict events or replace professional advice.', footer: '78 CARDS · NO REPEATS · ONE READING' }

  const draw = () => {
    const pool = [...tarotDeck]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    setCards(pool.slice(0, size).map(card => ({ card, reversed: Math.random() < 0.5 })))
    setRevealed(false)
    setDrawKey(value => value + 1)
  }
  const labels = positions[lang][size]
  const deckCount = useMemo(() => tarotDeck.length, [])

  return <div className="site-shell readings-page">
    <div className="topline"><span>ELENA BUCHELOVSKAYA</span><span>PERSONAL TAROT · {lang === 'ru' ? 'РАСКЛАДЫ' : 'READINGS'}</span><span>EST. IN PRESENCE</span></div>
    <header className="header readings-header">
      <a className="wordmark" href={import.meta.env.BASE_URL} aria-label="Elena Buchelovskaya home"><span>ELENA</span><span>BUCHELOVSKAYA</span><small>T A R O T</small></a>
      <div className="reading-header-actions">
        <button className="language" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}><Languages size={15}/>{lang.toUpperCase()}</button>
        <a className="text-link" href={import.meta.env.BASE_URL}><ArrowLeft size={15}/>{copy.back}</a>
      </div>
    </header>
    <main className="readings-main">
      <section className="readings-hero">
        <div className="readings-orbit"><div className="readings-emblem">☾<span>✧</span></div></div>
        <div className="readings-intro">
          <div className="eyebrow"><span className="eyebrow-line"/>{copy.eyebrow}</div>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <div className="readings-meta"><span>{copy.footer}</span><span>{deckCount} / 78</span></div>
        </div>
      </section>
      <section className="reading-workspace">
        <div className="reading-setup">
          <div className="section-kicker"><span>01</span><span>{copy.choose}</span></div>
          <div className="reading-size-options">
            {([1, 3, 5] as const).map(value => <button key={value} className={size === value ? 'reading-size active' : 'reading-size'} onClick={() => { setSize(value); setCards([]); setRevealed(false) }}><strong>{value}</strong><span>{value === 1 ? copy.one : value === 3 ? copy.three : copy.five}</span></button>)}
          </div>
          <label className="reading-question"><span>{copy.question}</span><textarea value={question} onChange={event => setQuestion(event.target.value)} placeholder={copy.placeholder} rows={3}/></label>
          <button className="button reading-draw" onClick={draw}><Sparkles size={16}/>{cards.length ? copy.again : copy.draw}<ArrowUpRight size={16}/></button>
          <p className="reading-privacy">{copy.note}</p>
        </div>
        <div className="reading-table">
          <div className="reading-table-top"><span>{copy.result}</span><span>{cards.length ? `${cards.length} / ${deckCount}` : '✧'}</span></div>
          {cards.length === 0 ? <div className="reading-empty"><div className="reading-back-card"><span>✧</span><i>☾</i><b>ELENA · TAROT</b><small>✦　✧　✦</small></div><p>{copy.focus}</p></div> :
            <div className={`reading-cards-grid count-${cards.length}`} key={drawKey}>
              {cards.map(({card, reversed}, index) => <article className="reading-card-result" key={card.id} style={{animationDelay: `${index * 140}ms`}}>
                <div className="reading-position">{String(index + 1).padStart(2, '0')} <span>{labels[index]}</span></div>
                <button className={revealed ? (reversed ? 'reading-playing-card flipped revealed' : 'reading-playing-card revealed') : 'reading-playing-card'} onClick={() => setRevealed(true)} aria-label={copy.reveal}>
                  <span className="reading-card-back"><i>☾</i><b>ELENA</b><small>✧　✦　✧</small></span>
                  <span className="reading-card-front"><small>{card.arcana === 'major' ? 'MAJOR ARCANA' : 'MINOR ARCANA'}</small><strong>{card.symbol}</strong><b>{card.name[lang]}</b><small>✧　✦　✧</small></span>
                </button>
                {revealed && <div className="reading-card-meaning"><span className="reading-label">{reversed ? copy.reversed : copy.upright}</span><h3>{card.name[lang]}</h3><p>{(reversed ? card.reversed : card.upright)[lang]}</p></div>}
              </article>)}
            </div>}
          {cards.length > 0 && !revealed && <button className="button reading-reveal" onClick={() => setRevealed(true)}>{copy.reveal}<ArrowRight size={16}/></button>}
          {cards.length > 0 && revealed && <button className="underlined-link reading-repeat" onClick={draw}><RotateCcw size={15}/>{copy.again}</button>}
        </div>
      </section>
      <div className="readings-bottom-note">✧ <span>{copy.note}</span> ✧</div>
    </main>
    <footer className="footer readings-footer"><a className="wordmark footer-mark" href={import.meta.env.BASE_URL}><span>ELENA</span><span>BUCHELOVSKAYA</span><small>T A R O T</small></a><div className="footer-center"><span>{lang === 'ru' ? 'Индивидуальные консультации Таро' : 'Personal tarot consultations'}</span><small>© {new Date().getFullYear()} ELENA BUCHELOVSKAYA</small></div><a className="text-link" href={import.meta.env.BASE_URL}><ArrowLeft size={15}/>{copy.back}</a></footer>
  </div>
}
