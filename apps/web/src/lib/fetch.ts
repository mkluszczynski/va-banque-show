export function fetchApi(path: string, options: RequestInit = {}) {
    // const apiUrl = "http://localhost:3010"
  const apiUrl = "https://va-banque-api.mkluszczynski.dev"
  return fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function getApi(path: string, options: RequestInit = {}) {
  return fetchApi(path, { ...options, method: "GET" });
}

export function postApi(path: string, data: object, options: RequestInit = {}) {
  return fetchApi(path, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function putApi(path: string, data: object, options: RequestInit = {}) {
  return fetchApi(path, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteApi(path: string, options: RequestInit = {}) {
  return fetchApi(path, { ...options, method: "DELETE" });
}