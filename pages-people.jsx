// ============================================================
// Pages: People, About, Join
// ============================================================

// ── PEOPLE PAGE ───────────────────────────────────────────────
function PeoplePage() {
  const [people] = React.useState(() => getPeople());
  const leadership = people.filter(p => p.sport === 'Club');
  const sportPeople = (sport) => people.filter(p => p.sport === sport);

  const PersonCard = ({ person }) => (
    <div style={{ background: WHITE, borderRadius: 8, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: GOLD }}>
          {person.name.split(' ').map(w => w[0]).join('').slice(0,2)}
        </span>
      </div>
      <div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, color: NAVY_DARK }}>{person.name}</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: GOLD_DARK, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{person.role}</div>
        <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.6 }}>{person.bio}</p>
      </div>
    </div>
  );

  const SportSection = ({ sport }) => {
    const sp = sportPeople(sport);
    if (!sp.length) return null;
    const colors = SPORT_COLORS[sport];
    return (
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 4, height: 32, background: colors.bg, borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: NAVY_DARK, textTransform: 'uppercase' }}>{sport}</h2>
          <SportBadge sport={sport} size="lg" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {sp.map(p => <PersonCard key={p.id} person={p} />)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHero title="People" subtitle="The coaches, captains, and volunteers who make the club run." />
      <PageContent>
        {/* Club Leadership */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 4, height: 32, background: GOLD, borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: NAVY_DARK, textTransform: 'uppercase' }}>Club Leadership</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {leadership.map(p => <PersonCard key={p.id} person={p} />)}
          </div>
        </div>
        {['Rugby','Netball','Squash'].map(s => <SportSection key={s} sport={s} />)}
      </PageContent>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────
function AboutPage() {
  const sportDetails = [
    {
      sport: 'Rugby',
      icon: '🏉',
      season: 'April – September',
      training: 'Tuesday & Thursday, 6:00pm — Memorial Park',
      venue: 'Memorial Park, Harbour Street',
      competition: 'King Country Club Championship',
      description: 'Ōtorohanga RFC has been the heartbeat of rugby in King Country since the early 1900s. Our senior side competes in the King Country Club Championship, and we run junior grades from Under 7s through to Under 18s. All are welcome — experienced or first time.',
    },
    {
      sport: 'Netball',
      icon: '🏐',
      season: 'March – August',
      training: 'Wednesday, 6:30pm — Ōtorohanga Recreation Centre',
      venue: 'Ōtorohanga Recreation Centre, Maniapoto Street',
      competition: 'Waikato Netball League',
      description: 'Our netball section fields two senior teams in the Waikato Netball League and runs junior development programmes for all ages. Training is welcoming, competitive, and a lot of fun.',
    },
    {
      sport: 'Squash',
      icon: '🎾',
      season: 'Year-round',
      training: 'Open court sessions Monday & Wednesday, 7:00pm',
      venue: 'Ōtorohanga Squash Club, Wahanui Crescent',
      competition: 'King Country Squash Interclub',
      description: 'Our squash section is one of the most active in King Country. With four courts and a vibrant interclub programme, there\'s a place for beginners, social players, and serious competitors alike.',
    },
  ];

  return (
    <div>
      <PageHero title="About the Club" subtitle="A community club serving King Country since 1919." />
      <PageContent>
        {/* History */}
        <div style={{ background: WHITE, borderRadius: 12, padding: '32px', marginBottom: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 16 }}>Our History</h2>
          <p style={{ lineHeight: 1.8, color: '#333', marginBottom: 16 }}>
            The Ōtorohanga Sports Club has been at the heart of this community for over a century. What began as a rugby club in the early 1900s has grown into a multi-sport hub for all of King Country. We've seen generations of families come through these gates — players who became coaches, juniors who became club champions.
          </p>
          <p style={{ lineHeight: 1.8, color: '#333' }}>
            Today we run Rugby, Netball, and Squash codes, serving hundreds of members from across Ōtorohanga and the surrounding district. The club crest — a kiwi on a navy and gold shield — represents our roots: grounded, proud, and always community-first.
          </p>
        </div>

        {/* Sport details */}
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 24 }}>Our Codes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 48 }}>
          {sportDetails.map(s => (
            <div key={s.sport} style={{ background: WHITE, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, color: WHITE, textTransform: 'uppercase' }}>{s.sport}</div>
                  <SportBadge sport={s.sport} />
                </div>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginBottom: 16 }}>{s.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Season', value: s.season },
                    { label: 'Training', value: s.training },
                    { label: 'Venue', value: s.venue },
                    { label: 'Competition', value: s.competition },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', gap: 8, fontSize: 13 }}>
                      <span style={{ fontWeight: 600, color: NAVY_DARK, minWidth: 90 }}>{row.label}:</span>
                      <span style={{ color: GRAY, flex: 1 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Location */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div style={{ background: WHITE, borderRadius: 12, padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 16 }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <div><span style={{ fontWeight: 600 }}>Email: </span><a href="mailto:info@otorohangasports.co.nz" style={{ color: NAVY_MID }}>info@otorohangasports.co.nz</a></div>
              <div><span style={{ fontWeight: 600 }}>Phone: </span><span style={{ color: GRAY }}>(07) 873 6000</span></div>
              <div><span style={{ fontWeight: 600 }}>Facebook: </span><span style={{ color: NAVY_MID }}>Ōtorohanga Sports Club</span></div>
            </div>
          </div>
          <div style={{ background: WHITE, borderRadius: 12, padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 16 }}>Find Us</h3>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8 }}>
              Memorial Park<br />Harbour Street<br />Ōtorohanga 3900<br />King Country, New Zealand
            </p>
          </div>
        </div>
      </PageContent>
    </div>
  );
}

// ── JOIN PAGE ─────────────────────────────────────────────────
function JoinPage() {
  const [form, setForm] = React.useState({ firstName: '', lastName: '', dob: '', phone: '', email: '', sports: [], experience: '', notes: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSport = (s) => setForm(f => ({ ...f, sports: f.sports.includes(s) ? f.sports.filter(x => x !== s) : [...f.sports, s] }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.dob) e.dob = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.sports.length) e.sports = 'Select at least one sport';
    if (!form.experience) e.experience = 'Required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const inputStyle = (err) => ({
    width: '100%', padding: '12px 14px', borderRadius: 6, fontSize: 15,
    border: `1.5px solid ${err ? '#e74c3c' : OFF_WHITE}`,
    outline: 'none', background: WHITE, color: NAVY_DARK,
  });

  const labelStyle = { fontWeight: 600, fontSize: 13, color: NAVY_DARK, marginBottom: 6, display: 'block' };
  const errorStyle = { fontSize: 12, color: '#e74c3c', marginTop: 4 };

  if (submitted) {
    return (
      <div>
        <PageHero title="Membership" />
        <PageContent>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 36, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 12 }}>Application Received!</h2>
            <p style={{ color: GRAY, lineHeight: 1.7 }}>Thanks <strong>{form.firstName}</strong>, we've got your membership application for {form.sports.join(' & ')}. We'll be in touch at {form.email} to confirm your registration and next steps.</p>
            <p style={{ marginTop: 16, color: GRAY }}>Welcome to the club — kia kaha!</p>
          </div>
        </PageContent>
      </div>
    );
  }

  return (
    <div>
      <PageHero title="Join the Club" subtitle="Sign up for Rugby, Netball, Squash — or all three." />
      <PageContent>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ background: WHITE, borderRadius: 12, padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${GOLD}` }}>Personal Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input style={inputStyle(errors.firstName)} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Hemi" />
                  {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input style={inputStyle(errors.lastName)} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Tūhoe" />
                  {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Date of Birth</label>
                <input type="date" style={inputStyle(errors.dob)} value={form.dob} onChange={e => set('dob', e.target.value)} />
                {errors.dob && <div style={errorStyle}>{errors.dob}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle(errors.phone)} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="021 555 1234" />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" style={inputStyle(errors.email)} value={form.email} onChange={e => set('email', e.target.value)} placeholder="hemi@example.com" />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>
            </div>

            <div style={{ background: WHITE, borderRadius: 12, padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${GOLD}` }}>Sport Selection</h3>
              <label style={labelStyle}>Which code(s) are you joining?</label>
              <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                {['Rugby','Netball','Squash'].map(s => {
                  const selected = form.sports.includes(s);
                  const c = SPORT_COLORS[s];
                  return (
                    <button type="button" key={s} onClick={() => toggleSport(s)} style={{
                      background: selected ? c.bg : WHITE,
                      color: selected ? c.text : NAVY_DARK,
                      border: `2px solid ${selected ? c.bg : OFF_WHITE}`,
                      padding: '10px 20px', borderRadius: 8,
                      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16,
                      cursor: 'pointer', transition: '150ms',
                    }}>{s}</button>
                  );
                })}
              </div>
              {errors.sports && <div style={errorStyle}>{errors.sports}</div>}
              <div style={{ marginTop: 20 }}>
                <label style={labelStyle}>Experience Level</label>
                <select style={{ ...inputStyle(errors.experience), appearance: 'none' }} value={form.experience} onChange={e => set('experience', e.target.value)}>
                  <option value="">Select...</option>
                  <option value="beginner">Beginner — never played</option>
                  <option value="social">Social — occasional play</option>
                  <option value="club">Club level — regular competitor</option>
                  <option value="rep">Rep / high performance level</option>
                </select>
                {errors.experience && <div style={errorStyle}>{errors.experience}</div>}
              </div>
            </div>

            <div style={{ background: WHITE, borderRadius: 12, padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 32 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase', marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${GOLD}` }}>Anything else?</h3>
              <textarea style={{ ...inputStyle(false), minHeight: 100, resize: 'vertical' }} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Questions, previous clubs, kids joining too — anything you'd like us to know." />
            </div>

            <button type="submit" style={{ width: '100%', background: GOLD, color: NAVY_DARK, border: 'none', padding: '16px', borderRadius: 8, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Submit Application
            </button>
          </form>
        </div>
      </PageContent>
    </div>
  );
}

Object.assign(window, { PeoplePage, AboutPage, JoinPage });
