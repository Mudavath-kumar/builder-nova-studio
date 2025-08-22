export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token is invalid or expired, redirect to login
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return response;
};
