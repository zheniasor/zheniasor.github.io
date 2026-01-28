export function renderPost(post, user) {
  const div = document.createElement("div");
  div.className = "bg-white p-4 rounded shadow mb-4";

  div.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
    <p class="mb-2">${post.body}</p>
    <p class="text-sm text-gray-500">Автор: ${user.name} (${user.email})</p>
  `;
  return div;
}

export function renderUserCheckbox(user) {
  const label = document.createElement("label");
  label.className = "flex items-center gap-1";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = user.id;

  label.appendChild(checkbox);
  label.append(document.createTextNode(user.email));
  return label;
}

export function showLoader() {
  let el = document.getElementById("loader");
  if (!el) {
    el = document.createElement("div");
    el.id = "loader";
    el.textContent = "Загрузка...";
    el.className = "text-center p-4 text-gray-500";
    document.body.appendChild(el);
  }
}

export function hideLoader() {
  const el = document.getElementById("loader");
  if (el) el.remove();
}
