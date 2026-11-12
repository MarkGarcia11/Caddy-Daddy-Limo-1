import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  BOOKED_DATES,
  cars,
  faqs,
  gallery,
  journeySteps,
  occasions,
  packages,
  photos,
  reviews,
  SITE_CONFIG,
  type Photo,
} from "./content";

type BookingPrefill = {
  occasion?: string;
  carId?: string;
  date?: string;
  packageName?: string;
};

type EnquiryFields = {
  occasion: string;
  eventDate: string;
  guests: string;
  pickup: string;
  dropoff: string;
  carId: string;
  packageName: string;
  extras: string[];
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type ShareDetails = {
  title: string;
  text: string;
  url: string;
};

const DEFAULT_SHARE_URL = "https://caddydaddylimo.com/";
const FAVORITES_KEY = "caddy-daddy-favorites";
const ENQUIRIES_KEY = "caddy-daddy-enquiries";
const NEWSLETTER_KEY = "caddy-daddy-newsletter";

function pexelsUrl(photo: Photo, width: number) {
  const extension = photo.extension ?? "jpeg";
  return `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.${extension}?auto=compress&cs=tinysrgb&w=${width}`;
}

function PexelsImage({
  photo,
  className,
  slot,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  photo: Photo;
  className?: string;
  slot?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={pexelsUrl(photo, priority ? 1800 : 1200)}
      srcSet={`${pexelsUrl(photo, 640)} 640w, ${pexelsUrl(photo, 960)} 960w, ${pexelsUrl(photo, 1440)} 1440w, ${pexelsUrl(photo, 2000)} 2000w`}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      data-image-slot={slot}
    />
  );
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand-mark${inverse ? " brand-mark-inverse" : ""}`} href="#home" aria-label="Caddy Daddy Limo home">
      <span className="brand-emblem" aria-hidden="true">
        <CarFront size={24} strokeWidth={1.45} />
      </span>
      <span className="brand-copy">
        <span className="brand-name">Caddy Daddy</span>
        <span className="brand-tag">Classic car limousines</span>
      </span>
    </a>
  );
}

function InstagramGlyph() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.7" r=".9" className="social-fill" /></svg>;
}

function FacebookGlyph() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.1 21v-8.2h2.8l.42-3.2H14.1V7.55c0-.93.26-1.56 1.6-1.56h1.7V3.12A22 22 0 0 0 14.92 3c-2.45 0-4.12 1.5-4.12 4.24V9.6H8.03v3.2h2.77V21h3.3Z" className="social-fill" /></svg>;
}

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduced = useReducedMotion();
  const start = direction === "left" ? -28 : direction === "right" ? 28 : 0;
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: direction === "up" ? 24 : 0, x: start }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.76, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={`section-heading section-heading-${align} section-heading-${tone} ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title-mask">
          <motion.span
            initial={reduced ? false : { y: "105%", letterSpacing: "0.035em" }}
            whileInView={{ y: "0%", letterSpacing: "-0.025em" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.span>
        </h2>
        {description && <p className="section-description">{description}</p>}
      </Reveal>
    </div>
  );
}

function RoadLine() {
  const reduced = useReducedMotion();
  return (
    <div className="road-line" aria-hidden="true">
      <span className="road-rule" />
      <motion.svg
        className="road-car"
        viewBox="0 0 64 32"
        fill="none"
        initial={reduced ? { x: 0 } : { x: "-4%" }}
        whileInView={{ x: "92%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M9 21.5h45l-3-8.2a4 4 0 0 0-3.7-2.6H22.1a6 6 0 0 0-4.7 2.2L12 19.4H8a2 2 0 0 0-2 2v2h4.5" fill="currentColor" />
        <path d="M21 11.2h22.5l2.1 7H14.7l4.2-5.3a2.7 2.7 0 0 1 2.1-1.7Z" fill="var(--ivory)" opacity=".9" />
        <circle cx="18" cy="24" r="4" fill="var(--navy)" />
        <circle cx="46" cy="24" r="4" fill="var(--navy)" />
        <circle cx="18" cy="24" r="1.7" fill="var(--gold-light)" />
        <circle cx="46" cy="24" r="1.7" fill="var(--gold-light)" />
        <path d="M7 20h4M53 20h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}

function TopProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function Header({
  scrolled,
  menuOpen,
  setMenuOpen,
  onBook,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  onBook: () => void;
}) {
  const reduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>("button, a[href]")?.focus();
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab" || !menu) return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"));
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault();
        focusable[0].focus();
      }
    };
    document.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeyDown);
      previousFocus?.focus();
    };
  }, [menuOpen]);
  const links = [
    ["The fleet", "#fleet"],
    ["Occasions", "#occasions"],
    ["The experience", "#experience"],
    ["Pricing", "#pricing"],
    ["Our story", "#about"],
  ];

  return (
    <>
      <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
        <div className="header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <a className="nav-link" href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-contact" href={`tel:${SITE_CONFIG.phoneHref}`} aria-label={`Call ${SITE_CONFIG.phoneDisplay}`}>
              <Phone size={15} /> <span>Call</span>
            </a>
            <a className="header-contact" href={`sms:${SITE_CONFIG.phoneHref}`} aria-label="Text Caddy Daddy Limo">
              <MessageCircle size={15} /> <span>Text</span>
            </a>
            <button className="button button-gold header-book" onClick={onBook} type="button">
              Check availability <ArrowUpRight size={16} />
            </button>
          </div>
          <button
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation menu"
            initial={reduced ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-top">
              <BrandMark inverse />
              <button className="icon-button mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" type="button">
                <X size={23} />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={reduced ? false : { opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.035 * index, duration: 0.28 }}
                >
                  <span>0{index + 1}</span>{label}<ArrowUpRight size={19} />
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                <span>06</span>Contact<ArrowUpRight size={19} />
              </a>
            </nav>
            <div className="mobile-menu-bottom">
              <a href={`tel:${SITE_CONFIG.phoneHref}`}><Phone size={18} /> Call Ed</a>
              <a href={`sms:${SITE_CONFIG.phoneHref}`}><MessageCircle size={18} /> Send a text</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ModalShell({
  children,
  onClose,
  label,
  eyebrow,
  wide = false,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  eyebrow?: string;
  wide?: boolean;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusable = panel?.querySelector<HTMLElement>("button, a[href], input, select, textarea, [tabindex='0']");
    focusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex='0']"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, []);

  return (
    <motion.div
      className="modal-backdrop"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        className={`modal-panel${wide ? " modal-panel-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        initial={reduced ? false : { opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal-topline">
          <span className="eyebrow">{eyebrow ?? "Caddy Daddy Limo"}</span>
          <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close dialog">
            <X size={21} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function localDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function AvailabilityCalendar({
  onChooseDate,
}: {
  onChooseDate: (date: string) => void;
}) {
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selected, setSelected] = useState("");
  const today = localDate(new Date());
  const firstWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const label = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(month);

  function moveMonth(amount: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }

  return (
    <div className="availability-calendar" aria-label="Informational availability calendar">
      <div className="calendar-top">
        <div>
          <p className="eyebrow">A date worth keeping</p>
          <h3>Check the calendar</h3>
        </div>
        <CalendarDays size={21} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <div className="calendar-month">
        <button className="icon-button calendar-arrow" type="button" onClick={() => moveMonth(-1)} aria-label="Previous month">
          <ChevronLeft size={19} />
        </button>
        <span aria-live="polite">{label}</span>
        <button className="icon-button calendar-arrow" type="button" onClick={() => moveMonth(1)} aria-label="Next month">
          <ChevronRight size={19} />
        </button>
      </div>
      <div className="calendar-grid calendar-weekdays" aria-hidden="true">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className="calendar-grid calendar-days">
        {cells.map((day, index) => {
          if (!day) return <span className="calendar-empty" key={`empty-${index}`} aria-hidden="true" />;
          const date = localDate(new Date(month.getFullYear(), month.getMonth(), day));
          const booked = BOOKED_DATES.includes(date);
          const past = date < today;
          const isSelected = selected === date;
          return (
            <button
              className={`calendar-day${isSelected ? " is-selected" : ""}${booked ? " is-booked" : ""}${past ? " is-past" : ""}`}
              type="button"
              key={date}
              disabled={past || booked}
              aria-label={`${label.split(" ")[0]} ${day}${booked ? ", marked booked" : ""}${past ? ", past date" : ""}`}
              aria-pressed={isSelected}
              onClick={() => {
                setSelected(date);
                onChooseDate(date);
              }}
              title={booked ? "Marked as booked" : past ? "Past date" : "Ask us to confirm this date"}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="calendar-legend">
        <span><i className="legend-dot legend-open" /> Ask us to confirm</span>
        <span><i className="legend-dot legend-booked" /> Marked booked</span>
      </div>
      <p className="calendar-note">A date is not held until we confirm it with you.</p>
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setCount(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, reduced, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TrustSection() {
  const facts = [
    { value: 1, suffix: "", title: "familiar face", text: "One owner-led point of contact from the first hello." },
    { value: 0, suffix: "", title: "surprise add-ons", text: "A clear written quote before you decide." },
    { value: 2, suffix: "", title: "sets of eyes", text: "We welcome the partner, parent, and planner into the details." },
  ];

  return (
    <section className="trust-section" aria-label="A few reassuring details">
      <div className="trust-inner page-shell">
        <div className="trust-intro">
          <p className="eyebrow">A little peace of mind</p>
          <h2>Pretty is lovely.<br /><em>Prepared</em> is better.</h2>
        </div>
        <div className="trust-facts">
          {facts.map((fact, index) => (
            <Reveal className="trust-fact" delay={index * 0.08} key={fact.title}>
              <span className="trust-number"><Counter value={fact.value} suffix={fact.suffix} /></span>
              <div>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="trust-note"><ShieldCheck size={18} /> Licensed and commercially insured. Current documentation available on request.</div>
      </div>
    </section>
  );
}

function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const reduced = useReducedMotion();

  return (
    <section className="journey-section" id="experience" ref={sectionRef} aria-label="Your experience, from arrival to memory">
      <div className="journey-sticky">
        <div className="journey-topline">
          <p className="eyebrow">A little more than a ride</p>
          <span>Scroll to take the scenic route <ArrowRight size={16} /></span>
        </div>
        <motion.div className="journey-track" style={{ x: reduced ? 0 : x }}>
          {journeySteps.map((step, index) => (
            <article className="journey-panel" key={step.number}>
              <PexelsImage photo={step.photo} className="journey-image" slot={`journey-${step.number}`} sizes="100vw" />
              <div className="journey-shade" />
              <div className="journey-copy">
                <span className="journey-index">{step.number} <i /> The experience</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                <div className="journey-progress" aria-label={`Chapter ${index + 1} of ${journeySteps.length}`}>
                  {journeySteps.map((item) => <span key={item.number} className={item.number === step.number ? "is-current" : ""} />)}
                </div>
              </div>
              <span className="journey-side-note">{index === 0 ? "Arrive" : index === 1 ? "Breathe" : index === 2 ? "Remember" : "Keep it"}</span>
            </article>
          ))}
        </motion.div>
        <div className="journey-bottomline">
          <span>Made of small moments.</span>
          <span>Swipe or scroll <ArrowRight size={15} /></span>
        </div>
      </div>
    </section>
  );
}

function Footer({
  onBook,
  onLegal,
  onShare,
  onToast,
}: {
  onBook: () => void;
  onLegal: (page: string) => void;
  onShare: (details: ShareDetails) => void;
  onToast: (message: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "done">("idle");

  async function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
    const entry = { email, createdAt: new Date().toISOString() };
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        if (!response.ok) throw new Error("Newsletter endpoint unavailable");
      } else {
        const existing = JSON.parse(localStorage.getItem(NEWSLETTER_KEY) ?? "[]") as typeof entry[];
        localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([...existing, entry]));
      }
      setNewsletterState("done");
      setEmail("");
      onToast(endpoint ? "Lovely. You are on the list." : "Thanks. Connect the newsletter endpoint to receive sign-ups.");
    } catch {
      onToast("We could not add you just now. Please try again in a moment.");
    }
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top page-shell">
        <div className="footer-newsletter">
          <div>
            <p className="eyebrow">Notes from the passenger seat</p>
            <h2>A little more <em>occasion</em> in your inbox.</h2>
            <p>Good stories, seasonal dates, and the odd bit of chrome. Never a full inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={submitNewsletter}>
            <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              autoComplete="email"
              required
            />
            <button type="submit" aria-label="Sign up for the newsletter" disabled={newsletterState === "done"}>
              {newsletterState === "done" ? <Check size={19} /> : <ArrowRight size={20} />}
            </button>
          </form>
        </div>
        <div className="footer-columns">
          <div className="footer-brand-column">
            <BrandMark inverse />
            <p>Chrome, charm, and a little bit of mischief. For the days you will tell stories about.</p>
            <div className="footer-socials">
              <a href={SITE_CONFIG.instagram} target="_blank" rel="noreferrer" aria-label="Visit Instagram"><InstagramGlyph /></a>
              <a href={SITE_CONFIG.facebook} target="_blank" rel="noreferrer" aria-label="Visit Facebook"><FacebookGlyph /></a>
              <button type="button" onClick={() => onShare({ title: "Caddy Daddy Limo", text: "Classic Cadillac charm for the days that matter.", url: DEFAULT_SHARE_URL })} aria-label="Share Caddy Daddy Limo"><Share2 size={18} /></button>
            </div>
          </div>
          <div className="footer-column">
            <h3>The cars</h3>
            {cars.map((car) => <a href="#fleet" key={car.id}>{car.name}</a>)}
            <a href="#fleet">See the whole fleet <ArrowUpRight size={13} /></a>
          </div>
          <div className="footer-column">
            <h3>Good occasions</h3>
            {occasions.slice(0, 5).map((occasion) => <a href="#occasions" key={occasion.id}>{occasion.title}</a>)}
          </div>
          <div className="footer-column">
            <h3>Make a plan</h3>
            <a href="#experience">Your experience</a>
            <a href="#pricing">Pricing guidance</a>
            <a href="#plan">Plan your day</a>
            <a href="#faq">Questions & answers</a>
            <button type="button" onClick={onBook}>Check availability</button>
          </div>
          <div className="footer-column footer-contact-column">
            <h3>Say hello</h3>
            <a href={`tel:${SITE_CONFIG.phoneHref}`}>{SITE_CONFIG.phoneDisplay}</a>
            <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
            <p><MapPin size={14} /> {SITE_CONFIG.serviceArea}</p>
            <p><Clock3 size={14} /> {SITE_CONFIG.hours}</p>
          </div>
        </div>
        <div className="footer-trustline">
          <span><ShieldCheck size={15} /> Licensed & commercially insured</span>
          <span>Current documents available on request</span>
          <span className="footer-legal-links">
            <button onClick={() => onLegal("privacy")} type="button">Privacy</button>
            <button onClick={() => onLegal("terms")} type="button">Terms</button>
            <button onClick={() => onLegal("cancellation")} type="button">Cancellation</button>
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="page-shell footer-bottom-inner">
          <span>© {new Date().getFullYear()} Caddy Daddy Limo. Made for the memories.</span>
          <span>Serving {SITE_CONFIG.city} and nearby communities.</span>
          <a href="#home" className="back-to-top" aria-label="Back to top">Back to top <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  );
}

function BookingDialog({
  prefill,
  onClose,
  onToast,
}: {
  prefill: BookingPrefill;
  onClose: () => void;
  onToast: (message: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<"endpoint" | "supabase" | "local">("local");
  const today = localDate(new Date());
  const [form, setForm] = useState<EnquiryFields>(() => ({
    occasion: prefill.occasion ?? "",
    eventDate: prefill.date ?? "",
    guests: "2",
    pickup: "",
    dropoff: "",
    carId: prefill.carId ?? "",
    packageName: prefill.packageName ?? "",
    extras: [],
    name: "",
    email: "",
    phone: "",
    notes: "",
  }));
  const reduced = useReducedMotion();
  const totalSteps = 3;
  const activeCar = cars.find((car) => car.id === form.carId);

  function updateField<K extends keyof EnquiryFields>(field: K, value: EnquiryFields[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (!form.occasion) return "Choose the occasion first. We will take it from there.";
      if (!form.eventDate) return "Add the date so we can check the right day.";
      if (form.eventDate < today) return "That date has already been. Try a future date.";
      if (!form.guests || Number(form.guests) < 1) return "Add at least one passenger.";
    }
    if (step === 1) {
      if (!form.pickup.trim()) return "Where should the Cadillac meet you?";
      if (!form.dropoff.trim()) return "Add a drop-off location, even if it is still a best guess.";
    }
    if (step === 2) {
      if (!form.name.trim()) return "Tell us who we are planning with.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Add a valid email address so we can reply.";
      if (form.phone.replace(/\D/g, "").length < 7) return "Add a phone number, in case a quick question is easier.";
    }
    return "";
  }

  function goNext() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSending(true);
    setError("");
    const record = {
      ...form,
      preferredCar: activeCar?.name ?? "No preference",
      createdAt: new Date().toISOString(),
    };
    const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        if (!response.ok) throw new Error("The booking service returned an error.");
        setDeliveryMode("endpoint");
      } else if (supabaseUrl && supabaseKey) {
        const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/enquiries`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            occasion: form.occasion,
            event_date: form.eventDate,
            guest_count: form.guests,
            pickup_location: form.pickup,
            dropoff_location: form.dropoff,
            preferred_car: activeCar?.name ?? null,
            package_name: form.packageName || null,
            extras: form.extras,
            full_name: form.name,
            email: form.email,
            phone: form.phone,
            notes: form.notes || null,
            created_at: record.createdAt,
          }),
        });
        if (!response.ok) throw new Error("Supabase could not save the enquiry.");
        setDeliveryMode("supabase");
      } else {
        const existing = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) ?? "[]") as typeof record[];
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify([...existing, record]));
        setDeliveryMode("local");
      }
      setStep(totalSteps);
      onToast(endpoint ? "Enquiry sent. We will be in touch soon." : supabaseUrl && supabaseKey ? "Your enquiry has been saved securely." : "Your details are ready. Send them to Ed by email to finish the hand-off.");
    } catch {
      setError("We could not send that just now. Your details are still here. Please try again or call us.");
    } finally {
      setSending(false);
    }
  }

  const mailSubject = encodeURIComponent(`Caddy Daddy Limo enquiry: ${form.occasion} on ${form.eventDate}`);
  const mailBody = encodeURIComponent(
    `Hello Ed,\n\nI'd love to check availability.\n\nOccasion: ${form.occasion}\nDate: ${form.eventDate}\nGuests: ${form.guests}\nPickup: ${form.pickup}\nDrop-off: ${form.dropoff}\nPreferred car: ${activeCar?.name ?? "No preference"}\nPackage: ${form.packageName || "Not sure yet"}\nExtras: ${form.extras.join(", ") || "None selected"}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nNotes: ${form.notes || "None"}\n\nThank you!`,
  );

  return (
    <ModalShell label="Check availability form" onClose={onClose} eyebrow="A good day starts here" wide>
      <div className="booking-heading">
        <p className="eyebrow">A few friendly details</p>
        <h2>{step === totalSteps ? "Lovely. We have a starting point." : "Let's make a plan."}</h2>
        <p>{step === totalSteps ? "No pressure. Just the first step toward a very good entrance." : "Tell us a little about the day. You can change the details later."}</p>
      </div>
      {step < totalSteps && (
        <>
          <div className="form-progress" aria-label={`Step ${step + 1} of ${totalSteps}`}>
            <div className="form-progress-track"><motion.span animate={{ width: `${((step + 1) / totalSteps) * 100}%` }} transition={{ duration: 0.4 }} /></div>
            <span>Step {step + 1} of {totalSteps}</span>
          </div>
          <form onSubmit={submitEnquiry} noValidate>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div className="form-step" key="step-1" initial={reduced ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.24 }}>
                  <h3>First, the good part.</h3>
                  <div className="form-grid">
                    <label className="field-wrap">
                      <span>What are we celebrating?</span>
                      <select value={form.occasion} onChange={(event) => updateField("occasion", event.target.value)}>
                        <option value="">Choose an occasion</option>
                        {occasions.map((occasion) => <option key={occasion.id} value={occasion.title}>{occasion.title}</option>)}
                        <option value="Something else">Something else</option>
                      </select>
                      <ChevronDown className="field-chevron" size={16} aria-hidden="true" />
                    </label>
                    <label className="field-wrap">
                      <span>When is the big day?</span>
                      <input type="date" value={form.eventDate} min={today} onChange={(event) => updateField("eventDate", event.target.value)} />
                    </label>
                    <label className="field-wrap">
                      <span>How many passengers?</span>
                      <select value={form.guests} onChange={(event) => updateField("guests", event.target.value)}>
                        {[1, 2, 3].map((count) => <option value={count} key={count}>{count} {count === 1 ? "passenger" : "passengers"}</option>)}
                        <option value="4+">4 or more — let's talk</option>
                      </select>
                      <ChevronDown className="field-chevron" size={16} aria-hidden="true" />
                    </label>
                    {form.packageName && <p className="prefill-note"><Sparkles size={15} /> Interested in <strong>{form.packageName}</strong>. We will include it in the conversation.</p>}
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div className="form-step" key="step-2" initial={reduced ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.24 }}>
                  <h3>Where should the story start?</h3>
                  <div className="form-grid">
                    <label className="field-wrap"><span>Pickup location</span><input value={form.pickup} onChange={(event) => updateField("pickup", event.target.value)} placeholder="Venue, hotel, or address" autoComplete="street-address" /></label>
                    <label className="field-wrap"><span>Drop-off location</span><input value={form.dropoff} onChange={(event) => updateField("dropoff", event.target.value)} placeholder="Where are we taking you?" /></label>
                    <label className="field-wrap">
                      <span>Any car catching your eye?</span>
                      <select value={form.carId} onChange={(event) => updateField("carId", event.target.value)}>
                        <option value="">Help me choose</option>
                        {cars.map((car) => <option value={car.id} key={car.id}>{car.name} · {car.year} {car.model}</option>)}
                      </select>
                      <ChevronDown className="field-chevron" size={16} aria-hidden="true" />
                    </label>
                    <fieldset className="extras-field">
                      <legend>Anything extra for the occasion?</legend>
                      <div className="extra-options">
                        {["Ribbons", "A toast", "Red carpet", "Extra photo stops"].map((extra) => {
                          const checked = form.extras.includes(extra);
                          return (
                            <label className={`check-option${checked ? " is-checked" : ""}`} key={extra}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => updateField("extras", checked ? form.extras.filter((item) => item !== extra) : [...form.extras, extra])}
                              />
                              <span className="fake-check"><Check size={13} /></span>{extra}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                  <p className="form-small-note">Extras are planned in advance and confirmed in your quote.</p>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div className="form-step" key="step-3" initial={reduced ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.24 }}>
                  <h3>And who should we say hello to?</h3>
                  <div className="form-grid">
                    <label className="field-wrap"><span>Your name</span><input value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" /></label>
                    <label className="field-wrap"><span>Email address</span><input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" /></label>
                    <label className="field-wrap"><span>Phone number</span><input type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" /></label>
                    <label className="field-wrap field-wrap-wide"><span>Anything else we should know?</span><textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="A timeline, a photo stop, a special request..." rows={3} /></label>
                  </div>
                  <p className="form-small-note">Your details are only used to reply about this enquiry.</p>
                </motion.div>
              )}
            </AnimatePresence>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="form-actions">
              {step > 0 ? <button type="button" className="text-button" onClick={() => { setError(""); setStep((current) => current - 1); }}><ArrowLeft size={16} /> Back</button> : <span className="form-security"><ShieldCheck size={15} /> No obligation. Just a clear answer.</span>}
              {step < totalSteps - 1 ? (
                <button type="button" className="button button-burgundy" onClick={goNext}>Next step <ArrowRight size={17} /></button>
              ) : (
                <button type="submit" className="button button-burgundy" disabled={sending}>{sending ? "Sending..." : "Send my enquiry"} {!sending && <Send size={16} />}</button>
              )}
            </div>
          </form>
        </>
      )}
      {step === totalSteps && (
        <motion.div className="booking-success" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="success-seal"><Check size={26} /></div>
          <div className="success-confetti" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--piece": index } as React.CSSProperties} />)}</div>
          {deliveryMode !== "local" ? (
            <>
              <p>Your enquiry is on its way. We will be in touch with a clear quote and next steps.</p>
              <div className="success-summary"><span>{form.occasion}</span><span>{form.eventDate}</span><span>{activeCar?.name ?? "Car to be chosen"}</span></div>
              <button className="button button-burgundy" onClick={onClose} type="button">Wonderful <Check size={17} /></button>
            </>
          ) : (
            <>
              <p>Your details are saved on this device. Send them to Ed by email to finish the hand-off.</p>
              <div className="success-summary"><span>{form.occasion}</span><span>{form.eventDate}</span><span>{activeCar?.name ?? "Car to be chosen"}</span></div>
              <div className="success-actions">
                <a className="button button-burgundy" href={`mailto:${SITE_CONFIG.email}?subject=${mailSubject}&body=${mailBody}`}>Email these details <Mail size={17} /></a>
                <a className="text-button" href={`tel:${SITE_CONFIG.phoneHref}`}>Or call Ed <Phone size={15} /></a>
              </div>
            </>
          )}
          <p className="success-footnote">{deliveryMode === "endpoint" ? "A date is only held once we have confirmed it together." : deliveryMode === "supabase" ? "Your request is saved. Ed will follow up after checking the date." : "Online delivery is not connected yet. Your email app will send the request directly."}</p>
        </motion.div>
      )}
    </ModalShell>
  );
}

function ShareDialog({
  details,
  onClose,
  onToast,
}: {
  details: ShareDetails;
  onClose: () => void;
  onToast: (message: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const message = `${details.text} ${details.url}`;
  const encodedMessage = encodeURIComponent(message);

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(details.url);
      } else {
        const input = document.createElement("textarea");
        input.value = details.url;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setCopied(true);
      onToast("Link copied. Send it to your co-pilot.");
    } catch {
      onToast("Copy did not work. You can still share by text or email.");
    }
  }

  return (
    <ModalShell label="Share this page" onClose={onClose} eyebrow="For your co-pilot">
      <div className="share-dialog-content">
        <p className="eyebrow">Pass the good bit along</p>
        <h2>{details.title}</h2>
        <p>{details.text}</p>
        <div className="share-url"><span>{details.url}</span><button type="button" onClick={copyLink} aria-label="Copy page link">{copied ? <Check size={18} /> : <Copy size={18} />}</button></div>
        <div className="share-options">
          <a href={`https://wa.me/?text=${encodedMessage}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
          <a href={`sms:?body=${encodedMessage}`}><Phone size={17} /> Text</a>
          <a href={`mailto:?subject=${encodeURIComponent(details.title)}&body=${encodedMessage}`}><Mail size={18} /> Email</a>
          <button type="button" onClick={() => { void copyLink(); }}><Share2 size={18} /> {copied ? "Copied" : "Copy link"}</button>
        </div>
        {navigator.share && (
          <button className="share-native" type="button" onClick={() => { void navigator.share?.({ title: details.title, text: details.text, url: details.url }).catch(() => undefined); }}>
            Share from this device <ArrowUpRight size={16} />
          </button>
        )}
      </div>
    </ModalShell>
  );
}

function LegalDialog({ page, onClose }: { page: string; onClose: () => void }) {
  const copy: Record<string, { title: string; paragraphs: string[] }> = {
    privacy: {
      title: "Privacy, kept simple.",
      paragraphs: [
        "We use the details you share to answer your enquiry, plan your ride, and send a note you have asked to receive. We do not sell personal information.",
        "This site stores saved cars, cookie preferences, and an unsubmitted enquiry locally in your browser. If a secure form or newsletter service is connected, those details are sent to the provider named in the final service configuration.",
        "For a copy, correction, or deletion request, write to hello@caddydaddylimo.com. This draft should be reviewed and updated to match the final booking and analytics services before launch.",
      ],
    },
    terms: {
      title: "The small print, in plain English.",
      paragraphs: [
        "A website enquiry is a request to check a date, not a confirmed booking. Your date is held only after we have confirmed availability and both sides have accepted the written booking details.",
        "Vehicle choice, passenger capacity, travel area, timing, route, and optional extras are confirmed in your quote. Photos are representative until replaced with current photographs of the actual fleet.",
        "Final service terms, insurance details, and local requirements should be included in the written agreement supplied by Caddy Daddy Limo.",
      ],
    },
    cancellation: {
      title: "Plans can change. We understand.",
      paragraphs: [
        "Deposit, rescheduling, cancellation, and refund terms are shared in writing before a booking is confirmed. Please check those terms before paying a deposit.",
        "If your plans change, call or email as soon as you can. We will talk through the date, what has already been arranged, and any options available under your booking agreement.",
        "The exact policy and time windows should be completed by the owner and reviewed before this page is published.",
      ],
    },
  };
  const selected = copy[page] ?? copy.privacy;

  return (
    <ModalShell label={selected.title} onClose={onClose} eyebrow="The important details">
      <div className="legal-content">
        <h2>{selected.title}</h2>
        {selected.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <a className="text-link" href={`mailto:${SITE_CONFIG.email}`}>Ask a question <ArrowUpRight size={15} /></a>
      </div>
    </ModalShell>
  );
}

function App() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill>({});
  const [shareDetails, setShareDetails] = useState<ShareDetails | null>(null);
  const [legalPage, setLegalPage] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(() => {
    const requestedCar = new URLSearchParams(window.location.search).get("car");
    return cars.some((car) => car.id === requestedCar) ? requestedCar! : cars[0].id;
  });
  const [selectedCarPhoto, setSelectedCarPhoto] = useState(0);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const sharedList = new URLSearchParams(window.location.search).get("shortlist");
      if (sharedList) {
        const sharedIds = sharedList.split(",").filter((id) => cars.some((car) => car.id === id));
        if (sharedIds.length) return sharedIds;
      }
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
    } catch {
      return [];
    }
  });
  const [galleryCategory, setGalleryCategory] = useState("All moments");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [toast, setToast] = useState("");
  const [cookieVisible, setCookieVisible] = useState(() => localStorage.getItem("caddy-daddy-cookie-choice") !== "accepted");
  const [dateForEnquiry, setDateForEnquiry] = useState("");
  const [hornOn, setHornOn] = useState(false);
  const touchStart = useRef<number | null>(null);
  const [testimonialWindow, setTestimonialWindow] = useState(false);
  const activeCar = cars.find((car) => car.id === selectedCarId) ?? cars[0];

  const visibleGallery = useMemo(
    () => galleryCategory === "All moments" ? gallery : gallery.filter((item) => item.category === galleryCategory),
    [galleryCategory],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.title = window.location.pathname === "/" || window.location.pathname === "/index.html"
      ? "Caddy Daddy Limo | Make an Entrance. Make a Memory."
      : "Page not found | Caddy Daddy Limo";
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? current : (current + 1) % visibleGallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? current : (current - 1 + visibleGallery.length) % visibleGallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, visibleGallery.length]);

  useEffect(() => {
    const reviewsVisible = document.querySelector("#reviews");
    if (!reviewsVisible || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setTestimonialWindow(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(reviewsVisible);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!testimonialWindow || reduced) return;
    const interval = window.setInterval(() => setReviewIndex((index) => (index + 1) % reviews.length), 7000);
    return () => window.clearInterval(interval);
  }, [testimonialWindow, reduced]);

  const announce = (message: string) => setToast(message);

  function openBooking(prefill: BookingPrefill = {}) {
    setBookingPrefill(prefill);
    setMenuOpen(false);
    setBookingOpen(true);
  }

  function openShare(details: ShareDetails) {
    setShareDetails(details);
  }

  function shareCurrentPage() {
    openShare({
      title: "Caddy Daddy Limo",
      text: "You're not just getting a ride. You're making an entrance. Have a look with me?",
      url: window.location.href || DEFAULT_SHARE_URL,
    });
  }

  function shareShortlist() {
    const chosenCars = cars.filter((car) => favorites.includes(car.id));
    const text = chosenCars.length
      ? `My Caddy Daddy shortlist: ${chosenCars.map((car) => `${car.name} (${car.year} ${car.model})`).join(", ")}. Which one do you love?`
      : "I found a classic Cadillac limousine for our big day. Have a look with me?";
    const url = chosenCars.length
      ? `${window.location.origin}/?car=${chosenCars[0].id}&shortlist=${chosenCars.map((car) => car.id).join(",")}#fleet`
      : `${window.location.origin}/#fleet`;
    openShare({ title: "Our Caddy Daddy shortlist", text, url });
  }

  function toggleFavorite(carId: string) {
    const isSaved = favorites.includes(carId);
    setFavorites((current) => isSaved ? current.filter((id) => id !== carId) : [...current, carId]);
    announce(isSaved ? "Removed from your shortlist." : "Saved for your co-pilot to see.");
  }

  function chooseCar(carId: string) {
    setSelectedCarId(carId);
    setSelectedCarPhoto(0);
  }

  function nextPhoto() {
    setSelectedCarPhoto((index) => (index + 1) % activeCar.photos.length);
  }

  function previousPhoto() {
    setSelectedCarPhoto((index) => (index - 1 + activeCar.photos.length) % activeCar.photos.length);
  }

  function handleCarPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    touchStart.current = event.clientX;
  }

  function handleCarPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (touchStart.current === null) return;
    const difference = event.clientX - touchStart.current;
    if (Math.abs(difference) > 46) difference > 0 ? previousPhoto() : nextPhoto();
    touchStart.current = null;
  }

  function handleCarTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    touchStart.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleCarTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    if (touchStart.current === null) return;
    const difference = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    if (Math.abs(difference) > 46) difference > 0 ? previousPhoto() : nextPhoto();
    touchStart.current = null;
  }

  function changeReview(direction: number) {
    setReviewIndex((current) => (current + direction + reviews.length) % reviews.length);
  }

  function acceptCookies() {
    localStorage.setItem("caddy-daddy-cookie-choice", "accepted");
    setCookieVisible(false);
  }

  function playHorn() {
    const turningOn = !hornOn;
    setHornOn(turningOn);
    if (turningOn) {
      try {
        const context = new window.AudioContext();
        const output = context.createGain();
        const now = context.currentTime;
        output.gain.setValueAtTime(0.0001, now);
        output.gain.exponentialRampToValueAtTime(0.045, now + 0.025);
        output.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
        output.connect(context.destination);
        [392, 494].forEach((frequency) => {
          const tone = context.createOscillator();
          tone.type = "triangle";
          tone.frequency.setValueAtTime(frequency, now);
          tone.connect(output);
          tone.start(now);
          tone.stop(now + 0.25);
        });
        window.setTimeout(() => { void context.close(); }, 400);
      } catch {
        announce("Sound is not available in this browser.");
        return;
      }
      announce("A little toot for the road. Horn is now on.");
    } else {
      announce("Horn sound is off.");
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: SITE_CONFIG.name,
        url: "https://caddydaddylimo.com/",
        telephone: SITE_CONFIG.phoneHref,
        email: SITE_CONFIG.email,
        description: "Owner-led classic Cadillac limousine service for weddings and special occasions.",
        areaServed: SITE_CONFIG.serviceArea,
        priceRange: "$$",
      },
      {
        "@type": "Service",
        name: "Classic car limousine and wedding transportation",
        serviceType: "Chauffeur-driven classic Cadillac transportation",
        provider: { "@type": "LocalBusiness", name: SITE_CONFIG.name },
        areaServed: SITE_CONFIG.serviceArea,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      ...reviews.filter((review) => review.verified).map((review) => ({
        "@type": "Review",
        reviewBody: review.quote,
        author: { "@type": "Person", name: review.name },
        itemReviewed: { "@type": "LocalBusiness", name: SITE_CONFIG.name },
      })),
    ],
  };

  if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
    return <NotFound />;
  }

  const currentReview = reviews[reviewIndex];
  const activeGalleryItem = lightboxIndex === null ? null : visibleGallery[lightboxIndex];

  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <a href="#main" className="skip-link">Skip to content</a>
      <TopProgress />
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onBook={() => openBooking()} />

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <PexelsImage photo={photos.hero} className="hero-image" slot="hero" priority sizes="100vw" />
          <div className="hero-wash" />
          <div className="hero-grain" />
          <div className="hero-content page-shell">
            <motion.p
              className="hero-overline"
              initial={reduced ? false : { opacity: 0, y: 13, letterSpacing: "0.28em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >Caddy Daddy Limo</motion.p>
            <motion.div
              className="hero-brand-display"
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >Caddy Daddy</motion.div>
            <h1 id="hero-title" className="hero-title">
              <motion.span initial={reduced ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}>Make an <em>Entrance.</em></motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}>Make a <em>Memory.</em></motion.span>
            </h1>
            <motion.p className="hero-promise" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.68 }}>
              You are not just getting a ride.<br className="hero-mobile-break" /> You are making an entrance.
            </motion.p>
            <motion.div className="hero-actions" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.8 }}>
              <button className="button button-gold button-large" onClick={() => openBooking()} type="button">Check availability <ArrowUpRight size={18} /></button>
              <a className="button button-ghost button-large" href="#fleet">Meet the fleet <ArrowDown size={17} /></a>
            </motion.div>
          </div>
          <div className="hero-bottom page-shell" aria-hidden="true">
            <span>Classic Cadillac elegance</span>
            <span className="hero-bottom-line" />
            <span>Made for the moment</span>
          </div>
        </section>

        <section className="intro-section section-pad" id="intro">
          <div className="intro-layout page-shell">
            <div className="intro-copy">
              <SectionHeading
                eyebrow="Not just transportation"
                title={<>It is not the ride.<br />It is the <em>moment.</em></>}
                description="The hush before the door opens. The chrome catching the light. Someone you love seeing you arrive. That is the part we are here for."
              />
              <RoadLine />
              <Reveal delay={0.1}>
                <p className="intro-pullquote">Every great day deserves a <em>grand arrival.</em></p>
                <a className="text-link" href="#experience">See how it feels <ArrowUpRight size={16} /></a>
              </Reveal>
            </div>
            <Reveal className="intro-photo-wrap" direction="right">
              <div className="photo-curtain">
                <PexelsImage photo={photos.introduction} className="intro-photo" slot="intro-detail" sizes="(max-width: 760px) 100vw, 46vw" />
                <span className="photo-warmth" />
              </div>
              <p className="photo-caption"><span>01 / 04</span> Chrome in the last light of the day.</p>
            </Reveal>
          </div>
        </section>

        <section className="occasions-section section-pad" id="occasions">
          <div className="page-shell">
            <div className="occasions-heading-row">
              <SectionHeading
                eyebrow="A good reason is any reason"
                title={<>For the days that<br /><em>stay with you.</em></>}
                description="A wedding, a milestone, or a Tuesday that could use a little more sparkle."
              />
              <Reveal className="occasion-side-note" direction="right">
                <Sparkles size={22} strokeWidth={1.4} />
                <p>Pick the occasion.<br />We will help with the entrance.</p>
              </Reveal>
            </div>
            <div className="occasion-grid">
              {occasions.map((occasion, index) => (
                <motion.button
                  className={`occasion-item occasion-item-${index + 1}`}
                  type="button"
                  key={occasion.id}
                  onClick={() => openBooking({ occasion: occasion.title })}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{ duration: 0.68, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reduced ? undefined : { y: -4 }}
                >
                  <PexelsImage photo={occasion.photo} className="occasion-image" slot={`occasion-${occasion.id}`} sizes="(max-width: 760px) 100vw, 33vw" />
                  <span className="occasion-shade" />
                  <span className="occasion-index">0{index + 1}</span>
                  <span className="occasion-copy"><strong>{occasion.title}</strong><span>{occasion.note}</span></span>
                  <span className="occasion-arrow"><ArrowUpRight size={18} /></span>
                </motion.button>
              ))}
            </div>
            <p className="occasion-footnote">Something we have not thought of? <button className="inline-button" type="button" onClick={() => openBooking({ occasion: "Something else" })}>Tell us about it <ArrowUpRight size={14} /></button></p>
          </div>
        </section>

        <section className="fleet-section section-pad" id="fleet">
          <div className="page-shell">
            <div className="fleet-topline">
              <SectionHeading
                eyebrow="Three lovely ways to arrive"
                title={<>Meet the <em>cars.</em></>}
                description="Old-school lines. Lovely details. A different kind of first impression."
              />
              <Reveal className="fleet-shortlist" direction="right">
                <button className="shortlist-button" type="button" onClick={shareShortlist}>
                  <Heart size={17} fill={favorites.length ? "currentColor" : "none"} />
                  <span>{favorites.length ? `Your shortlist (${favorites.length})` : "Send your shortlist"}</span>
                  <ArrowUpRight size={16} />
                </button>
              </Reveal>
            </div>
            <div className="fleet-viewer">
              <div className="fleet-image-side">
                <div
                  className="fleet-main-image"
                  onPointerDown={handleCarPointerDown}
                  onPointerUp={handleCarPointerUp}
                  onPointerCancel={() => { touchStart.current = null; }}
                  onTouchStart={handleCarTouchStart}
                  onTouchEnd={handleCarTouchEnd}
                  aria-label="Car photo gallery. Swipe or use the photo controls."
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      className="fleet-image-inner"
                      key={`${activeCar.id}-${selectedCarPhoto}`}
                      initial={reduced ? false : { opacity: 0, scale: 1.025 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.995 }}
                      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <PexelsImage photo={activeCar.photos[selectedCarPhoto]} className="fleet-photo" slot={`fleet-${activeCar.id}-${selectedCarPhoto + 1}`} sizes="(max-width: 760px) 100vw, 58vw" />
                    </motion.div>
                  </AnimatePresence>
                  <span className="fleet-image-grain" aria-hidden="true" />
                  <button className={`favorite-button${favorites.includes(activeCar.id) ? " is-favorite" : ""}`} type="button" onClick={() => toggleFavorite(activeCar.id)} aria-label={favorites.includes(activeCar.id) ? `Remove ${activeCar.name} from favorites` : `Save ${activeCar.name} to favorites`} aria-pressed={favorites.includes(activeCar.id)}>
                    <Heart size={20} fill={favorites.includes(activeCar.id) ? "currentColor" : "none"} />
                    <span>{favorites.includes(activeCar.id) ? "Saved" : "Save this car"}</span>
                  </button>
                  <div className="fleet-image-controls">
                    <span>{String(selectedCarPhoto + 1).padStart(2, "0")} <i>/</i> {String(activeCar.photos.length).padStart(2, "0")}</span>
                    <button className="icon-button image-arrow" type="button" onClick={previousPhoto} aria-label="Previous car photo"><ArrowLeft size={18} /></button>
                    <button className="icon-button image-arrow" type="button" onClick={nextPhoto} aria-label="Next car photo"><ArrowRight size={18} /></button>
                  </div>
                </div>
                <div className="fleet-photo-dots" aria-label="Choose a car photograph">
                  {activeCar.photos.map((photo, index) => (
                    <button className={index === selectedCarPhoto ? "is-active" : ""} key={`${photo.id}-${index}`} type="button" onClick={() => setSelectedCarPhoto(index)} aria-label={`Show photo ${index + 1}`} aria-pressed={index === selectedCarPhoto} />
                  ))}
                </div>
              </div>
              <div className="fleet-details">
                <div className="car-selector" role="tablist" aria-label="Choose a classic car">
                  {cars.map((car) => (
                    <button role="tab" aria-selected={activeCar.id === car.id} className={activeCar.id === car.id ? "is-active" : ""} key={car.id} type="button" onClick={() => chooseCar(car.id)}>
                      <span>{car.name}</span><i />
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div className="car-copy" key={activeCar.id} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32 }}>
                    <p className="eyebrow">{activeCar.year} · {activeCar.color}</p>
                    <h3>{activeCar.model}</h3>
                    <p className="car-tagline">{activeCar.tagline}</p>
                    <p className="car-description">{activeCar.description}</p>
                    <div className="car-capacity"><Users size={17} /><span>Up to {activeCar.capacity} passengers</span><i /> <span>Private chauffeur</span></div>
                    <ul className="car-features">
                      {activeCar.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}
                    </ul>
                    <div className="car-actions">
                      <button type="button" className="button button-burgundy" onClick={() => openBooking({ carId: activeCar.id })}>Check this car <ArrowUpRight size={17} /></button>
                      <button className="circle-share" type="button" aria-label={`Share ${activeCar.name}`} onClick={() => openShare({ title: activeCar.name, text: `${activeCar.year} ${activeCar.model} in ${activeCar.color}. ${activeCar.tagline}`, url: `${window.location.origin}/?car=${activeCar.id}#fleet` })}><Share2 size={18} /></button>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="fleet-note"><span className="gold-dot" /> Cars are lovingly maintained. Specific vehicle and passenger capacity are confirmed with your quote.</p>
              </div>
            </div>
          </div>
        </section>

        <JourneySection />
        <TrustSection />

        <section className="pricing-section section-pad" id="pricing">
          <div className="page-shell">
            <SectionHeading
              eyebrow="Clear numbers. No awkward surprises."
              title={<>A little guidance<br />on <em>the investment.</em></>}
              description="Classic car service is planned around your date, route, and the time you need. Here is a helpful place to start."
              align="center"
            />
            <div className="pricing-grid">
              {packages.map((pack, index) => (
                <Reveal className={`price-option${pack.featured ? " price-option-featured" : ""}`} delay={index * 0.09} key={pack.id}>
                  {pack.featured && <span className="price-featured-label"><Sparkles size={14} /> A favorite for weddings</span>}
                  <p className="eyebrow">{pack.duration}</p>
                  <h3>{pack.name}</h3>
                  <div className="price-number"><span>From</span> {pack.startingAt}<i>+</i></div>
                  <p className="price-description">{pack.description}</p>
                  <ul>{pack.includes.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                  <button className="text-link" type="button" onClick={() => openBooking({ occasion: pack.id === "wedding-day" ? "Weddings" : "Special occasion", packageName: pack.name })}>Ask about this package <ArrowUpRight size={16} /></button>
                </Reveal>
              ))}
            </div>
            <p className="pricing-footnote"><ShieldCheck size={16} /> Each quote is written around your route, time, and car. Travel, waiting time, and add-ons are confirmed before you book. Rates shown are guide prices; your written quote is final.</p>
            <div className="pricing-answer"><span>Not sure what you need?</span><a className="text-link" href="#faq">See the pricing questions <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="reviews-section section-pad" id="reviews">
          <div className="review-sunwash" aria-hidden="true" />
          <div className="review-layout page-shell">
            <div className="review-aside">
              <p className="eyebrow">A note from the back seat</p>
              <h2>Good days have a way of <em>sticking.</em></h2>
              <p>Little things become the stories you tell again and again. We like being part of those.</p>
              <a className="text-link" href={`https://www.google.com/search?q=${encodeURIComponent(`Caddy Daddy Limo reviews ${SITE_CONFIG.city}`)}`} target="_blank" rel="noreferrer">Read guest reviews <ExternalLink size={15} /></a>
            </div>
            <div className="review-main">
              <div className="review-ornament" aria-hidden="true"><span /><Sparkles size={15} /><span /></div>
              <AnimatePresence mode="wait">
                <motion.div className="review-quote-wrap" key={reviewIndex} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.42 }}>
                  <ReadAlong quote={currentReview.quote} />
                  <div className="review-credit"><span className="review-mark">“</span><div><strong>{currentReview.name}</strong><span>{currentReview.occasion}</span></div></div>
                </motion.div>
              </AnimatePresence>
              <div className="review-controls">
                <span>0{reviewIndex + 1} <i>/</i> 0{reviews.length}</span>
                <div>
                  <button className="icon-button review-arrow" type="button" onClick={() => changeReview(-1)} aria-label="Previous review"><ArrowLeft size={18} /></button>
                  <button className="icon-button review-arrow" type="button" onClick={() => changeReview(1)} aria-label="Next review"><ArrowRight size={18} /></button>
                </div>
              </div>
              <p className="review-placeholder-note">Sample review copy shown in this preview. Replace with verified guest feedback before publishing.</p>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-layout page-shell">
            <Reveal className="about-photo-side" direction="left">
              <div className="about-image-wrap">
                <PexelsImage photo={photos.owner} className="about-image" slot="owner-portrait" sizes="(max-width: 760px) 100vw, 46vw" />
                <span className="about-photo-veil" />
                <div className="owner-caption"><span className="owner-caption-mark">CD</span><span>Owner portrait slot<br /><strong>Replace with Ed's real photo</strong></span></div>
              </div>
            </Reveal>
            <div className="about-copy">
              <SectionHeading
                eyebrow="A good car needs a good story"
                title={<>Meet Ed.<br /><em>He gets it.</em></>}
                description="Ed built Caddy Daddy around a simple idea: the car is only half of it. The other half is how people feel when the door opens."
              />
              <Reveal>
                <p>He loves the long lines, the little wave from someone on the sidewalk, and the way a room changes when that Cadillac pulls up. Most of all, he loves giving people a moment that feels entirely their own.</p>
                <p>And there is always a second set of eyes on the plan. The sort that catches a detail, checks the timing, and makes sure everyone feels good before the day arrives.</p>
                <blockquote>“We are not here to rush you from A to B. We are here for the part you remember.”</blockquote>
                <button className="text-link" type="button" onClick={() => openBooking()}>Tell Ed about your day <ArrowUpRight size={16} /></button>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="page-shell">
            <div className="gallery-head">
              <SectionHeading
                eyebrow="A little look around"
                title={<>Moments in the <em>making.</em></>}
                description="The shine, the smiles, and everything that happens between the two."
              />
              <Reveal className="gallery-filter" direction="right">
                {["All moments", "Weddings", "The cars", "Little details"].map((category) => (
                  <button className={galleryCategory === category ? "is-active" : ""} key={category} type="button" onClick={() => { setGalleryCategory(category); setLightboxIndex(null); }} aria-pressed={galleryCategory === category}>{category}</button>
                ))}
              </Reveal>
            </div>
            <motion.div className="gallery-grid" layout>
              <AnimatePresence mode="popLayout">
                {visibleGallery.map((item, index) => (
                  <motion.button
                    className={`gallery-item gallery-item-${index % 4 + 1}`}
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    layout
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    aria-label={`Open photograph: ${item.caption}`}
                  >
                    <PexelsImage photo={item.photo} className="gallery-image" slot={`gallery-${item.id}`} sizes="(max-width: 760px) 100vw, 34vw" />
                    <span className="gallery-warmth" />
                    <span className="gallery-caption"><span>{item.category}</span><strong>{item.caption}</strong></span>
                    <span className="gallery-open"><ArrowUpRight size={19} /></span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
            <div className="gallery-bottomline"><span>Real Caddy Daddy photos are easy to drop into these marked slots.</span><button className="text-link" type="button" onClick={shareCurrentPage}>Share this page <Share2 size={16} /></button></div>
          </div>
        </section>

        <section className="plan-section section-pad" id="plan">
          <div className="plan-layout page-shell">
            <div className="plan-intro">
              <SectionHeading
                eyebrow="For the bride, the mum, and the spreadsheet"
                title={<>The day feels better<br />when the plan <em>breathes.</em></>}
                description="One calm conversation now makes room for the happy chaos later."
              />
              <button className="button button-burgundy" type="button" onClick={() => openBooking({ occasion: "Weddings" })}>Plan with Ed <ArrowUpRight size={17} /></button>
            </div>
            <div className="plan-timeline">
              {[
                { number: "01", title: "Start with the feeling", text: "Who is riding? What do you want the arrival to feel like? Begin there, then add the addresses." },
                { number: "02", title: "Give the timing room", text: "Build in a little breathing space for traffic, the first look, and that one photo everyone wants." },
                { number: "03", title: "Make the small things easy", text: "Share the venue rules, dress details, and photo-stop wishes. We will plan the route around them." },
                { number: "04", title: "Let the day be the day", text: "The timing is set, the car is ready, and you can be with your people. Sit back. We will handle the magic." },
              ].map((step, index) => (
                <Reveal className="plan-step" delay={index * 0.07} key={step.number}>
                  <span className="plan-number">{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  <span className="plan-step-arrow"><ArrowDown size={17} /></span>
                </Reveal>
              ))}
              <div className="plan-family-note"><span className="plan-note-icon"><Users size={19} /></span><p><strong>Parents and planners, you are welcome here.</strong><br />We can talk through the details with the whole decision-making team. No one has to carry the plan alone.</p></div>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="faq-layout page-shell">
            <div className="faq-aside">
              <SectionHeading
                eyebrow="Questions are a good thing"
                title={<>Before you say <em>yes.</em></>}
                description="Clear answers make a much nicer day. If we missed yours, just ask."
              />
              <a className="text-link" href={`mailto:${SITE_CONFIG.email}`}>Ask Ed directly <ArrowUpRight size={16} /></a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question} open={index === 0}>
                  <summary><span className="faq-index">0{index + 1}</span><span>{faq.question}</span><ChevronDown size={18} /></summary>
                  <div className="faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-head page-shell">
            <SectionHeading
              eyebrow="The best part is deciding together"
              title={<>Your date, your people,<br />your <em>entrance.</em></>}
              description={<>Whether you need a vintage Cadillac wedding car, classic wedding transportation, a prom limo, or a special occasion car service around {SITE_CONFIG.city}, we will help you arrive with time to take it in. Usually within one business day.</>}
            />
            <Reveal className="contact-head-action" direction="right">
              <button className="button button-gold button-large" type="button" onClick={() => openBooking()}>Check availability <ArrowUpRight size={18} /></button>
              <p><ShieldCheck size={15} /> No obligation. Just a real conversation.</p>
            </Reveal>
          </div>
          <div className="contact-panel page-shell">
            <div className="contact-left">
              <div className="contact-methods">
                <a href={`tel:${SITE_CONFIG.phoneHref}`} className="contact-method"><span><Phone size={19} /></span><div><small>Prefer a voice?</small><strong>Call {SITE_CONFIG.phoneDisplay}</strong></div><ArrowUpRight size={17} /></a>
                <a href={`sms:${SITE_CONFIG.phoneHref}`} className="contact-method"><span><MessageCircle size={19} /></span><div><small>On the go?</small><strong>Send Ed a text</strong></div><ArrowUpRight size={17} /></a>
                <a href={`mailto:${SITE_CONFIG.email}`} className="contact-method"><span><Mail size={19} /></span><div><small>Love an inbox?</small><strong>{SITE_CONFIG.email}</strong></div><ArrowUpRight size={17} /></a>
              </div>
              <div className="service-area">
                <div className="service-area-heading"><MapPin size={17} /><span>Our part of the world</span></div>
                <p>{SITE_CONFIG.serviceArea}. Longer journeys may be possible; just ask.</p>
                <div className="map-frame">
                  <iframe
                    title={`Map showing ${SITE_CONFIG.city}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.mapQuery)}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.mapQuery)}`} target="_blank" rel="noreferrer" className="map-label">{SITE_CONFIG.city} <ExternalLink size={13} /></a>
                </div>
              </div>
            </div>
            <div className="contact-right">
              <AvailabilityCalendar onChooseDate={setDateForEnquiry} />
              <div className="calendar-action">
                <p>{dateForEnquiry ? `You picked ${new Date(`${dateForEnquiry}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. Let's check it.` : "Pick a date and we will check it together."}</p>
                <button className="button button-burgundy" type="button" onClick={() => openBooking({ date: dateForEnquiry })}>Ask about this date <ArrowUpRight size={16} /></button>
              </div>
              <div className="response-promise"><Clock3 size={17} /><span>Usually a reply within one business day. Faster if you call.</span></div>
            </div>
          </div>
        </section>

        <section className="closing-section" aria-label="Make your entrance">
          <PexelsImage photo={photos.celebration} className="closing-image" slot="closing-celebration" sizes="100vw" />
          <div className="closing-shade" />
          <div className="closing-content page-shell">
            <p className="eyebrow">The chrome is ready</p>
            <h2>Let us make the<br /><em>arrival</em> part easy.</h2>
            <p>One date. A few good details. A memory you can still hear the door close on.</p>
            <div className="closing-actions">
              <button className="button button-gold button-large" type="button" onClick={() => openBooking()}>Check availability <ArrowUpRight size={18} /></button>
              <a className="button button-ghost button-large" href={`tel:${SITE_CONFIG.phoneHref}`}><Phone size={16} /> Call Ed</a>
            </div>
          </div>
          <div className="closing-mark" aria-hidden="true">CD</div>
        </section>
      </main>

      <Footer onBook={() => openBooking()} onLegal={setLegalPage} onShare={openShare} onToast={announce} />

      <div className="floating-tools">
        <button className={`horn-toggle${hornOn ? " horn-toggle-on" : ""}`} type="button" onClick={playHorn} aria-label={hornOn ? "Turn off car horn sound" : "Turn on car horn sound"} aria-pressed={hornOn}>
          {hornOn ? <Volume2 size={17} /> : <VolumeX size={17} />}<span>Car horn</span>
        </button>
        <a className="whatsapp-button" href={`https://wa.me/${SITE_CONFIG.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent("Hello, I would love to ask about a classic car for a special day.")}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><MessageCircle size={20} /><span>Chat with Ed</span></a>
      </div>

      <div className="mobile-action-bar" aria-label="Quick contact actions">
        <a href={`tel:${SITE_CONFIG.phoneHref}`}><Phone size={18} /><span>Call</span></a>
        <a href={`sms:${SITE_CONFIG.phoneHref}`}><MessageCircle size={18} /><span>Text</span></a>
        <button type="button" onClick={() => openBooking()}><CalendarDays size={18} /><span>Book</span></button>
      </div>

      <AnimatePresence>
        {cookieVisible && (
          <motion.aside className="cookie-notice" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} aria-label="Cookie notice">
            <p>Just the essentials. This preview stores your preferences and saved cars on this device.</p>
            <button type="button" onClick={acceptCookies}>Sounds good <Check size={15} /></button>
            <button className="cookie-dismiss" type="button" onClick={acceptCookies} aria-label="Dismiss cookie notice"><X size={16} /></button>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen && <BookingDialog key="booking" prefill={bookingPrefill} onClose={() => setBookingOpen(false)} onToast={announce} />}
        {shareDetails && <ShareDialog key="share" details={shareDetails} onClose={() => setShareDetails(null)} onToast={announce} />}
        {legalPage && <LegalDialog key="legal" page={legalPage} onClose={() => setLegalPage("")} />}
        {activeGalleryItem && (
          <ModalShell key="lightbox" label={activeGalleryItem.caption} onClose={() => setLightboxIndex(null)} eyebrow={`${activeGalleryItem.category} · ${lightboxIndex! + 1} of ${visibleGallery.length}`} wide>
            <div className="lightbox-content">
              <div className="lightbox-image-wrap"><PexelsImage photo={activeGalleryItem.photo} className="lightbox-image" slot={`lightbox-${activeGalleryItem.id}`} sizes="(max-width: 760px) 100vw, 90vw" /></div>
              <div className="lightbox-caption"><span>{activeGalleryItem.category}</span><h2>{activeGalleryItem.caption}</h2><div><button className="icon-button" type="button" onClick={() => setLightboxIndex((index) => index === null ? 0 : (index - 1 + visibleGallery.length) % visibleGallery.length)} aria-label="Previous image"><ArrowLeft size={19} /></button><button className="icon-button" type="button" onClick={() => setLightboxIndex((index) => index === null ? 0 : (index + 1) % visibleGallery.length)} aria-label="Next image"><ArrowRight size={19} /></button></div></div>
            </div>
          </ModalShell>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <motion.div className="toast" role="status" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Check size={16} />{toast}</motion.div>}
      </AnimatePresence>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: SITE_CONFIG.name, url: "https://caddydaddylimo.com/" }) }} />
    </div>
  );
}

function ReadAlong({ quote }: { quote: string }) {
  const reduced = useReducedMotion();
  const words = quote.split(" ");
  return (
    <p className="read-along" aria-label={quote}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0.18 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.36, delay: Math.min(index * 0.035, 0.65) }}
        >{word}{index < words.length - 1 ? " " : ""}</motion.span>
      ))}
    </p>
  );
}

function NotFound() {
  const reduced = useReducedMotion();
  return (
    <main className="not-found-page">
      <div className="not-found-grain" />
      <BrandMark inverse />
      <motion.div className="not-found-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="eyebrow">A little detour</p>
        <h1>Looks like we took<br />the <em>scenic route.</em></h1>
        <p>This page is not on the map. The good stuff is still just up ahead.</p>
        <a className="button button-gold button-large" href="/">Take me home <ArrowUpRight size={18} /></a>
      </motion.div>
      <div className="not-found-road"><span /><CarFront size={30} /></div>
    </main>
  );
}

export default App;