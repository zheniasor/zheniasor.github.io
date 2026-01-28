import { fetchPosts, fetchUser, fetchAllUsers } from './api.js';
import { renderPost, renderUserCheckbox, showLoader, hideLoader } from './renderer.js';

const postsContainer = document.querySelector("#todos");
const searchInput = document.querySelector("#search");
const filtersContainer = document.querySelector("#filters");

let state = {
  page: 1,
  title: "",
  userIds: [],
  loading: false,
  observer: null,
};

function debounce(fn, delay = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

async function loadUsers() {
  try {
    const users = await fetchAllUsers();
    users.forEach(user => {
      const label = renderUserCheckbox(user);
      const checkbox = label.querySelector("input");
      checkbox.addEventListener("change", () => {
        state.userIds = Array.from(
          filtersContainer.querySelectorAll("input:checked")
        ).map(i => i.value);
        resetAndLoad();
      });
      filtersContainer.appendChild(label);
    });
  } catch (e) {
    alert("Ошибка при загрузке пользователей: " + e.message);
  }
}

const debouncedSearch = debounce(() => {
  state.title = searchInput.value;
  resetAndLoad();
});

searchInput.addEventListener("input", debouncedSearch);

function resetAndLoad() {
  state.page = 1;
  postsContainer.innerHTML = "";
  loadPosts();
}

async function loadPosts() {
  if (state.loading) return;
  state.loading = true;
  showLoader();

  try {
    const posts = await fetchPosts({
      page: state.page,
      title: state.title,
      userIds: state.userIds
    });

    for (const post of posts) {
      const user = await fetchUser(post.userId);
      const postEl = renderPost(post, user);
      postsContainer.appendChild(postEl);
    }

    if (posts.length) {
      setupInfiniteScroll(postsContainer.lastChild);
    }
  } catch (e) {
    alert("Ошибка при загрузке постов: " + e.message);
  } finally {
    hideLoader();
    state.loading = false;
  }
}

function setupInfiniteScroll(element) {
  if (state.observer) state.observer.disconnect();
  state.observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      state.page++;
      loadPosts();
    }
  });
  state.observer.observe(element);
}

loadUsers();
loadPosts();
