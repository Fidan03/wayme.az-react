async function apiFetch(path, options = {}) {
  const res = await fetch(`/api/WayMe${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");

  if (!res.ok) {
    const err = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");
    throw new Error(err?.message || err?.error || err || `HTTP ${res.status}`);
  }

  return isJson ? res.json() : res.text();
}

export const WayMeAPI = {
  startSession() {
    return apiFetch(`/sessions/start`, { method: "POST" });
  }
};