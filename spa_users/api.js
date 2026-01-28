const API_BASE = 'https://jsonplaceholder.typicode.com';

async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return await res.json();
}

async function fetchAlbums(userId) {
  const res = await fetch(`${API_BASE}/albums?userId=${userId}`);
  return await res.json();
}

async function fetchPhotos(albumId) {
  const res = await fetch(`${API_BASE}/photos?albumId=${albumId}`);
  return await res.json();
}