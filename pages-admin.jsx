// ============================================================
// Admin Login + Role-based Admin Panel
// ============================================================

// ── LOGIN PAGE ────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError('Enter your username and password.'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = authenticateUser(username.trim(), password);
      if (user) {
        onLogin(user);
      } else {
        setError('Incorrect username or password.');
        setLoading(false);
      }
    }, 500);
  };

  const fieldStyle = (err) => ({
    width: '100%', padding: '12px 14px', borderRadius: 6, fontSize: 15,
    border: `1.5px solid ${err ? '#e74c3c' : OFF_WHITE}`, outline: 'none',
    fontFamily: "'Inter', sans-serif", color: NAVY_DARK, background: WHITE,
  });

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="uploads/logo (1).jpg" alt="Logo" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: NAVY_DARK, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Admin Login</h1>
          <p style={{ color: GRAY, fontSize: 14, marginTop: 6 }}>Authorised members only</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ background: WHITE, borderRadius: 12, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: NAVY_DARK, marginBottom: 8 }}>Username</label>
              <input
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                placeholder="your username"
                style={fieldStyle(!!error)}
                autoFocus
                autoComplete="username"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: NAVY_DARK, marginBottom: 8 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                style={fieldStyle(!!error)}
                autoComplete="current-password"
              />
              {error && <div style={{ fontSize: 12, color: '#e74c3c', marginTop: 6 }}>{error}</div>}
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? GRAY : NAVY_DARK, color: WHITE, border: 'none', padding: '14px', borderRadius: 8, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: loading ? 'default' : 'pointer' }}>
              {loading ? 'Checking...' : 'Log In'}
            </button>
          </div>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: GRAY }}>Contact the club secretary if you need access.</p>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────
function AdminPanel({ currentUser, onLogout }) {
  const isSuperAdmin = currentUser.role === 'superadmin';
  const allowedSports = currentUser.sports || [];

  const tabs = [
    { id: 'results',  label: 'Results' },
    { id: 'fixtures', label: 'Fixtures' },
    ...(isSuperAdmin ? [{ id: 'users', label: 'User Management' }] : []),
  ];

  const [tab, setTab] = React.useState('results');
  const [results, setResults] = React.useState(() => getResults());
  const [fixtures, setFixtures] = React.useState(() => getFixtures());
  const [users, setUsers] = React.useState(() => getUsers());
  const [editingResult, setEditingResult] = React.useState(null);
  const [editingFixture, setEditingFixture] = React.useState(null);
  const [editingUser, setEditingUser] = React.useState(null);
  const [toast, setToast] = React.useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const emptyResult = { sport: allowedSports[0] || 'Rugby', homeTeam: 'Ōtorohanga', awayTeam: '', homeScore: 0, awayScore: 0, date: new Date().toISOString().slice(0,10), competition: '', venue: 'Memorial Park' };
  const emptyFixture = { sport: allowedSports[0] || 'Rugby', homeTeam: 'Ōtorohanga', awayTeam: '', date: '', time: '14:30', venue: 'Memorial Park', competition: '' };
  const emptyUser = { username: '', password: '', name: '', role: 'sport_admin', sports: ['Rugby'] };

  const fieldStyle = { width: '100%', padding: '10px 12px', borderRadius: 6, border: `1.5px solid ${OFF_WHITE}`, fontSize: 14, fontFamily: "'Inter', sans-serif", color: NAVY_DARK };
  const labelStyle = { display: 'block', fontWeight: 600, fontSize: 12, color: NAVY_DARK, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' };

  // ── Result form ──────────────────────────────────────────────
  const ResultForm = ({ initial, onSave, onCancel }) => {
    const [f, setF] = React.useState(initial);
    const set = (k, v) => setF(p => ({ ...p, [k]: v }));
    const sportOptions = isSuperAdmin ? ['Rugby','Netball','Squash'] : allowedSports;
    return (
      <div style={{ background: '#f0f4ff', border: `2px solid ${NAVY}`, borderRadius: 10, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <div>
            <label style={labelStyle}>Sport</label>
            <select style={fieldStyle} value={f.sport} onChange={e => set('sport', e.target.value)}>
              {sportOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" style={fieldStyle} value={f.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Home Team</label>
            <input style={fieldStyle} value={f.homeTeam} onChange={e => set('homeTeam', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Away Team</label>
            <input style={fieldStyle} value={f.awayTeam} onChange={e => set('awayTeam', e.target.value)} placeholder="Opponent" />
          </div>
          <div>
            <label style={labelStyle}>Home Score</label>
            <input type="number" style={fieldStyle} value={f.homeScore} onChange={e => set('homeScore', parseInt(e.target.value)||0)} />
          </div>
          <div>
            <label style={labelStyle}>Away Score</label>
            <input type="number" style={fieldStyle} value={f.awayScore} onChange={e => set('awayScore', parseInt(e.target.value)||0)} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Competition</label>
            <input style={fieldStyle} value={f.competition} onChange={e => set('competition', e.target.value)} placeholder="e.g. King Country Club Championship" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Venue</label>
            <input style={fieldStyle} value={f.venue} onChange={e => set('venue', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={() => onSave(f)} style={{ flex: 1, background: NAVY_DARK, color: WHITE, border: 'none', padding: '12px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Save Result</button>
          <button onClick={onCancel} style={{ padding: '12px 20px', background: 'none', border: `1.5px solid ${OFF_WHITE}`, borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    );
  };

  // ── Fixture form ─────────────────────────────────────────────
  const FixtureForm = ({ initial, onSave, onCancel }) => {
    const [f, setF] = React.useState(initial);
    const set = (k, v) => setF(p => ({ ...p, [k]: v }));
    const sportOptions = isSuperAdmin ? ['Rugby','Netball','Squash'] : allowedSports;
    return (
      <div style={{ background: '#fffbf0', border: `2px solid ${GOLD}`, borderRadius: 10, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <div>
            <label style={labelStyle}>Sport</label>
            <select style={fieldStyle} value={f.sport} onChange={e => set('sport', e.target.value)}>
              {sportOptions.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" style={fieldStyle} value={f.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Time</label>
            <input type="time" style={fieldStyle} value={f.time} onChange={e => set('time', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Home Team</label>
            <input style={fieldStyle} value={f.homeTeam} onChange={e => set('homeTeam', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Away Team</label>
            <input style={fieldStyle} value={f.awayTeam} onChange={e => set('awayTeam', e.target.value)} placeholder="Opponent" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Competition</label>
            <input style={fieldStyle} value={f.competition} onChange={e => set('competition', e.target.value)} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Venue</label>
            <input style={fieldStyle} value={f.venue} onChange={e => set('venue', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={() => onSave(f)} style={{ flex: 1, background: GOLD_DARK, color: WHITE, border: 'none', padding: '12px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Save Fixture</button>
          <button onClick={onCancel} style={{ padding: '12px 20px', background: 'none', border: `1.5px solid ${OFF_WHITE}`, borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    );
  };

  // ── User form ────────────────────────────────────────────────
  const UserForm = ({ initial, onSave, onCancel }) => {
    const [f, setF] = React.useState(initial);
    const set = (k, v) => setF(p => ({ ...p, [k]: v }));
    const toggleSport = (s) => setF(p => ({ ...p, sports: p.sports.includes(s) ? p.sports.filter(x => x !== s) : [...p.sports, s] }));
    return (
      <div style={{ background: '#f0fff4', border: `2px solid #2ecc71`, borderRadius: 10, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input style={fieldStyle} value={f.name} onChange={e => set('name', e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label style={labelStyle}>Username</label>
            <input style={fieldStyle} value={f.username} onChange={e => set('username', e.target.value)} placeholder="login username" autoComplete="off" />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input type="text" style={fieldStyle} value={f.password} onChange={e => set('password', e.target.value)} placeholder="set password" autoComplete="new-password" />
          </div>
          <div>
            <label style={labelStyle}>Role</label>
            <select style={fieldStyle} value={f.role} onChange={e => set('role', e.target.value)}>
              <option value="sport_admin">Sport Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Permitted Sports</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Rugby','Netball','Squash'].map(s => {
              const active = f.sports.includes(s);
              return (
                <button key={s} type="button" onClick={() => toggleSport(s)} style={{ background: active ? SPORT_COLORS[s].bg : WHITE, color: active ? SPORT_COLORS[s].text : NAVY_DARK, border: `2px solid ${active ? SPORT_COLORS[s].bg : OFF_WHITE}`, padding: '8px 16px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{s}</button>
              );
            })}
          </div>
          {f.role === 'superadmin' && <p style={{ fontSize: 12, color: GRAY, marginTop: 6 }}>Super admins have access to all sports regardless.</p>}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onSave(f)} style={{ flex: 1, background: '#2ecc71', color: WHITE, border: 'none', padding: '12px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Save User</button>
          <button onClick={onCancel} style={{ padding: '12px 20px', background: 'none', border: `1.5px solid ${OFF_WHITE}`, borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    );
  };

  // ── Save handlers ────────────────────────────────────────────
  const saveResult = (r) => {
    const updated = r.id ? results.map(x => x.id === r.id ? r : x) : [...results, { ...r, id: nextId(results) }];
    setResults(updated); saveResults(updated); setEditingResult(null); showToast('Result saved ✓');
  };
  const deleteResult = (id) => {
    if (!confirm('Delete this result?')) return;
    const updated = results.filter(r => r.id !== id);
    setResults(updated); saveResults(updated); showToast('Deleted');
  };
  const saveFixture = (f) => {
    const updated = f.id ? fixtures.map(x => x.id === f.id ? f : x) : [...fixtures, { ...f, id: nextId(fixtures) }];
    setFixtures(updated); saveFixtures(updated); setEditingFixture(null); showToast('Fixture saved ✓');
  };
  const deleteFixture = (id) => {
    if (!confirm('Delete this fixture?')) return;
    const updated = fixtures.filter(f => f.id !== id);
    setFixtures(updated); saveFixtures(updated); showToast('Deleted');
  };
  const saveUser = (u) => {
    if (!u.username.trim() || !u.password.trim()) { alert('Username and password required.'); return; }
    if (u.role === 'superadmin') u.sports = ['Rugby','Netball','Squash'];
    const updated = u.id ? users.map(x => x.id === u.id ? u : x) : [...users, { ...u, id: nextId(users) }];
    setUsers(updated); saveUsers(updated); setEditingUser(null); showToast('User saved ✓');
  };
  const deleteUser = (id) => {
    if (id === currentUser.id) { alert("You can't delete your own account."); return; }
    if (!confirm('Delete this user?')) return;
    const updated = users.filter(u => u.id !== id);
    setUsers(updated); saveUsers(updated); showToast('User deleted');
  };

  const actionBtn = (label, onClick, color) => (
    <button onClick={onClick} style={{ background: 'none', border: `1.5px solid ${color}`, color, padding: '6px 12px', borderRadius: 5, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}>{label}</button>
  );

  const rowStyle = { display: 'flex', gap: 10, alignItems: 'center', padding: '12px 14px', background: WHITE, borderRadius: 8, marginBottom: 8, flexWrap: 'wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

  // Sport rows visible to this user
  const visibleResults = isSuperAdmin ? results : results.filter(r => allowedSports.includes(r.sport));
  const visibleFixtures = isSuperAdmin ? fixtures : fixtures.filter(f => allowedSports.includes(f.sport));

  return (
    <div>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`, borderBottom: `3px solid ${GOLD}`, padding: '20px 16px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: WHITE, textTransform: 'uppercase' }}>Admin Panel</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Logged in as</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: GOLD }}>{currentUser.name}</span>
              {isSuperAdmin && <span style={{ background: GOLD, color: NAVY_DARK, fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 3, letterSpacing: '0.06em' }}>SUPER ADMIN</span>}
              {!isSuperAdmin && allowedSports.map(s => <SportBadge key={s} sport={s} />)}
            </div>
          </div>
          <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.1)', color: WHITE, border: '1px solid rgba(255,255,255,0.2)', padding: '10px 16px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Log Out</button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 16px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: `2px solid ${OFF_WHITE}`, paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 20px', border: 'none', borderRadius: '6px 6px 0 0',
              background: tab === t.id ? NAVY_DARK : 'transparent',
              color: tab === t.id ? WHITE : GRAY,
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16,
              cursor: 'pointer', marginBottom: -2,
              borderBottom: tab === t.id ? `2px solid ${NAVY_DARK}` : 'none',
            }}>{t.label}</button>
          ))}
        </div>

        {/* Results tab */}
        {tab === 'results' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase' }}>
                Match Results
                {!isSuperAdmin && <span style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 400, color: GRAY, marginLeft: 10 }}>({allowedSports.join(', ')} only)</span>}
              </h2>
              <button onClick={() => setEditingResult(emptyResult)} style={{ background: NAVY_DARK, color: WHITE, border: 'none', padding: '10px 18px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>+ Add Result</button>
            </div>
            {editingResult && !editingResult.id && <ResultForm initial={editingResult} onSave={saveResult} onCancel={() => setEditingResult(null)} />}
            {[...visibleResults].sort((a,b) => b.date.localeCompare(a.date)).map(r => (
              <div key={r.id}>
                {editingResult && editingResult.id === r.id
                  ? <ResultForm initial={r} onSave={saveResult} onCancel={() => setEditingResult(null)} />
                  : (
                    <div style={rowStyle}>
                      <SportBadge sport={r.sport} />
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, flex: '1 1 180px' }}>{r.homeTeam} {r.homeScore}–{r.awayScore} {r.awayTeam}</span>
                      <span style={{ fontSize: 12, color: GRAY }}>{r.date}</span>
                      <span style={{ fontSize: 12, color: GRAY, flex: '1 1 100px' }}>{r.competition}</span>
                      <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                        {actionBtn('Edit', () => setEditingResult(r), NAVY_DARK)}
                        {actionBtn('Delete', () => deleteResult(r.id), '#e74c3c')}
                      </div>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        )}

        {/* Fixtures tab */}
        {tab === 'fixtures' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase' }}>
                Fixtures
                {!isSuperAdmin && <span style={{ fontSize: 13, fontFamily: "'Inter',sans-serif", fontWeight: 400, color: GRAY, marginLeft: 10 }}>({allowedSports.join(', ')} only)</span>}
              </h2>
              <button onClick={() => setEditingFixture(emptyFixture)} style={{ background: GOLD_DARK, color: WHITE, border: 'none', padding: '10px 18px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>+ Add Fixture</button>
            </div>
            {editingFixture && !editingFixture.id && <FixtureForm initial={editingFixture} onSave={saveFixture} onCancel={() => setEditingFixture(null)} />}
            {[...visibleFixtures].sort((a,b) => a.date.localeCompare(b.date)).map(f => (
              <div key={f.id}>
                {editingFixture && editingFixture.id === f.id
                  ? <FixtureForm initial={f} onSave={saveFixture} onCancel={() => setEditingFixture(null)} />
                  : (
                    <div style={rowStyle}>
                      <SportBadge sport={f.sport} />
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, flex: '1 1 180px' }}>{f.homeTeam} vs {f.awayTeam}</span>
                      <span style={{ fontSize: 12, color: GRAY }}>{f.date} {f.time}</span>
                      <span style={{ fontSize: 12, color: GRAY, flex: '1 1 100px' }}>{f.venue}</span>
                      <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                        {actionBtn('Edit', () => setEditingFixture(f), GOLD_DARK)}
                        {actionBtn('Delete', () => deleteFixture(f.id), '#e74c3c')}
                      </div>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        )}

        {/* User Management (superadmin only) */}
        {tab === 'users' && isSuperAdmin && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: NAVY_DARK, textTransform: 'uppercase' }}>User Management</h2>
              <button onClick={() => setEditingUser(emptyUser)} style={{ background: '#2ecc71', color: WHITE, border: 'none', padding: '10px 18px', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>+ Add User</button>
            </div>
            <div style={{ background: '#fffbf0', border: `1px solid ${GOLD}`, borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#7a5a00' }}>
              <strong>Tip:</strong> Sport admins can only edit results and fixtures for their assigned sports. Super admins have full access. Passwords are stored locally — use a strong password for admin accounts.
            </div>
            {editingUser && !editingUser.id && <UserForm initial={editingUser} onSave={saveUser} onCancel={() => setEditingUser(null)} />}
            {users.map(u => (
              <div key={u.id}>
                {editingUser && editingUser.id === u.id
                  ? <UserForm initial={u} onSave={saveUser} onCancel={() => setEditingUser(null)} />
                  : (
                    <div style={{ ...rowStyle, borderLeft: `4px solid ${u.role === 'superadmin' ? GOLD : NAVY}` }}>
                      <div style={{ flex: '1 1 120px' }}>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: NAVY_DARK }}>{u.name || u.username}</div>
                        <div style={{ fontSize: 12, color: GRAY }}>@{u.username}</div>
                      </div>
                      <div style={{ flex: '0 0 auto' }}>
                        {u.role === 'superadmin'
                          ? <span style={{ background: GOLD, color: NAVY_DARK, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.06em' }}>SUPER ADMIN</span>
                          : <span style={{ display: 'flex', gap: 4 }}>{u.sports.map(s => <SportBadge key={s} sport={s} />)}</span>
                        }
                      </div>
                      <div style={{ fontSize: 12, color: GRAY, fontFamily: 'monospace', background: '#f5f5f5', padding: '4px 8px', borderRadius: 4 }}>
                        pw: {u.password}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                        {actionBtn('Edit', () => setEditingUser(u), '#2ecc71')}
                        {u.id !== currentUser.id && actionBtn('Delete', () => deleteUser(u.id), '#e74c3c')}
                      </div>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: NAVY_DARK, color: WHITE, padding: '12px 20px', borderRadius: 8, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', zIndex: 999, borderLeft: `4px solid ${GOLD}` }}>{toast}</div>
      )}
    </div>
  );
}

Object.assign(window, { LoginPage, AdminPanel });
