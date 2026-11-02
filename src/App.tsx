import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, BookOpen, Check, ChevronDown, Languages, Menu, MessageCircle, Search, Sparkles, Star, X } from 'lucide-react'
import { tarotDeck, type TarotCard } from './data/tarot'

type Lang = 'ru' | 'en'

const copy = {
  ru: {
    nav: ['Обо мне', 'Консультации', 'Карта дня', 'Расклады', 'Карты Таро', 'Отзывы'],
    book: 'Записаться',
    eyebrow: 'ТАРО · ИНДИВИДУАЛЬНЫЕ КОНСУЛЬТАЦИИ',
    title: 'Посмотрите на свою ситуацию\nпод новым углом.',
    intro: 'Пространство внимательного разговора о том, что действительно важно. Таро помогает исследовать вопросы, увидеть возможные сценарии и яснее сформулировать собственный выбор.',
    explore: 'Выбрать консультацию',
    aboutLabel: 'О ПОДХОДЕ',
    aboutTitle: 'Не готовые ответы.\nНовый взгляд на вопросы.',
    aboutText: 'Каждая ситуация уникальна. В работе я уделяю внимание вашему запросу, контексту и тем деталям, которые помогают увидеть картину шире. Без оценок и давления — в комфортном для вас формате.',
    aboutNote: 'Таро — символический инструмент для размышления, а не гарантия событий или замена профессиональной помощи.',
    servicesLabel: 'НАПРАВЛЕНИЯ',
    servicesTitle: 'С чем можно прийти',
    servicesText: 'Выберите тему, которая сейчас занимает ваши мысли. Вместе определим подходящий формат разбора.',
    details: 'Подробнее',
    items: [
      ['01', 'Отношения и любовь', 'Чувства, динамика отношений, личные границы и варианты дальнейшего диалога.'],
      ['02', 'Самопознание', 'Внутренние противоречия, ресурсы, ценности и то, что важно услышать самому себе.'],
      ['03', 'Работа и финансы', 'Профессиональные решения, перемены, цели и возможные направления движения.'],
      ['04', 'Жизненный выбор', 'Сложная ситуация, несколько вариантов и вопросы, которые стоит прояснить перед решением.'],
      ['05', 'Общий расклад', 'Обзор актуального периода и тем, которым сейчас может быть полезно уделить внимание.'],
    ],
    processLabel: 'КАК ВСЁ ПРОХОДИТ',
    processTitle: 'В удобном для вас формате',
    steps: [['01', 'Запрос', 'Вы рассказываете, что вас волнует, и формулируете вопрос.'], ['02', 'Формат', 'Выбираем онлайн или личную встречу и удобный способ общения.'], ['03', 'Разбор', 'Проводим консультацию и обсуждаем символику расклада в контексте запроса.'], ['04', 'Итог', 'Вы получаете результат в согласованном формате: текст, голос или видео.']],
    dailyLabel: 'НЕБОЛЬШАЯ ПАУЗА ДЛЯ СЕБЯ',
    dailyTitle: 'Карта дня',
    dailyText: 'Символическая подсказка для размышления. Выберите карту и обратите внимание на мысль, которая откликнется именно сегодня.',
    reveal: 'Открыть карту',
    again: 'Выбрать другую',
    reviewsLabel: 'ОТКЛИКИ',
    reviewsTitle: 'Слова тех, кто уже был на консультации',
    reviewsText: 'Здесь будут опубликованы реальные отзывы клиентов с их согласия.',
    bookingLabel: 'ЛИЧНАЯ КОНСУЛЬТАЦИЯ',
    bookingTitle: 'Начните с вашего вопроса.',
    bookingText: 'Расскажите, что вас интересует. Мы уточним детали, подберём формат и согласуем удобное время.',
    bookCta: 'Оставить заявку',
    footer: 'Индивидуальные консультации Таро',
    privacy: 'Таро не является научным методом прогнозирования. Консультации не заменяют медицинскую, психологическую, юридическую или финансовую помощь.',
    modalTitle: 'Запрос на консультацию',
    name: 'Ваше имя',
    contact: 'Как с вами связаться',
    topic: 'Направление',
    format: 'Формат встречи',
    message: 'Ваш вопрос (необязательно)',
    online: 'Онлайн',
    offline: 'Лично',
    send: 'Подготовить заявку',
    close: 'Закрыть',
    notice: 'Форма пока демонстрационная: отправка заявок будет подключена после настройки защищённого обработчика и Telegram.',
    cards: [
      ['Верховная Жрица', 'Тишина помогает услышать то, что теряется в потоке внешних мнений. Дайте себе время прислушаться к ощущениям и не торопитесь с выводами.'],
      ['Звезда', 'Смотрите на ситуацию с перспективой. Маленький последовательный шаг сегодня может оказаться важнее резкого решения.'],
      ['Справедливость', 'Попробуйте отделить факты от предположений. Честный взгляд на обстоятельства помогает принимать более взвешенные решения.'],
      ['Умеренность', 'Не всё требует немедленного ответа. Иногда полезнее найти баланс и позволить разным частям ситуации занять своё место.'],
      ['Отшельник', 'Небольшая пауза и время наедине с собой могут помочь понять, чего хотите именно вы, а не окружающие.'],
      ['Сила', 'Мягкость и устойчивость могут быть сильнее давления. Подумайте, где сегодня важно проявить терпение к себе.'],
    ],
  },
  en: {
    nav: ['About', 'Consultations', 'Card of the day', 'Readings', 'Tarot library', 'Reviews'],
    book: 'Book a session',
    eyebrow: 'TAROT · PERSONAL CONSULTATIONS',
    title: 'See your situation\nfrom a new perspective.',
    intro: 'A thoughtful space to explore what matters to you. Tarot can help examine a question, consider possible scenarios and clarify your own choices.',
    explore: 'Explore consultations',
    aboutLabel: 'THE APPROACH',
    aboutTitle: 'Not ready-made answers.\nA fresh perspective.',
    aboutText: 'Every situation is unique. I focus on your question, its context and the details that may help you see a wider picture. No judgement or pressure — we choose a format that feels comfortable for you.',
    aboutNote: 'Tarot is a symbolic tool for reflection, not a guarantee of events or a substitute for professional advice.',
    servicesLabel: 'CONSULTATION TOPICS',
    servicesTitle: 'What would you like to explore?',
    servicesText: 'Choose a topic that is on your mind. We will find a suitable consultation format together.',
    details: 'Learn more',
    items: [
      ['01', 'Love & relationships', 'Feelings, relationship dynamics, personal boundaries and possible ways forward.'],
      ['02', 'Self-discovery', 'Inner conflicts, personal resources, values and what you need to hear from yourself.'],
      ['03', 'Work & finances', 'Career decisions, transitions, goals and possible directions.'],
      ['04', 'Life decisions', 'A difficult situation, different options and questions to clarify before deciding.'],
      ['05', 'General reading', 'A reflective overview of your current period and themes worth your attention.'],
    ],
    processLabel: 'HOW IT WORKS',
    processTitle: 'A format that works for you',
    steps: [['01', 'Your question', 'Tell me what is on your mind and what you would like to explore.'], ['02', 'The format', 'Choose online or in-person and a convenient way to communicate.'], ['03', 'The reading', 'We explore the spread and its symbolism in the context of your question.'], ['04', 'The outcome', 'Receive the reading in an agreed format: text, voice or video.']],
    dailyLabel: 'A MOMENT FOR YOURSELF',
    dailyTitle: 'Card of the day',
    dailyText: 'A symbolic prompt for reflection. Choose a card and notice the thought that resonates with you today.',
    reveal: 'Reveal your card',
    again: 'Choose another',
    reviewsLabel: 'KIND WORDS',
    reviewsTitle: 'Words from past clients',
    reviewsText: 'Real client feedback will be published here with their permission.',
    bookingLabel: 'PERSONAL CONSULTATION',
    bookingTitle: 'Start with your question.',
    bookingText: 'Tell me what you would like to explore. We will discuss the details, choose a format and find a convenient time.',
    bookCta: 'Send an enquiry',
    footer: 'Personal tarot consultations',
    privacy: 'Tarot is not a scientifically validated forecasting method. Consultations do not replace medical, psychological, legal or financial advice.',
    modalTitle: 'Consultation enquiry',
    name: 'Your name',
    contact: 'How can I reach you?',
    topic: 'Topic',
    format: 'Meeting format',
    message: 'Your question (optional)',
    online: 'Online',
    offline: 'In person',
    send: 'Prepare enquiry',
    close: 'Close',
    notice: 'This is a demo form. Enquiry delivery will be enabled after the secure endpoint and Telegram integration are configured.',
    cards: [
      ['The High Priestess', 'Silence can help you hear what gets lost in outside opinions. Give yourself time to notice your feelings before drawing conclusions.'],
      ['The Star', 'Look at the situation with perspective. A small, consistent step today may matter more than a sudden decision.'],
      ['Justice', 'Try to separate facts from assumptions. An honest look at the circumstances can support a more balanced decision.'],
      ['Temperance', 'Not everything needs an immediate answer. Sometimes it is more useful to restore balance and let things settle.'],
      ['The Hermit', 'A pause and some time with yourself may help you understand what you want, rather than what others expect.'],
      ['Strength', 'Gentleness and steadiness can be stronger than pressure. Consider where patience with yourself is needed today.'],
    ],
  },
}

const symbols = ['☾', '✧', '✦', '☼', '✧']

function App() {
  const [lang, setLang] = useState<Lang>('ru')
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [spreadSize, setSpreadSize] = useState<1 | 3 | 5>(1)
  const [spreadCards, setSpreadCards] = useState<{ card: TarotCard; reversed: boolean }[]>([])
  const [form, setForm] = useState({ name: '', contact: '', topicIndex: 0, format: 'online' as 'online' | 'offline', message: '' })
  const [formFeedback, setFormFeedback] = useState('')
  const [libraryQuery, setLibraryQuery] = useState('')
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'major' | 'minor'>('all')
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const t = copy[lang]
  const todayIndex = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const day = Math.floor((now.getTime() - start.getTime()) / 86400000)
    return day % t.cards.length
  }, [t.cards])
  useEffect(() => {
    if (!modalOpen && !selectedCard) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalOpen(false)
        setSelectedCard(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalOpen, selectedCard])

  const activeCard = t.cards[cardIndex]
  const filteredDeck = useMemo(() => tarotDeck.filter(card => {
    const matchesQuery = `${card.name.ru} ${card.name.en} ${card.suit || ''}`.toLowerCase().includes(libraryQuery.trim().toLowerCase())
    return matchesQuery && (libraryFilter === 'all' || card.arcana === libraryFilter)
  }), [libraryQuery, libraryFilter])

  const drawSpread = () => {
    const pool = [...tarotDeck]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    setSpreadCards(pool.slice(0, spreadSize).map(card => ({ card, reversed: Math.random() < 0.5 })))
  }

  const openBooking = (topic?: string) => {
    if (topic) {
      const topicIndex = t.items.findIndex(item => item[1] === topic)
      if (topicIndex >= 0) setForm(current => ({ ...current, topicIndex }))
    }
    setFormFeedback('')
    setModalOpen(true)
    setMenuOpen(false)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const prepareEnquiry = async () => {
    const body = lang === 'ru' ? [
      'Заявка на консультацию Елены Бучеловской',
      `Имя: ${form.name}`,
      `Контакт: ${form.contact}`,
      `Направление: ${t.items[form.topicIndex][1]}`,
      `Формат: ${form.format === 'online' ? t.online : t.offline}`,
      `Вопрос: ${form.message || 'Не указан'}`,
    ].join('\n') : [
      'Consultation enquiry — Elena Buchelovskaya',
      `Name: ${form.name}`,
      `Contact: ${form.contact}`,
      `Topic: ${t.items[form.topicIndex][1]}`,
      `Format: ${form.format === 'online' ? t.online : t.offline}`,
      `Question: ${form.message || 'Not provided'}`,
    ].join('\n')
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(body)
      setFormFeedback(lang === 'ru' ? 'Заявка скопирована. Перейдите в Telegram и отправьте её Елене.' : 'Enquiry copied. Open Telegram and send it to Elena.')
    } catch {
      setFormFeedback(lang === 'ru' ? 'Не удалось скопировать автоматически. Разрешите доступ к буферу обмена и повторите попытку.' : 'Could not copy automatically. Allow clipboard access and try again.')
    }
  }

  return (
    <div className="site-shell">
      <div className="topline"><span>ELENA BUCHELOVSKAYA</span><span>PERSONAL TAROT · {lang === 'ru' ? 'КОНСУЛЬТАЦИИ' : 'CONSULTATIONS'}</span><span>EST. IN PRESENCE</span></div>
      <header className="header">
        <a className="wordmark" href="#top" onClick={() => scrollTo('top')} aria-label="Elena Buchelovskaya home">
          <span>ELENA</span><span>BUCHELOVSKAYA</span><small>T A R O T</small>
        </a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {t.nav.map((item, i) => <button key={item} onClick={() => scrollTo(['about', 'services', 'daily', 'spreads', 'library', 'reviews'][i])}>{item}</button>)}
        </nav>
        <div className="header-actions">
          <button className="language" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} aria-label="Switch language"><Languages size={15}/>{lang.toUpperCase()}</button>
          <button className="button button-small" onClick={() => openBooking()}>{t.book}<ArrowUpRight size={14}/></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" aria-hidden="true">
            <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
            <div className="hero-moon">☾</div>
            <div className="tarot-art">
              <div className="tarot-frame"><span className="card-corner">✧</span><span className="card-number">II</span><div className="card-sun">☼</div><div className="card-figure">☾</div><div className="card-stars">✦　✧　✦</div><span className="card-name">THE HIGH PRIESTESS</span><span className="card-corner bottom">✧</span></div>
            </div>
            <div className="hero-caption"><span>FIG. 01</span><span>THE LANGUAGE OF SYMBOLS</span></div>
          </div>
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/>{t.eyebrow}</div>
            <h1>{t.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions"><button className="button" onClick={() => scrollTo('services')}>{t.explore}<ArrowUpRight size={16}/></button><button className="text-link" onClick={() => scrollTo('about')}>{lang === 'ru' ? 'Узнать о подходе' : 'Discover the approach'} <ArrowDown size={15}/></button></div>
            <div className="hero-footnote"><span>01 / 05</span><span>{lang === 'ru' ? 'ВНИМАНИЕ К ВАШЕМУ ЗАПРОСУ' : 'ATTENTION TO YOUR QUESTION'}</span></div>
          </div>
          <div className="vertical-note">A PERSONAL SPACE FOR REFLECTION</div>
        </section>

        <section className="intro-section section-wrap" id="about">
          <div className="section-kicker"><span>01</span><span>{t.aboutLabel}</span></div>
          <div className="intro-grid">
            <div className="intro-heading"><span className="ornament">✳</span><h2>{t.aboutTitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</h2></div>
            <div className="intro-body"><p>{t.aboutText}</p><p className="muted-note">{t.aboutNote}</p><button className="underlined-link" onClick={() => openBooking()}>{lang === 'ru' ? 'Обсудить ваш запрос' : 'Discuss your question'} <ArrowUpRight size={15}/></button></div>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <div className="section-kicker"><span>02</span><span>{t.servicesLabel}</span></div>
          <div className="section-heading"><div><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div><span className="section-mark">✳</span></div>
          <div className="service-list">
            {t.items.map((item) => <button className="service-row" key={item[0]} onClick={() => openBooking(item[1])}><span className="service-no">{item[0]}</span><span className="service-title">{item[1]}</span><span className="service-desc">{item[2]}</span><span className="service-arrow"><ArrowUpRight size={19}/></span></button>)}
          </div>
        </section>

        <section className="process-section">
          <div className="section-wrap">
            <div className="section-kicker"><span>03</span><span>{t.processLabel}</span></div>
            <h2>{t.processTitle}</h2>
            <div className="process-grid">{t.steps.map((step, i) => <article className="process-step" key={step[0]}><span className="process-no">{step[0]}</span><div className="process-icon">{[<MessageCircle/>, <ChevronDown/>, <Sparkles/>, <Check/>][i]}</div><h3>{step[1]}</h3><p>{step[2]}</p></article>)}</div>
          </div>
        </section>

        <section className="daily-section section-wrap" id="daily">
          <div className="daily-copy"><div className="section-kicker"><span>04</span><span>{t.dailyLabel}</span></div><h2>{t.dailyTitle}</h2><p>{t.dailyText}</p><div className="daily-date">{new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</div></div>
          <div className="daily-interaction">
            <button className={revealed ? 'daily-card revealed' : 'daily-card'} onClick={() => setRevealed(true)} aria-label={t.reveal}>
              <span className="daily-card-inner">
                <span className="daily-card-face daily-card-front"><span className="daily-card-border"><span className="daily-card-top">✧　✦　✧</span><span className="daily-card-symbol">☾</span><span className="daily-card-center">ELENA · TAROT</span><span className="daily-card-bottom">✦　☼　✦</span></span></span>
                <span className="daily-card-face daily-card-back"><span className="daily-card-border"><span className="daily-card-top">✧　✦　✧</span><span className="daily-card-symbol">{symbols[cardIndex % symbols.length]}</span><span className="daily-card-center">{activeCard[0]}</span><span className="daily-card-bottom">✦　☼　✦</span></span></span>
              </span>
            </button>
            {revealed ? <div className="card-reading"><span className="reading-label">{lang === 'ru' ? 'ВАША КАРТА' : 'YOUR CARD'}</span><h3>{activeCard[0]}</h3><p>{activeCard[1]}</p><button className="underlined-link" onClick={() => { setCardIndex((cardIndex + 1) % t.cards.length); setRevealed(true) }}>{t.again}<ArrowUpRight size={15}/></button></div> : <button className="button" onClick={() => { setCardIndex(todayIndex); setRevealed(true) }}>{t.reveal}<Sparkles size={15}/></button>}
          </div>
        </section>

        
        <section className="spreads-section section-wrap" id="spreads">
          <div className="section-kicker"><span>05</span><span>{lang === 'ru' ? 'ИНСТРУМЕНТ ДЛЯ РАЗМЫШЛЕНИЯ' : 'A SPACE FOR REFLECTION'}</span></div>
          <div className="spreads-heading">
            <div><h2>{lang === 'ru' ? 'Расклад Таро' : 'Tarot readings'}</h2><p>{lang === 'ru' ? 'Выберите количество карт. Каждая карта вытягивается случайно, без повторов в одном раскладе.' : 'Choose how many cards to draw. Cards are selected randomly without repeats in a reading.'}</p></div>
            <span className="section-mark">✧</span>
          </div>
          <div className="spread-controls">
            <div className="spread-sizes" role="group" aria-label={lang === 'ru' ? 'Количество карт' : 'Number of cards'}>
              {([1, 3, 5] as const).map(size => <button key={size} className={spreadSize === size ? 'spread-size active' : 'spread-size'} onClick={() => { setSpreadSize(size); setSpreadCards([]) }}>{size} <span>{lang === 'ru' ? (size === 1 ? 'карта' : size === 3 ? 'карты' : 'карт') : (size === 1 ? 'card' : 'cards')}</span></button>)}
            </div>
            <button className="button" onClick={drawSpread}><Sparkles size={15}/>{lang === 'ru' ? (spreadCards.length ? 'Новый расклад' : 'Вытянуть карты') : (spreadCards.length ? 'New reading' : 'Draw cards')}<ArrowUpRight size={15}/></button>
          </div>
          {spreadCards.length > 0 ? <div className={spreadCards.length === 1 ? 'spread-results single' : 'spread-results'}>
            {spreadCards.map(({card,reversed},index) => <article className="spread-result" key={card.id}>
              <div className={reversed ? 'spread-card reversed' : 'spread-card'}>
                <span className="spread-card-index">{String(index + 1).padStart(2,'0')}</span>
                <span className="spread-card-symbol">{card.symbol}</span>
                <span className="spread-card-name">{card.name[lang]}</span>
                <span className="spread-card-arcana">{card.arcana === 'major' ? (lang === 'ru' ? 'СТАРШИЙ АРКАН' : 'MAJOR ARCANA') : (lang === 'ru' ? 'МЛАДШИЙ АРКАН' : 'MINOR ARCANA')}</span>
              </div>
              <div className="spread-meaning"><span className="reading-label">{lang === 'ru' ? (reversed ? 'ПЕРЕВЁРНУТОЕ ПОЛОЖЕНИЕ' : 'ПРЯМОЕ ПОЛОЖЕНИЕ') : (reversed ? 'REVERSED POSITION' : 'UPRIGHT POSITION')}</span><h3>{card.name[lang]}</h3><p>{(reversed ? card.reversed : card.upright)[lang]}</p></div>
            </article>)}
          </div> : <div className="spread-empty"><span>✧</span><p>{lang === 'ru' ? 'Сосредоточьтесь на своём вопросе и нажмите «Вытянуть карты».' : 'Focus on your question and select “Draw cards”.'}</p></div>}
          <p className="spread-disclaimer">{lang === 'ru' ? 'Трактовки носят символический характер и предназначены для саморефлексии. Они не предсказывают события и не заменяют профессиональную консультацию.' : 'Interpretations are symbolic prompts for self-reflection. They do not predict events or replace professional advice.'}</p>
        </section>

        <section className="library-section section-wrap" id="library">
          <div className="section-kicker"><span>06</span><span>{lang === 'ru' ? 'ЭНЦИКЛОПЕДИЯ ТАРО' : 'TAROT ENCYCLOPEDIA'}</span></div>
          <div className="section-heading"><div><h2>{lang === 'ru' ? 'Все 78 карт колоды' : 'All 78 cards'}</h2><p>{lang === 'ru' ? 'Изучите символику, прямые и перевёрнутые значения Старших и Младших арканов.' : 'Explore the symbolism and upright or reversed meanings of the Major and Minor Arcana.'}</p></div><BookOpen className="section-mark"/></div>
          <div className="library-tools">
            <label className="library-search"><Search size={17}/><input value={libraryQuery} onChange={event => setLibraryQuery(event.target.value)} aria-label={lang === 'ru' ? 'Поиск по картам Таро' : 'Search tarot cards'} placeholder={lang === 'ru' ? 'Найти карту…' : 'Search cards…'} /></label>
            <div className="library-filters" role="group" aria-label={lang === 'ru' ? 'Фильтр карт' : 'Card filter'}>
              {(['all', 'major', 'minor'] as const).map(filter => <button key={filter} className={libraryFilter === filter ? 'active' : ''} onClick={() => setLibraryFilter(filter)}>{lang === 'ru' ? (filter === 'all' ? 'Все карты' : filter === 'major' ? 'Старшие арканы' : 'Младшие арканы') : (filter === 'all' ? 'All cards' : filter === 'major' ? 'Major Arcana' : 'Minor Arcana')}</button>)}
            </div>
          </div>
          <div className="library-count">{lang === 'ru' ? 'Найдено карт' : 'Cards found'} · {filteredDeck.length} / 78</div>
          <div className="library-grid">
            {filteredDeck.map(card => <button className="library-card" key={card.id} onClick={() => setSelectedCard(card)}>
              <span className="library-card-symbol">{card.symbol}</span><span className="library-card-name">{card.name[lang]}</span><small>{card.arcana === 'major' ? (lang === 'ru' ? 'СТАРШИЙ АРКАН' : 'MAJOR ARCANA') : (lang === 'ru' ? 'МЛАДШИЙ АРКАН' : 'MINOR ARCANA')}</small><span className="library-card-open"><ArrowUpRight size={15}/></span>
            </button>)}
            {filteredDeck.length === 0 && <p className="library-empty">{lang === 'ru' ? 'Карты не найдены. Попробуйте изменить запрос.' : 'No cards found. Try another search.'}</p>}
          </div>
        </section>

        <section className="reviews-section section-wrap" id="reviews">
          <div className="section-kicker"><span>07</span><span>{t.reviewsLabel}</span></div>
          <div className="reviews-content"><span className="quote-mark">“</span><h2>{t.reviewsTitle}</h2><p>{t.reviewsText}</p><div className="review-placeholder"><span><Star/><Star/><Star/><Star/><Star/></span><small>{lang === 'ru' ? 'МЕСТО ДЛЯ РЕАЛЬНЫХ ОТЗЫВОВ' : 'SPACE FOR VERIFIED TESTIMONIALS'}</small></div></div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-glow"/>
          <div className="booking-inner"><div className="section-kicker"><span>08</span><span>{t.bookingLabel}</span></div><h2>{t.bookingTitle}</h2><p>{t.bookingText}</p><button className="button button-light" onClick={() => openBooking()}>{t.bookCta}<ArrowUpRight size={16}/></button></div>
          <div className="booking-deco">✳</div>
        </section>
      </main>

      <footer className="footer">
        <a className="wordmark footer-mark" href="#top"><span>ELENA</span><span>BUCHELOVSKAYA</span><small>T A R O T</small></a>
        <div className="footer-center"><span>{t.footer}</span><small>© {new Date().getFullYear()} ELENA BUCHELOVSKAYA</small></div>
        <div className="footer-right"><button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>{lang.toUpperCase()} <Languages size={14}/></button><a href="#booking">{t.book}</a></div>
        <p className="disclaimer">{t.privacy}</p>
      </footer>

      {selectedCard && <div className="modal-backdrop library-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedCard(null) }}><div className="library-modal" role="dialog" aria-modal="true" aria-labelledby="library-modal-title"><button className="modal-close" onClick={() => setSelectedCard(null)} aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}><X/></button><div className="library-modal-art"><span>{selectedCard.symbol}</span><small>{selectedCard.arcana === 'major' ? 'MAJOR ARCANA' : 'MINOR ARCANA'}</small></div><div className="library-modal-copy"><div className="section-kicker"><span>✧</span><span>{lang === 'ru' ? 'ЗНАЧЕНИЕ КАРТЫ' : 'CARD MEANING'}</span></div><h2 id="library-modal-title">{selectedCard.name[lang]}</h2><h3>{lang === 'ru' ? 'Прямое положение' : 'Upright position'}</h3><p>{selectedCard.upright[lang]}</p><h3>{lang === 'ru' ? 'Перевёрнутое положение' : 'Reversed position'}</h3><p>{selectedCard.reversed[lang]}</p><button className="button" onClick={() => { setSelectedCard(null); openBooking() }}>{lang === 'ru' ? 'Обсудить карту на консультации' : 'Discuss this card in a session'}<ArrowUpRight size={15}/></button></div></div></div>}
      {modalOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false) }}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setModalOpen(false)} aria-label={t.close}><X/></button><div className="section-kicker"><span>✳</span><span>ELENA BUCHELOVSKAYA</span></div><h2 id="modal-title">{t.modalTitle}</h2><form onSubmit={e => { e.preventDefault(); prepareEnquiry() }}><label>{t.name}<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})}/></label><label>{t.contact}<input required value={form.contact} onChange={e => setForm({...form, contact:e.target.value})} placeholder="@username / phone"/></label><label>{t.topic}<select value={String(form.topicIndex)} onChange={e => setForm({...form, topicIndex:Number(e.target.value)})}>{t.items.map((item, index) => <option key={item[0]} value={index}>{item[1]}</option>)}</select></label><label>{t.format}<select value={form.format} onChange={e => setForm({...form, format:e.target.value as 'online' | 'offline'})}><option value="online">{t.online}</option><option value="offline">{t.offline}</option></select></label><label>{t.message}<textarea rows={3} value={form.message} onChange={e => setForm({...form, message:e.target.value})}/></label><button className="button modal-submit" type="submit">{t.send}<ArrowUpRight size={15}/></button><p className="form-notice" aria-live="polite">{formFeedback || t.notice}</p>{formFeedback && <a className="button modal-submit" href="https://t.me/YOURMANIFESTOR" target="_blank" rel="noreferrer">{lang === 'ru' ? 'Перейти в Telegram Елены' : 'Open Elena’s Telegram'}<ArrowUpRight size={15}/></a>}</form></div></div>}
    </div>
  )
}

export default App
