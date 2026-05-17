// ============================================================
// Ōtorohanga Sports Club — Shared Components
// ============================================================

const NAVY = '#2b3a7a';
const NAVY_DARK = '#1e2855';
const NAVY_MID = '#344a99';
const GOLD = '#e8a830';
const GOLD_DARK = '#c8891a';
const WHITE = '#F8F9FA';
const OFF_WHITE = '#E8ECF0';
const GRAY = '#7A8799';

const SPORT_COLORS = {
  Rugby:   { bg: NAVY,     text: WHITE,  light: '#eef0fa', border: NAVY },
  Netball: { bg: GOLD,     text: NAVY_DARK, light: '#fdf5e0', border: GOLD },
  Squash:  { bg: '#1a7a5c', text: WHITE, light: '#e0f5ed', border: '#1a7a5c' },
  Club:    { bg: '#444',   text: WHITE,  light: '#f0f0f0', border: '#444' },
};

const sharedStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; background: #f0f2f5; color: #1e2855; }
  h1,h2,h3,h4 { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.02em; }
  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: 'Inter', sans-serif; }
  input, select, textarea { font-family: 'Inter', sans-serif; }
`;

// ── Sport Badge ──────────────────────────────────────────────
function SportBadge({ sport, size = 'sm' }) {
  const c = SPORT_COLORS[sport] || SPORT_COLORS.Club;
  const pad = size === 'lg' ? '6px 14px' : '3px 10px';
  const fs  = size === 'lg' ? '13px' : '11px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.text,
      padding: pad, borderRadius: 4, fontSize: fs,
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {sport === 'Rugby' && '🏉'}
      {sport === 'Netball' && '🏐'}
      {sport === 'Squash' && '🎾'}
      {sport}
    </span>
  );
}

// ── Nav ──────────────────────────────────────────────────────
function Nav({ page, setPage, isAdmin }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'scores', label: 'Scores' },
    { id: 'fixtures', label: 'Fixtures' },
    { id: 'live', label: 'Live' },
    { id: 'people', label: 'People' },
    { id: 'about', label: 'About' },
    { id: 'join', label: 'Join' },
  ];
  return (
    <nav style={{ background: NAVY_DARK, borderBottom: `3px solid ${GOLD}`, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <img src="uploads/logo (1).jpg" alt="Ōtorohanga RFC" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: '50%' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, color: WHITE, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Ōtorohanga<span style={{ color: GOLD }}> Sports Club</span>
          </span>
        </button>
        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              background: page === l.id ? GOLD : 'none',
              color: page === l.id ? NAVY_DARK : WHITE,
              border: 'none', padding: '8px 12px', borderRadius: 6,
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
              fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: '150ms ease', position: 'relative',
            }}>
              {l.label}
              {l.id === 'live' && <span style={{ position: 'absolute', top: 2, right: 2, background: '#e74c3c', color: 'white', fontSize: 8, fontWeight: 700, padding: '1px 3px', borderRadius: 2, lineHeight: 1 }}>●</span>}
            </button>
          ))}
          <button onClick={() => setPage(isAdmin ? 'admin' : 'login')} style={{
            background: isAdmin ? '#2ecc71' : 'rgba(255,255,255,0.1)',
            color: WHITE, border: `1px solid rgba(255,255,255,0.2)`,
            padding: '8px 14px', borderRadius: 6,
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase',
            marginLeft: 8,
          }}>{isAdmin ? '⚙ Admin' : 'Login'}</button>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: WHITE, fontSize: 24, display: 'none' }} className="hamburger">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: NAVY_DARK, borderTop: `1px solid rgba(255,255,255,0.1)`, padding: '8px 16px 16px' }}>
          {links.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: page === l.id ? GOLD : 'none',
              color: page === l.id ? NAVY_DARK : WHITE,
              border: 'none', padding: '12px 16px', borderRadius: 6,
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
              fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase',
              marginBottom: 4,
            }}>{l.label}</button>
          ))}
          <button onClick={() => { setPage(isAdmin ? 'admin' : 'login'); setMenuOpen(false); }} style={{
            display: 'block', width: '100%', textAlign: 'left',
            background: 'rgba(255,255,255,0.1)', color: WHITE,
            border: 'none', padding: '12px 16px', borderRadius: 6,
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>{isAdmin ? '⚙ Admin' : 'Login'}</button>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: NAVY_DARK, borderTop: `3px solid ${GOLD}`, color: WHITE, padding: '40px 16px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <img src="uploads/logo (1).jpg" alt="Logo" style={{ height: 48, width: 48, objectFit: 'contain', borderRadius: '50%' }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: '0.04em' }}>ŌTOROHANGA</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 14, color: GOLD }}>SPORTS CLUB</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>King Country, New Zealand<br />Est. 1919</p>
        </div>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: GOLD, letterSpacing: '0.06em', marginBottom: 12 }}>QUICK LINKS</div>
          {['home','scores','fixtures','live','people','about','join'].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 14, padding: '4px 0', cursor: 'pointer', textTransform: 'capitalize', fontFamily: "'Inter', sans-serif" }}>{p === 'live' ? 'Live Games' : p.charAt(0).toUpperCase() + p.slice(1)}</button>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: GOLD, letterSpacing: '0.06em', marginBottom: 12 }}>FIND US</div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            Memorial Park<br />Harbour Street<br />Ōtorohanga 3900<br /><br />
            <span style={{ color: GOLD }}>info@otorohangasports.co.nz</span>
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: GOLD, letterSpacing: '0.06em', marginBottom: 12 }}>CODES</div>
          {['Rugby','Netball','Squash'].map(s => <SportBadge key={s} sport={s} size="lg" />).reduce((a,b) => [...a, <br key={Math.random()} />, b], []).slice(1)}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '24px auto 0', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        © 2025 Ōtorohanga Sports Club. All rights reserved.
      </div>
    </footer>
  );
}

// ── Section heading ──────────────────────────────────────────
function SectionHeading({ title, subtitle, light }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 800, color: light ? WHITE : NAVY_DARK, letterSpacing: '0.03em', textTransform: 'uppercase', lineHeight: 1 }}>
        {title}
      </h2>
      {subtitle && <p style={{ marginTop: 8, fontSize: 15, color: light ? 'rgba(255,255,255,0.7)' : GRAY }}>{subtitle}</p>}
    </div>
  );
}

// ── Result Card ──────────────────────────────────────────────
function ResultCard({ result }) {
  const isWin = result.homeTeam.includes('Ōtorohanga') ? result.homeScore > result.awayScore
    : result.awayScore > result.homeScore;
  const isDraw = result.homeScore === result.awayScore;
  const outcome = isDraw ? 'DRAW' : isWin ? 'WIN' : 'LOSS';
  const outcomeColor = isDraw ? GOLD : isWin ? '#2ecc71' : '#e74c3c';
  return (
    <div style={{ background: WHITE, borderRadius: 8, padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${outcomeColor}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <SportBadge sport={result.sport} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: GRAY }}>{result.date}</span>
          <span style={{ background: outcomeColor, color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>{outcome}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, flex: 1 }}>{result.homeTeam}</span>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: NAVY_DARK, minWidth: 70, textAlign: 'center' }}>{result.homeScore} – {result.awayScore}</span>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, flex: 1, textAlign: 'right' }}>{result.awayTeam}</span>
      </div>
      <div style={{ fontSize: 12, color: GRAY }}>{result.competition} · {result.venue}</div>
    </div>
  );
}

// ── Fixture Card ─────────────────────────────────────────────
function FixtureCard({ fixture }) {
  const d = new Date(fixture.date + 'T' + fixture.time);
  const day = d.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
  return (
    <div style={{ background: WHITE, borderRadius: 8, padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: `4px solid ${NAVY}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <SportBadge sport={fixture.sport} />
        <span style={{ fontSize: 12, color: GRAY, fontWeight: 600 }}>{day} · {fixture.time}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, flex: 1 }}>{fixture.homeTeam}</span>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK }}>vs</span>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, flex: 1, textAlign: 'right' }}>{fixture.awayTeam}</span>
      </div>
      <div style={{ fontSize: 12, color: GRAY }}>{fixture.competition} · {fixture.venue}</div>
    </div>
  );
}

// ── Filter tabs ──────────────────────────────────────────────
function SportFilter({ value, onChange }) {
  const opts = ['All', 'Rugby', 'Netball', 'Squash'];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
      {opts.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          background: value === o ? NAVY : WHITE,
          color: value === o ? WHITE : NAVY_DARK,
          border: `1.5px solid ${value === o ? NAVY : OFF_WHITE}`,
          padding: '8px 18px', borderRadius: 6,
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase',
          cursor: 'pointer', transition: '150ms',
        }}>{o}</button>
      ))}
    </div>
  );
}

// ── Page shell ───────────────────────────────────────────────
function PageHero({ title, subtitle, children }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, color: WHITE, padding: '48px 16px 40px', borderBottom: `4px solid ${GOLD}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 6vw, 52px)', letterSpacing: '0.03em', textTransform: 'uppercase', lineHeight: 1 }}>
          {title}
        </h1>
        {subtitle && <p style={{ marginTop: 8, fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 500 }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

function PageContent({ children }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px 64px' }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  NAVY, NAVY_DARK, NAVY_MID, GOLD, GOLD_DARK, WHITE, OFF_WHITE, GRAY,
  SPORT_COLORS, sharedStyles,
  SportBadge, Nav, Footer, SectionHeading,
  ResultCard, FixtureCard, SportFilter,
  PageHero, PageContent,
});
