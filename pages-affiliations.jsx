// ============================================================
// Affiliations Page — Club Bar Cards
// ============================================================

function AffiliationsPage() {
  const [affiliations] = React.useState(() => getAffiliations());
  const [filter, setFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [flipped, setFlipped] = React.useState(null);

  const filtered = affiliations.filter(a => {
    const sportMatch = filter === 'All' || a.sports.includes(filter);
    const searchMatch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.memberNumber.toLowerCase().includes(search.toLowerCase());
    return sportMatch && searchMatch;
  });

  const TIER_COLORS = {
    'Life Member':   { bg: GOLD,     text: NAVY_DARK },
    'Full Member':   { bg: NAVY,     text: WHITE },
    'Social Member': { bg: '#4a5568', text: WHITE },
  };

  // Mini barcode SVG
  const Barcode = ({ num }) => {
    const seed = num.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
    const bars = Array.from({length: 28}, (_, i) => {
      const w = ((seed * (i+7) * 13) % 3) + 1;
      return w;
    });
    return (
      <svg width="120" height="32" viewBox="0 0 120 32" style={{ opacity: 0.6 }}>
        {bars.reduce((acc, w, i) => {
          const x = acc.x;
          if (i % 2 === 0) {
            acc.els.push(<rect key={i} x={x} y={0} width={w} height={32} fill="white" />);
          }
          acc.x += w + 1;
          return acc;
        }, { x: 0, els: [], width: 0 }).els}
      </svg>
    );
  };

  const MemberCard = ({ member }) => {
    const isFlipped = flipped === member.id;
    const tierStyle = TIER_COLORS[member.tier] || TIER_COLORS['Full Member'];
    const isMobile = window.innerWidth < 600;

    return (
      <div
        onClick={() => setFlipped(isFlipped ? null : member.id)}
        style={{ perspective: 1000, cursor: 'pointer', height: 200, userSelect: 'none' }}
      >
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s ease',
        }}>
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 70%, #3a4fa0 100%)`,
            borderRadius: 14, padding: '20px 22px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            {/* Decorative circle */}
            <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(232,168,48,0.08)' }} />
            <div style={{ position: 'absolute', right: 10, top: 10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(232,168,48,0.06)' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Ōtorohanga Sports Club</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: WHITE, lineHeight: 1.1 }}>{member.name}</div>
              </div>
              <img src="uploads/logo (1).jpg" alt="" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '50%', flexShrink: 0 }} />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                {member.sports.map(s => <SportBadge key={s} sport={s} size="sm" />)}
                <span style={{ background: tierStyle.bg, color: tierStyle.text, padding: '3px 10px', borderRadius: 4, fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{member.tier}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>MEMBER NO.</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: GOLD, letterSpacing: '0.1em' }}>{member.memberNumber}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>VALID</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: WHITE }}>{member.year}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, #1a1a2e 0%, ${NAVY_DARK} 100%)`,
            borderRadius: 14, padding: '20px 22px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ width: '100%', height: 36, background: 'rgba(255,255,255,0.15)', borderRadius: 4, marginBottom: 12 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontStyle: 'italic' }}>
                This card entitles the holder to club member pricing at the Ōtorohanga Sports Club bar and facilities. Present at point of service.
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Member since {member.joined}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Barcode num={member.memberNumber} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>{member.memberNumber}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>otorohangasports.co.nz</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHero title="Club Affiliations" subtitle="Member bar cards — tap a card to flip it over.">
        <p style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Present your card at the bar for member pricing.</p>
      </PageHero>
      <PageContent>
        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or member number..."
            style={{ flex: '1 1 200px', padding: '10px 14px', borderRadius: 6, border: `1.5px solid ${OFF_WHITE}`, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: 'none' }}
          />
          <SportFilter value={filter} onChange={setFilter} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map(m => <MemberCard key={m.id} member={m} />)}
          {filtered.length === 0 && <p style={{ color: GRAY, gridColumn: '1/-1' }}>No members found.</p>}
        </div>

        <div style={{ marginTop: 40, background: WHITE, borderRadius: 10, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 8 }}>Bar Affiliation</h3>
          <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7 }}>Full and Life Members receive discounted pricing at the club bar. Social Members enjoy standard club rates. Cards must be presented on each visit. Lost cards should be reported to the club secretary.</p>
        </div>
      </PageContent>
    </div>
  );
}

Object.assign(window, { AffiliationsPage });
