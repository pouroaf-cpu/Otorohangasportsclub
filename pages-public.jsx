// ============================================================
// Pages: Home, Scores, Fixtures, Live Games
// ============================================================

// ── HOME PAGE ────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [results] = React.useState(() => getResults().slice(0, 6));
  const [fixtures] = React.useState(() => getFixtures().slice(0, 4));
  const [live] = React.useState(() => getLiveGames());

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, ${NAVY_DARK} 0%, ${NAVY} 60%, #3a4fa0 100%)`, color: WHITE, padding: '72px 16px 64px', borderBottom: `4px solid ${GOLD}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <SportBadge sport="Rugby" size="lg" /><SportBadge sport="Netball" size="lg" /><SportBadge sport="Squash" size="lg" />
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(42px, 8vw, 80px)', letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 16 }}>
              Ōtorohanga<br /><span style={{ color: GOLD }}>Sports Club</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 8, lineHeight: 1.5 }}>King Country's community club — Rugby, Netball, and Squash since 1919.</p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>Proud. Grounded. Together.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => setPage('join')} style={{ background: GOLD, color: NAVY_DARK, border: 'none', padding: '14px 28px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>Join the Club</button>
              <button onClick={() => setPage('fixtures')} style={{ background: 'rgba(255,255,255,0.1)', color: WHITE, border: '1.5px solid rgba(255,255,255,0.3)', padding: '14px 28px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>Next Fixtures</button>
            </div>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <img src="uploads/logo (1).jpg" alt="Club Crest" style={{ width: 'clamp(160px, 20vw, 220px)', height: 'clamp(160px, 20vw, 220px)', objectFit: 'contain', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.4))' }} />
          </div>
        </div>
      </div>

      {/* Live indicator */}
      {live.length > 0 && (
        <div style={{ background: '#e74c3c', padding: '12px 16px', cursor: 'pointer' }} onClick={() => setPage('live')}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.2)', color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: WHITE, display: 'inline-block', animation: 'pulse 1.2s infinite' }} />
              LIVE NOW
            </span>
            {live.map(g => (
              <span key={g.id} style={{ color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16 }}>
                {g.homeTeam} {g.homeScore} – {g.awayScore} {g.awayTeam} · {g.period} {g.minute}'
              </span>
            ))}
            <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>View scoreboard →</span>
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {/* Latest Results */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: NAVY_DARK, textTransform: 'uppercase' }}>Latest Results</h2>
              <button onClick={() => setPage('scores')} style={{ background: 'none', border: 'none', color: GOLD_DARK, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>All results →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {results.slice(0,5).map(r => <ResultCard key={r.id} result={r} />)}
            </div>
          </div>
          {/* Next Fixtures */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: NAVY_DARK, textTransform: 'uppercase' }}>Next Up</h2>
              <button onClick={() => setPage('fixtures')} style={{ background: 'none', border: 'none', color: GOLD_DARK, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>All fixtures →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {fixtures.slice(0,4).map(f => <FixtureCard key={f.id} fixture={f} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCORES PAGE ───────────────────────────────────────────────
function ScoresPage() {
  const [results] = React.useState(() => getResults());
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? results : results.filter(r => r.sport === filter);
  const sorted = [...filtered].sort((a,b) => b.date.localeCompare(a.date));
  return (
    <div>
      <PageHero title="Results" subtitle="Full match results across all codes." />
      <PageContent>
        <SportFilter value={filter} onChange={setFilter} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.length === 0 && <p style={{ color: GRAY }}>No results found.</p>}
          {sorted.map(r => <ResultCard key={r.id} result={r} />)}
        </div>
      </PageContent>
    </div>
  );
}

// ── FIXTURES PAGE ─────────────────────────────────────────────
function FixturesPage() {
  const [fixtures] = React.useState(() => getFixtures());
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? fixtures : fixtures.filter(f => f.sport === filter);
  const sorted = [...filtered].sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  return (
    <div>
      <PageHero title="Fixtures" subtitle="Upcoming games for all codes." />
      <PageContent>
        <SportFilter value={filter} onChange={setFilter} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.length === 0 && <p style={{ color: GRAY }}>No fixtures found.</p>}
          {sorted.map(f => <FixtureCard key={f.id} fixture={f} />)}
        </div>
      </PageContent>
    </div>
  );
}

// ── LIVE GAMES PAGE ───────────────────────────────────────────
function LiveGamesPage() {
  const [games, setGames] = React.useState(() => getLiveGames());

  // Simulate live score ticking
  React.useEffect(() => {
    const interval = setInterval(() => {
      setGames(prev => prev.map(g => {
        if (g.status !== 'live') return g;
        const newMin = Math.min(g.minute + 1, g.period === '1st Half' ? 40 : 80);
        const newPeriod = newMin >= 40 && g.period === '1st Half' ? 'Half Time' : g.period;
        return { ...g, minute: newMin, period: newPeriod };
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const EVENT_ICONS = { try: '🟡', conversion: '⚪', penalty: '🟠', yellowCard: '🟨', redCard: '🟥', goal: '⚽', default: '•' };

  return (
    <div>
      <PageHero title="Live Games" subtitle="In-progress match scoreboards.">
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e74c3c', display: 'inline-block', animation: 'pulse 1.2s infinite' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Updates every 10 seconds</span>
        </div>
      </PageHero>
      <PageContent>
        {games.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: GRAY }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏟</div>
            <p style={{ fontSize: 18, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>No live games right now</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Check the fixtures page for upcoming games.</p>
          </div>
        )}
        {games.map(g => (
          <div key={g.id} style={{ background: WHITE, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: 32 }}>
            {/* Status bar */}
            <div style={{ background: g.status === 'live' ? '#e74c3c' : GRAY, padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {g.status === 'live' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: WHITE, display: 'inline-block', animation: 'pulse 1.2s infinite' }} />}
                <span style={{ color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: '0.08em' }}>
                  {g.status === 'live' ? `LIVE · ${g.period}` : g.status.toUpperCase()}
                </span>
                {g.status === 'live' && g.period !== 'Half Time' && <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{g.minute}'</span>}
              </div>
              <SportBadge sport={g.sport} />
            </div>
            {/* Score */}
            <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(18px,4vw,26px)', color: NAVY_DARK, marginBottom: 4 }}>{g.homeTeam}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(52px,12vw,80px)', color: NAVY_DARK, lineHeight: 1 }}>{g.homeScore}</div>
              </div>
              <div style={{ textAlign: 'center', color: GRAY }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: '0.04em' }}>VS</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{g.competition}</div>
                <div style={{ fontSize: 11, marginTop: 2 }}>{g.venue}</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(18px,4vw,26px)', color: NAVY_DARK, marginBottom: 4 }}>{g.awayTeam}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(52px,12vw,80px)', color: NAVY_DARK, lineHeight: 1 }}>{g.awayScore}</div>
              </div>
            </div>
            {/* Match events */}
            {g.events && g.events.length > 0 && (
              <div style={{ borderTop: `1px solid ${OFF_WHITE}`, padding: '16px 24px' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', color: GRAY, marginBottom: 12, textTransform: 'uppercase' }}>Match Events</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[...g.events].reverse().map((ev, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: GRAY, minWidth: 28, fontSize: 12 }}>{ev.time}'</span>
                      <span>{EVENT_ICONS[ev.type] || EVENT_ICONS.default}</span>
                      <span style={{ color: ev.team === 'home' ? NAVY_DARK : '#555' }}>{ev.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </PageContent>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}

Object.assign(window, { HomePage, ScoresPage, FixturesPage, LiveGamesPage });
