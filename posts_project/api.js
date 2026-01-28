const API_URL = "https://jsonplaceholder.typicode.com";

const userCache = new Map();

export async function fetchPosts({ page = 1, title = "", userIds = [] }) {
  const params = new URLSearchParams();
  params.set("_limit", 10);
  params.set("_page", page);
  if (title) params.set("title_like", title);
  userIds.forEach(id => params.append("userId", id));

  const res = await fetch(`${API_URL}/posts?${params.toString()}`);
  if (!res.ok) throw new Error("Ошибка при загрузке постов");
  return res.json();
}

export async function fetchUser(id) {
  if (userCache.has(id)) return userCache.get(id);
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error("Ошибка при загрузке пользователя");
  const user = await res.json();
  userCache.set(id, user);
  return user;
}

export async function fetchAllUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Ошибка при загрузке списка пользователей");
  return res.json();
}
