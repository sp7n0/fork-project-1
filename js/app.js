// script.js (improved and cleaned up version)

// Build navigation bar dynamically
const navList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

sections.forEach(section => {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${section.id}`;
  link.textContent = section.dataset.nav || section.querySelector('h2')?.textContent || section.id;
  link.className = 'menu__link';

  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.menu__link.active').forEach(el => el.classList.remove('active'));
    link.classList.add('active');
    section.scrollIntoView({ behavior: 'smooth' });
  });

  listItem.appendChild(link);
  navList.appendChild(listItem);
});

// Create and insert comment section and form
const commentSection = document.createElement('section');
commentSection.className = 'comment__section';
commentSection.id = 'comments-section';
commentSection.dataset.nav = 'Comments';

const sectionContainer = document.createElement('div');
sectionContainer.className = 'landing__container';

const form = document.createElement('form');
form.id = 'comment-form';
form.innerHTML = `
  <h2>Leave a Comment</h2>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <label for="comment">Comment:</label>
  <textarea id="comment" name="comment" rows="4" required></textarea>

  <button type="submit">Submit</button>
`;

const commentList = document.createElement('div');
commentList.id = 'comments';

sectionContainer.append(form, commentList);
commentSection.appendChild(sectionContainer);
document.body.appendChild(commentSection);

// Re-add comment section to nav after DOM update
const commentNavItem = document.createElement('li');
const commentNavLink = document.createElement('a');
commentNavLink.href = '#comments-section';
commentNavLink.textContent = 'Comments';
commentNavLink.className = 'menu__link';

commentNavLink.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.menu__link.active').forEach(el => el.classList.remove('active'));
  commentNavLink.classList.add('active');
  commentSection.scrollIntoView({ behavior: 'smooth' });
});

commentNavItem.appendChild(commentNavLink);
navList.appendChild(commentNavItem);

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const comment = form.comment.value.trim();

  const commentEl = document.createElement('div');
  commentEl.className = 'comment';
  commentEl.innerHTML = `
    <h4>${name} <span>(${email})</span></h4>
    <p>${comment}</p>
  `;
  commentList.appendChild(commentEl);

  form.reset();
});

// Add active class to section in viewport
window.addEventListener('scroll', () => {
  let currentSection = null;
  let minOffset = window.innerHeight;

  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < minOffset) {
      currentSection = section;
      minOffset = rect.top;
    }
  });

  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });

  if (currentSection) {
    currentSection.classList.add('active');
  }
});
