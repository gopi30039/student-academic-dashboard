const navLinks = document.querySelectorAll('.nav-link, [data-page]');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');

function showPage(name) {
  pages.forEach(page => page.classList.toggle('active-page', page.id === name));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === name));
  const active = document.querySelector(`.nav-link[data-page="${name}"]`);
  pageTitle.textContent = active ? active.textContent.trim().replace(/^[^\w]+/, '') : 'Overview';
  document.getElementById('sidebar').classList.remove('open');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
navLinks.forEach(link => link.addEventListener('click', event => {
  const name = link.dataset.page;
  if (name) { event.preventDefault(); showPage(name); }
}));
document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
document.getElementById('today').textContent = new Date().toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});

function updatePending() {
  const remaining = document.querySelectorAll('#allTasks .complete-btn:not(.done)').length;
  document.getElementById('pendingCount').textContent = remaining;
}
function completeTask(button) {
  button.classList.toggle('done');
  const isDone = button.classList.contains('done');
  button.textContent = isDone ? '✓ Completed' : 'Mark complete';
  updatePending();
}
window.completeTask = completeTask;
