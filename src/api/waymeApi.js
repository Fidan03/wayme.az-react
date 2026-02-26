// src/api/waymeApi.js

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
    const errBody = isJson
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    throw new Error(
      errBody?.message || errBody?.error || (typeof errBody === "string" ? errBody : "") || `HTTP ${res.status}`
    );
  }

  return isJson ? res.json() : res.text();
}

export const WayMeAPI = {
  // POST /WayMe/sessions/start
  startSession() {
    return apiFetch(`/sessions/start`, { method: "POST" });
  },

  // POST /WayMe/sessions/{sessionId}/personal-info
  personalInfo(sessionId, body) {
    return apiFetch(`/sessions/${sessionId}/personal-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  },

  // POST /WayMe/sessions/{sessionId}/abilities
  abilities(sessionId, abilitiesArray) {
    return apiFetch(`/sessions/${sessionId}/abilities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(abilitiesArray),
    });
  },

  // POST /WayMe/sessions/{id}/direction/{subdirectionId}
  direction(sessionId, subdirectionId) {
    return apiFetch(`/sessions/${sessionId}/direction/${subdirectionId}`, {
      method: "POST",
    });
  },

  // POST /WayMe/sessions/{sessionId}/answers/bulk
  answersBulk(sessionId, answers) {
    // answers: [{testId, optionId}, ...]
    return apiFetch(`/sessions/${sessionId}/answers/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
  },
};