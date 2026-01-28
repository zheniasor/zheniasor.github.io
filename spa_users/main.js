async function router() {
  const hash = window.location.hash.slice(1);
  const app = document.getElementById('app');

  const parts = hash.split('/').filter(Boolean);

  if (hash === '' || hash === 'users') {
    const users = await fetchUsers();
    renderUsers(users);
  } else if (parts[0] === 'users' && parts[1] && !parts[2]) {
    const userId = Number(parts[1]);
    const albums = await fetchAlbums(userId);
    if (albums.length) {
      renderAlbums(albums, userId);
    } else {
      renderNotFound(`Альбомы для пользователя ${userId} не найдены.`);
    }
  } else if (parts[0] === 'users' && parts[1] && parts[2]) {
    const albumId = Number(parts[2]);
    const photos = await fetchPhotos(albumId);
    if (photos.length) {
      renderPhotos(photos);
    } else {
      renderNotFound(`Фотографии альбома ${albumId} не найдены.`);
    }
  } else {
    renderNotFound('Страница не найдена.');
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);