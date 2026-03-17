import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  living: "https://cdn.poehali.dev/projects/6c550c2e-7d02-4220-9f88-3d3e5d45fc42/files/5dba2310-7dda-45b8-94bf-71924ebc464f.jpg",
  kitchen: "https://cdn.poehali.dev/projects/6c550c2e-7d02-4220-9f88-3d3e5d45fc42/files/1a7a9d71-a52c-42b5-ba05-497a396fa426.jpg",
  bedroom: "https://cdn.poehali.dev/projects/6c550c2e-7d02-4220-9f88-3d3e5d45fc42/files/120919b8-c3bb-42ca-af84-2773f4f86991.jpg",
  dining: "https://cdn.poehali.dev/projects/6c550c2e-7d02-4220-9f88-3d3e5d45fc42/files/b66b5b4e-a468-43bd-a6f5-5df310a344bd.jpg",
  bathroom: "https://cdn.poehali.dev/projects/6c550c2e-7d02-4220-9f88-3d3e5d45fc42/files/f7b09a77-16db-477e-af11-7a928d12338f.jpg",
  portrait: "https://cdn.poehali.dev/projects/6c550c2e-7d02-4220-9f88-3d3e5d45fc42/files/6cdaeda5-555a-4d41-ba76-054d73ad1d35.jpg",
};

const projects = [
  { id: 1, title: "Квартира на Патриарших", area: "120 м²", style: "Современный", room: "Гостиная", img: IMAGES.living, year: "2024" },
  { id: 2, title: "Загородный дом", area: "280 м²", style: "Скандинавский", room: "Кухня", img: IMAGES.dining, year: "2024" },
  { id: 3, title: "Пентхаус в Сити", area: "200 м²", style: "Минимализм", room: "Спальня", img: IMAGES.bedroom, year: "2023" },
  { id: 4, title: "Апартаменты у моря", area: "85 м²", style: "Современный", room: "Кухня", img: IMAGES.kitchen, year: "2023" },
  { id: 5, title: "Таунхаус в Переделкино", area: "160 м²", style: "Эклектика", room: "Ванная", img: IMAGES.bathroom, year: "2023" },
  { id: 6, title: "Студия на Пречистенке", area: "65 м²", style: "Минимализм", room: "Гостиная", img: IMAGES.living, year: "2022" },
];

const styleFilters = ["Все", "Современный", "Скандинавский", "Минимализм", "Эклектика"];
const roomFilters = ["Все помещения", "Гостиная", "Спальня", "Кухня", "Ванная"];

const reviews = [
  { name: "Анна С.", text: "Людмила превратила нашу квартиру в место, куда хочется возвращаться. Она слышит и понимает тебя с полуслова.", role: "Клиент, 2024" },
  { name: "Михаил К.", text: "Результат превзошёл все ожидания. Функциональность и красота в идеальном балансе. Рекомендую без сомнений.", role: "Клиент, 2023" },
  { name: "Елена Р.", text: "Работать с Людмилой — одно удовольствие. Педантичность в деталях и неожиданные решения делают её уникальным профессионалом.", role: "Клиент, 2023" },
];

export default function Index() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [styleFilter, setStyleFilter] = useState("Все");
  const [roomFilter, setRoomFilter] = useState("Все помещения");
  const [activeReview, setActiveReview] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setRingPos({ x: e.clientX, y: e.clientY }), 65);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const addListeners = () => {
      const els = document.querySelectorAll("a, button, .project-card, .filter-btn");
      els.forEach(el => {
        el.addEventListener("mouseenter", () => setIsHover(true));
        el.addEventListener("mouseleave", () => setIsHover(false));
      });
    };
    addListeners();
    const t = setInterval(addListeners, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);

  const filtered = projects.filter(p => {
    const s = styleFilter === "Все" || p.style === styleFilter;
    const r = roomFilter === "Все помещения" || p.room === roomFilter;
    return s && r;
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#0f0d0b", color: "#e8dcc8", minHeight: "100vh" }}>
      {/* Cursor */}
      <div className={`custom-cursor${isHover ? " cursor-hover" : ""}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={`custom-cursor-ring${isHover ? " cursor-hover" : ""}`} style={{ left: ringPos.x, top: ringPos.y }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 2rem", background: "linear-gradient(to bottom, rgba(15,13,11,0.96), transparent)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 28, height: 1, background: "#c9a96e" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#c9a96e", letterSpacing: "0.08em" }}>Людмила</span>
        </div>
        <div className="hidden md:flex" style={{ gap: "2rem" }}>
          {["hero", "portfolio", "about", "reviews", "contacts"].map((id, i) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link">
              {["Главная", "Портфолио", "О мне", "Отзывы", "Контакты"][i]}
            </button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#c9a96e", cursor: "none", background: "none", border: "none" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", background: "rgba(15,13,11,0.97)" }}>
          {["hero", "portfolio", "about", "reviews", "contacts"].map((id, i) => (
            <button key={id} onClick={() => scrollTo(id)} className="nav-link" style={{ fontSize: "0.9rem" }}>
              {["Главная", "Портфолио", "О мне", "Отзывы", "Контакты"][i]}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", paddingBottom: "8vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMAGES.living} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,13,11,0.92) 0%, rgba(15,13,11,0.35) 55%, rgba(15,13,11,0.78) 100%)" }} />
        </div>
        <div style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", writingMode: "vertical-rl", fontFamily: "'Golos Text', sans-serif", fontSize: "0.58rem", letterSpacing: "0.28em", color: "rgba(201,169,110,0.35)", textTransform: "uppercase" }} className="hidden lg:block">
          Интерьерный дизайн · Москва
        </div>

        <div style={{ position: "relative", zIndex: 10, padding: "0 2rem 0 2rem", maxWidth: "900px" }} className="md:pl-16 lg:pl-24">
          <p className="fade-in-up delay-1" style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.62rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "1.5rem" }}>
            Дизайнер интерьера
          </p>
          <h1 className="fade-in-up delay-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", fontWeight: 300, lineHeight: 0.92, color: "#e8dcc8", marginBottom: "2rem" }}>
            Людмила<br />
            <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Создаю</em><br />
            пространства
          </h1>
          <p className="fade-in-up delay-3" style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 300, fontSize: "1rem", color: "rgba(232,220,200,0.6)", maxWidth: 420, lineHeight: 1.9, marginBottom: "2.5rem" }}>
            Каждый проект — это диалог между архитектурой и человеком. Я создаю интерьеры с характером и историей.
          </p>
          <div className="fade-in-up delay-4" style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("portfolio")}
              style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.9rem 2.2rem", background: "#c9a96e", color: "#0f0d0b", fontWeight: 500, cursor: "none", border: "none", transition: "opacity 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Смотреть работы
            </button>
            <button onClick={() => scrollTo("contacts")} className="nav-link" style={{ fontSize: "0.68rem", background: "none", border: "none" }}>
              Написать мне
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="fade-in-up delay-5 hidden md:flex" style={{ position: "absolute", bottom: "2.5rem", right: "2rem", gap: "2.5rem" }}>
          {[["12+", "лет опыта"], ["80+", "проектов"], ["15", "наград"]].map(([num, label]) => (
            <div key={num} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#c9a96e", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(232,220,200,0.35)", marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", padding: "1rem 0", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <div className="marquee-track">
          {Array(10).fill("Дизайн интерьера · Авторские проекты · Жилые пространства · Загородные дома · Коммерческие объекты ·").map((text, i) => (
            <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(201,169,110,0.28)", padding: "0 2.5rem", whiteSpace: "nowrap" }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "6rem 2rem" }} className="md:px-16 lg:px-24">
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a96e" }}>
              Избранные работы
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300, lineHeight: 1.05, color: "#e8dcc8" }}>
              Портфолио
            </h2>
          </div>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "rgba(232,220,200,0.4)", maxWidth: 320, lineHeight: 1.9 }}>
            Каждый проект — уникальная история, рождённая из диалога с клиентом
          </p>
        </div>

        {/* Style filters */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "0.75rem" }}>
          {styleFilters.map(f => (
            <button key={f} className={`filter-btn${styleFilter === f ? " active" : ""}`} onClick={() => setStyleFilter(f)}>{f}</button>
          ))}
        </div>
        {/* Room filters */}
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "3rem" }}>
          {roomFilters.map(f => (
            <button key={f} className={`filter-btn${roomFilter === f ? " active" : ""}`} onClick={() => setRoomFilter(f)}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ padding: "5rem 0", textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontStyle: "italic", color: "rgba(232,220,200,0.25)" }}>
            Нет проектов по выбранным фильтрам
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {filtered.map((project, idx) => (
              <div key={project.id} className="reveal project-card" style={{ height: idx % 3 === 0 ? "420px" : "300px", backgroundColor: "#161310" }}>
                <img src={project.img} alt={project.title} />
                <div className="project-overlay">
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "0.35rem" }}>
                    {project.style} · {project.year}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#e8dcc8", lineHeight: 1.2, marginBottom: "0.25rem" }}>
                    {project.title}
                  </div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.72rem", color: "rgba(232,220,200,0.45)" }}>
                    {project.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(201,169,110,0.1)" }} className="md:px-16 lg:px-24">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }} className="lg:grid-cols-2">
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -20, left: -20, width: "100%", height: "100%", border: "1px solid rgba(201,169,110,0.08)", pointerEvents: "none", zIndex: 0 }} />
            <img src={IMAGES.portrait} alt="Людмила — дизайнер интерьера" style={{ position: "relative", zIndex: 1, width: "100%", height: "520px", objectFit: "cover", filter: "grayscale(12%) contrast(1.04)" }} />
            <div style={{ position: "absolute", bottom: -16, right: -16, padding: "1.1rem 1.6rem", backgroundColor: "#161310", border: "1px solid rgba(201,169,110,0.18)", zIndex: 20 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "#c9a96e", lineHeight: 1 }}>12+</div>
              <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,220,200,0.35)", marginTop: "0.2rem" }}>лет практики</div>
            </div>
          </div>

          <div className="reveal">
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "0.75rem" }}>
              О дизайнере
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#e8dcc8", marginBottom: "1.5rem" }}>
              Людмила<br />
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Козлова</em>
            </h2>
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #c9a96e, transparent)", marginBottom: "1.8rem" }} />
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 300, fontSize: "0.93rem", color: "rgba(232,220,200,0.65)", lineHeight: 2, marginBottom: "1.2rem" }}>
              Я убеждена: хороший интерьер — это не набор красивых предметов, а живая среда, которая отражает личность хозяина. Каждый проект начинается с долгого разговора.
            </p>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 300, fontSize: "0.93rem", color: "rgba(232,220,200,0.45)", lineHeight: 2, marginBottom: "2.5rem" }}>
              Окончила Московский архитектурный институт, прошла стажировку в миланских студиях. Работаю с жилыми и коммерческими проектами по всей России и Европе.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[["Жилых проектов", "65+"], ["Коммерческих", "15+"], ["Стран", "4"], ["Наград", "15"]].map(([label, val]) => (
                <div key={label} style={{ paddingTop: "1rem", borderTop: "1px solid rgba(201,169,110,0.13)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "#c9a96e", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(232,220,200,0.35)", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(201,169,110,0.1)", position: "relative" }} className="md:px-16 lg:px-24">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "0.75rem" }}>
            Клиенты говорят
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300, color: "#e8dcc8" }}>
            Отзывы
          </h2>
        </div>

        <div className="reveal" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ position: "relative", minHeight: "200px" }}>
            {reviews.map((review, idx) => (
              <div key={idx} style={{ position: idx === activeReview ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: idx === activeReview ? 1 : 0, transition: "opacity 0.7s ease", pointerEvents: idx === activeReview ? "auto" : "none" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontStyle: "italic", fontWeight: 300, color: "#e8dcc8", lineHeight: 1.7, textAlign: "center", marginBottom: "2rem" }}>
                  «{review.text}»
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <div style={{ width: 28, height: 1, background: "#c9a96e" }} />
                  <div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.78rem", color: "#c9a96e", textAlign: "center" }}>{review.name}</div>
                    <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", color: "rgba(232,220,200,0.3)", textTransform: "uppercase", textAlign: "center" }}>{review.role}</div>
                  </div>
                  <div style={{ width: 28, height: 1, background: "#c9a96e" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}>
            {reviews.map((_, idx) => (
              <button key={idx} onClick={() => setActiveReview(idx)}
                style={{ cursor: "none", width: idx === activeReview ? 24 : 6, height: 6, background: idx === activeReview ? "#c9a96e" : "rgba(201,169,110,0.22)", transition: "all 0.4s ease", border: "none", borderRadius: 3 }} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "6rem 2rem", borderTop: "1px solid rgba(201,169,110,0.1)" }} className="md:px-16 lg:px-24">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="lg:grid-cols-2">
          <div className="reveal">
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a96e", marginBottom: "0.75rem" }}>
              Начнём диалог
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#e8dcc8", marginBottom: "1.8rem" }}>
              Свяжитесь<br />
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>со мной</em>
            </h2>
            <p style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 300, fontSize: "0.93rem", color: "rgba(232,220,200,0.5)", lineHeight: 2, marginBottom: "2.5rem" }}>
              Расскажите о своём проекте — я отвечу в течение дня и предложу первую консультацию бесплатно.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                { icon: "Phone", label: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "ludmila@design.ru" },
                { icon: "MapPin", label: "Москва, Россия" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, border: "1px solid rgba(201,169,110,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#c9a96e" }}>
                    <Icon name={item.icon} size={15} />
                  </div>
                  <span style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.9rem", color: "rgba(232,220,200,0.65)" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <form style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} onSubmit={e => e.preventDefault()}>
              {["Ваше имя", "Телефон или email"].map(ph => (
                <input key={ph} type="text" placeholder={ph}
                  style={{ width: "100%", background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.18)", padding: "0.9rem 1.2rem", fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "#e8dcc8", outline: "none", transition: "border-color 0.3s ease" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.18)")} />
              ))}
              <textarea placeholder="Расскажите о проекте" rows={5}
                style={{ width: "100%", background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.18)", padding: "0.9rem 1.2rem", fontFamily: "'Golos Text', sans-serif", fontSize: "0.85rem", color: "#e8dcc8", outline: "none", resize: "none", transition: "border-color 0.3s ease" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.18)")} />
              <button type="submit"
                style={{ padding: "1rem 2rem", background: "#c9a96e", color: "#0f0d0b", fontFamily: "'Golos Text', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, border: "none", cursor: "none", transition: "opacity 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem", borderTop: "1px solid rgba(201,169,110,0.1)", display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", justifyContent: "center" }} className="md:flex-row md:justify-between md:px-16 lg:px-24">
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(201,169,110,0.35)" }}>
          Людмила · Дизайнер интерьера
        </div>
        <div style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,220,200,0.18)" }}>
          © 2024 · Все права защищены
        </div>
      </footer>
    </div>
  );
}
