const slides = [...document.querySelectorAll('.slide')];
const current = document.querySelector('#current-slide');
const back = document.querySelector('#back');
const next = document.querySelector('#next');
let index = 0;

function showSlide(target) {
  index = Math.max(0, Math.min(target, slides.length - 1));
  slides.forEach((slide, i) => {
    const active = i === index;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  current.textContent = String(index + 1).padStart(2, '0');
  back.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  next.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible';
}

back.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showSlide(index - 1);
  if (event.key === 'ArrowRight') showSlide(index + 1);
});

showSlide(0);

let effectiveTeamId = '';
let effectiveLaunchToken = '';

try {
  const p = new URLSearchParams(window.location.search);
  const urlTeam = (p.get('team') || p.get('teamId') || '').trim().toUpperCase();
  const urlToken = (p.get('launchToken') || '').trim();

  let storedTeam = (sessionStorage.getItem('manu_team_id') || localStorage.getItem('manu_team_id') || '').trim().toUpperCase();
  let storedToken = (sessionStorage.getItem('tld_launch_token') || localStorage.getItem('tld_launch_token') || '').trim();

  // Purge stale TECHTEAM10328
  if (storedTeam === 'TECHTEAM10328' && urlTeam !== 'TECHTEAM10328') {
    sessionStorage.removeItem('manu_team_id');
    localStorage.removeItem('manu_team_id');
    sessionStorage.removeItem('tld_launch_token');
    localStorage.removeItem('tld_launch_token');
    storedTeam = '';
    storedToken = '';
  }

  effectiveTeamId = urlTeam || (storedTeam !== 'TECHTEAM10328' ? storedTeam : '');
  effectiveLaunchToken = urlToken || storedToken;

  if (effectiveLaunchToken && effectiveTeamId && effectiveTeamId !== 'TECHTEAM10328') {
    try {
      const payload = JSON.parse(atob(effectiveLaunchToken.split('.')[0].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload && (payload.teamId === 'TECHTEAM10328' || payload.team === 'TECHTEAM10328')) {
        effectiveLaunchToken = '';
        sessionStorage.removeItem('tld_launch_token');
        localStorage.removeItem('tld_launch_token');
      }
    } catch (_) {}
  }

  if (effectiveTeamId && effectiveTeamId !== 'TECHTEAM10328') {
    sessionStorage.setItem('manu_team_id', effectiveTeamId);
    localStorage.setItem('manu_team_id', effectiveTeamId);
  }
  if (effectiveLaunchToken) {
    sessionStorage.setItem('tld_launch_token', effectiveLaunchToken);
    localStorage.setItem('tld_launch_token', effectiveLaunchToken);
  }
} catch (e) {}

const teamId = effectiveTeamId;
const launchToken = effectiveLaunchToken;

const cta = document.querySelector('.cta');
if (cta) {
  const base = 'https://last-dataset.vercel.app/purple';
  const params = new URLSearchParams();
  if (teamId) params.set('team', teamId);
  if (launchToken) params.set('launchToken', launchToken);
  const qs = params.toString();
  cta.href = qs ? `${base}?${qs}` : base;
}

const mapBtn = document.querySelector('#central-map-link');
if (mapBtn && teamId) {
  mapBtn.href = `https://last-dataset.vercel.app/?team=${encodeURIComponent(teamId)}`;
}
