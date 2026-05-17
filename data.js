// ============================================================
// Ōtorohanga Sports Club — Data Layer
// All data persisted to localStorage
// ============================================================

const STORAGE_KEYS = {
  results:      'otsc_results',
  fixtures:     'otsc_fixtures',
  people:       'otsc_people',
  liveGames:    'otsc_live_games',
  users:        'otsc_users',
  affiliations: 'otsc_affiliations',
};

const SAMPLE_RESULTS = [
  { id: 1, sport: 'Rugby', homeTeam: 'Ōtorohanga', awayTeam: 'Te Awamutu', homeScore: 28, awayScore: 14, date: '2025-04-19', competition: 'King Country Club Championship', venue: 'Memorial Park' },
  { id: 2, sport: 'Rugby', homeTeam: 'Taumarunui', awayTeam: 'Ōtorohanga', homeScore: 17, awayScore: 22, date: '2025-04-12', competition: 'King Country Club Championship', venue: 'Taumarunui' },
  { id: 3, sport: 'Rugby', homeTeam: 'Ōtorohanga', awayTeam: 'Waitomo', homeScore: 34, awayScore: 10, date: '2025-04-05', competition: 'King Country Club Championship', venue: 'Memorial Park' },
  { id: 4, sport: 'Rugby', homeTeam: 'Piopio', awayTeam: 'Ōtorohanga', homeScore: 21, awayScore: 21, date: '2025-03-29', competition: 'King Country Club Championship', venue: 'Piopio' },
  { id: 5, sport: 'Netball', homeTeam: 'Ōtorohanga A', awayTeam: 'Te Awamutu Aces', homeScore: 42, awayScore: 38, date: '2025-04-19', competition: 'Waikato Netball League', venue: 'Ōtorohanga Recreation Centre' },
  { id: 6, sport: 'Netball', homeTeam: 'Hamilton Pulse', awayTeam: 'Ōtorohanga A', homeScore: 35, awayScore: 44, date: '2025-04-12', competition: 'Waikato Netball League', venue: 'Hamilton' },
  { id: 7, sport: 'Netball', homeTeam: 'Ōtorohanga B', awayTeam: 'Cambridge Comets', homeScore: 29, awayScore: 31, date: '2025-04-19', competition: 'Waikato Netball League Div 2', venue: 'Ōtorohanga Recreation Centre' },
  { id: 8, sport: 'Squash', homeTeam: 'Ōtorohanga', awayTeam: 'Morrinsville', homeScore: 4, awayScore: 1, date: '2025-04-17', competition: 'King Country Squash Interclub', venue: 'Ōtorohanga Squash Club' },
  { id: 9, sport: 'Squash', homeTeam: 'Putaruru', awayTeam: 'Ōtorohanga', homeScore: 2, awayScore: 3, date: '2025-04-10', competition: 'King Country Squash Interclub', venue: 'Putaruru' },
  { id: 10, sport: 'Squash', homeTeam: 'Ōtorohanga', awayTeam: 'Cambridge', homeScore: 3, awayScore: 2, date: '2025-04-03', competition: 'King Country Squash Interclub', venue: 'Ōtorohanga Squash Club' },
];

const SAMPLE_FIXTURES = [
  { id: 1, sport: 'Rugby', homeTeam: 'Ōtorohanga', awayTeam: 'Otorohanga Pirates', date: '2025-05-03', time: '14:30', venue: 'Memorial Park', competition: 'King Country Club Championship' },
  { id: 2, sport: 'Rugby', homeTeam: 'Te Kuiti', awayTeam: 'Ōtorohanga', date: '2025-05-10', time: '15:00', venue: 'Te Kuiti Domain', competition: 'King Country Club Championship' },
  { id: 3, sport: 'Rugby', homeTeam: 'Ōtorohanga', awayTeam: 'Taumarunui', date: '2025-05-17', time: '14:30', venue: 'Memorial Park', competition: 'King Country Club Championship' },
  { id: 4, sport: 'Netball', homeTeam: 'Ōtorohanga A', awayTeam: 'Matamata Stars', date: '2025-05-03', time: '13:00', venue: 'Ōtorohanga Recreation Centre', competition: 'Waikato Netball League' },
  { id: 5, sport: 'Netball', homeTeam: 'Ōtorohanga B', awayTeam: 'Huntly Heat', date: '2025-05-03', time: '14:30', venue: 'Ōtorohanga Recreation Centre', competition: 'Waikato Netball League Div 2' },
  { id: 6, sport: 'Netball', homeTeam: 'Ngaruawahia', awayTeam: 'Ōtorohanga A', date: '2025-05-10', time: '12:00', venue: 'Ngaruawahia', competition: 'Waikato Netball League' },
  { id: 7, sport: 'Squash', homeTeam: 'Ōtorohanga', awayTeam: 'Te Awamutu', date: '2025-05-01', time: '18:30', venue: 'Ōtorohanga Squash Club', competition: 'King Country Squash Interclub' },
  { id: 8, sport: 'Squash', homeTeam: 'Ōtorohanga', awayTeam: 'Tokoroa', date: '2025-05-08', time: '18:30', venue: 'Ōtorohanga Squash Club', competition: 'King Country Squash Interclub' },
];

const SAMPLE_LIVE_GAMES = [
  {
    id: 1,
    sport: 'Rugby',
    homeTeam: 'Ōtorohanga',
    awayTeam: 'Te Awamutu',
    homeScore: 14,
    awayScore: 10,
    status: 'live',
    period: '2nd Half',
    minute: 58,
    competition: 'King Country Club Championship',
    venue: 'Memorial Park',
    events: [
      { time: 8, type: 'try', team: 'home', player: 'J. Tūhoe', description: 'Try — J. Tūhoe' },
      { time: 10, type: 'conversion', team: 'home', player: 'M. Reweti', description: 'Conversion — M. Reweti' },
      { time: 23, type: 'penalty', team: 'away', player: '', description: 'Penalty goal — Te Awamutu' },
      { time: 37, type: 'try', team: 'away', player: 'T. Heke', description: 'Try — T. Heke' },
      { time: 45, type: 'penalty', team: 'home', player: 'M. Reweti', description: 'Penalty goal — M. Reweti' },
      { time: 51, type: 'yellowCard', team: 'away', player: 'B. Ngata', description: 'Yellow card — B. Ngata (Te Awamutu)' },
      { time: 56, type: 'try', team: 'home', player: 'K. Parata', description: 'Try — K. Parata' },
    ]
  }
];

const SAMPLE_PEOPLE = [
  // Club leadership
  { id: 1, sport: 'Club', role: 'President', name: 'Hemi Tūhoe', bio: 'Born and raised in Ōtorohanga, Hemi has been involved with the club for over 30 years.' },
  { id: 2, sport: 'Club', role: 'Secretary', name: 'Aroha Reweti', bio: 'Aroha handles the day-to-day administration and keeps the club running smoothly.' },
  { id: 3, sport: 'Club', role: 'Treasurer', name: 'Dave Parata', bio: 'Dave brings a background in accounting and has been club treasurer for 8 years.' },
  { id: 4, sport: 'Club', role: 'Grounds Manager', name: 'Tāne Heke', bio: 'Tāne maintains Memorial Park and the squash courts to a consistently high standard.' },
  // Rugby
  { id: 5, sport: 'Rugby', role: 'Head Coach', name: 'Wiremu Ngata', bio: 'Former King Country rep, Wiremu has coached the senior side for 5 seasons.' },
  { id: 6, sport: 'Rugby', role: 'Captain', name: 'Jordan Tūhoe', bio: 'A powerful loosehead prop, Jordan leads by example on and off the field.' },
  { id: 7, sport: 'Rugby', role: 'Manager', name: 'Craig Mōrehu', bio: 'Craig organises travel, registrations, and everything in between.' },
  // Netball
  { id: 8, sport: 'Netball', role: 'Head Coach', name: 'Mere Parata', bio: 'Mere played Waikato premier netball for a decade and now coaches both senior teams.' },
  { id: 9, sport: 'Netball', role: 'A Team Captain', name: 'Steph Walker', bio: 'Steph is a dynamic goal shooter who has been club player of the year three times.' },
  { id: 10, sport: 'Netball', role: 'Manager', name: 'Tracey Hī', bio: 'Tracey keeps both netball squads organised and the vibe positive.' },
  // Squash
  { id: 11, sport: 'Squash', role: 'Head Coach', name: 'Ray Tūhou', bio: 'A B-grade national competitor, Ray runs weekly coaching clinics for all levels.' },
  { id: 12, sport: 'Squash', role: 'Club Captain', name: 'Ana Rēweti', bio: 'Ana has won the club championship four years running and leads the interclub team.' },
  { id: 13, sport: 'Squash', role: 'Manager', name: 'Phil Mōrehu', bio: 'Phil handles draws, grading, and court bookings.' },
];

const SAMPLE_USERS = [
  { id: 1, username: 'admin', password: 'OtoroAdmin25', role: 'superadmin', name: 'Club Admin', sports: ['Rugby','Netball','Squash'] },
  { id: 2, username: 'rugby', password: 'Rugby2025', role: 'sport_admin', name: 'Rugby Admin', sports: ['Rugby'] },
  { id: 3, username: 'netball', password: 'Netball2025', role: 'sport_admin', name: 'Netball Admin', sports: ['Netball'] },
  { id: 4, username: 'squash', password: 'Squash2025', role: 'sport_admin', name: 'Squash Admin', sports: ['Squash'] },
];

const SAMPLE_AFFILIATIONS = [
  { id: 1, name: 'Hemi Tūhoe', memberNumber: 'OTC-0001', sports: ['Rugby'], tier: 'Full Member', year: 2025, joined: 2018 },
  { id: 2, name: 'Aroha Reweti', memberNumber: 'OTC-0002', sports: ['Netball','Rugby'], tier: 'Full Member', year: 2025, joined: 2015 },
  { id: 3, name: 'Dave Parata', memberNumber: 'OTC-0003', sports: ['Squash'], tier: 'Social Member', year: 2025, joined: 2020 },
  { id: 4, name: 'Wiremu Ngata', memberNumber: 'OTC-0004', sports: ['Rugby'], tier: 'Life Member', year: 2025, joined: 2001 },
  { id: 5, name: 'Mere Parata', memberNumber: 'OTC-0005', sports: ['Netball'], tier: 'Full Member', year: 2025, joined: 2012 },
  { id: 6, name: 'Ray Tūhou', memberNumber: 'OTC-0006', sports: ['Squash'], tier: 'Full Member', year: 2025, joined: 2019 },
  { id: 7, name: 'Steph Walker', memberNumber: 'OTC-0007', sports: ['Netball'], tier: 'Full Member', year: 2025, joined: 2021 },
  { id: 8, name: 'Jordan Tūhoe', memberNumber: 'OTC-0008', sports: ['Rugby'], tier: 'Full Member', year: 2025, joined: 2017 },
  { id: 9, name: 'Ana Rēweti', memberNumber: 'OTC-0009', sports: ['Squash'], tier: 'Full Member', year: 2025, joined: 2016 },
  { id: 10, name: 'Tāne Heke', memberNumber: 'OTC-0010', sports: ['Rugby','Squash'], tier: 'Life Member', year: 2025, joined: 1998 },
];

// ============================================================
// Data access helpers
// ============================================================

function loadData(key, sample) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return sample ? JSON.parse(JSON.stringify(sample)) : [];
}

function saveData(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e) {}
}

function getResults()       { return loadData(STORAGE_KEYS.results, SAMPLE_RESULTS); }
function getFixtures()      { return loadData(STORAGE_KEYS.fixtures, SAMPLE_FIXTURES); }
function getPeople()        { return loadData(STORAGE_KEYS.people, SAMPLE_PEOPLE); }
function getLiveGames()     { return loadData(STORAGE_KEYS.liveGames, SAMPLE_LIVE_GAMES); }
function getUsers()         { return loadData(STORAGE_KEYS.users, SAMPLE_USERS); }
function getAffiliations()  { return loadData(STORAGE_KEYS.affiliations, SAMPLE_AFFILIATIONS); }

function saveResults(d)      { saveData(STORAGE_KEYS.results, d); }
function saveFixtures(d)     { saveData(STORAGE_KEYS.fixtures, d); }
function savePeople(d)       { saveData(STORAGE_KEYS.people, d); }
function saveLiveGames(d)    { saveData(STORAGE_KEYS.liveGames, d); }
function saveUsers(d)        { saveData(STORAGE_KEYS.users, d); }
function saveAffiliations(d) { saveData(STORAGE_KEYS.affiliations, d); }

function nextId(arr) { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; }

// Authenticate a user — returns user object or null
function authenticateUser(username, password) {
  const users = getUsers();
  return users.find(u => u.username === username && u.password === password) || null;
}

Object.assign(window, {
  getResults, saveResults,
  getFixtures, saveFixtures,
  getPeople, savePeople,
  getLiveGames, saveLiveGames,
  getUsers, saveUsers,
  getAffiliations, saveAffiliations,
  authenticateUser,
  nextId,
  SPORT_LIST: ['Rugby', 'Netball', 'Squash'],
});
