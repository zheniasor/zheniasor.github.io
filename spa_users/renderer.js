let scrollHandler = null;

function renderUsers(users) {
  const app = document.getElementById('app');
  app.innerHTML = `<h1>Пользователи</h1><ul>
    ${users.map(u => `<li><a href="#users/${u.id}">${u.name}</a></li>`).join('')}
  </ul>`;
}

function renderAlbums(albums, userId) {
  const app = document.getElementById('app');
  app.innerHTML = `<h1>Альбомы пользователя ${userId}</h1><ul>
    ${albums.map(a => `<li><a href="#users/${userId}/${a.id}">${a.title}</a></li>`).join('')}
  </ul>`;
}

function renderPhotos(photos) {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Фотографии альбома</h1><div id="photo-container" class="photo-grid"></div>';

  const container = document.getElementById('photo-container');
  let currentIndex = 0;
  const perPage = 15;

  function loadNextPage() {
    const nextPhotos = photos.slice(currentIndex, currentIndex + perPage);
    nextPhotos.forEach(photo => {
      const div = document.createElement('div');
      div.classList.add('photo-card');
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.title;
      img.onerror = () => { img.src = 'https://via.placeholder.com/150?text=No+Image'; };
      const caption = document.createElement('p');
      caption.textContent = photo.title;
      div.appendChild(img);
      div.appendChild(caption);
      container.appendChild(div);
    });
    currentIndex += perPage;
    if (currentIndex >= photos.length) {
      window.removeEventListener('scroll', scrollHandler);
    }
  }

  scrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadNextPage();
    }
  };

  window.addEventListener('scroll', scrollHandler);
  loadNextPage();
}

function renderNotFound(message) {
  const app = document.getElementById('app');
  app.innerHTML = `<h1>404</h1><p>${message}</p>`;
}