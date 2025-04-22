import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.181:3000/admin',
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("usertoken");

  try {
    const response = await axios.post("http://192.168.2.181:3000/admin/refresh_token", null, {
      headers: {
        refresh_token: refreshToken,
      },
    });

    const { token, refresh_token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("usertoken", refresh_token);

    return token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("usertoken");

  if (token) config.headers['Authorization'] = token;
  if (refreshToken) config.headers['refresh_token'] = refreshToken;
  config.headers['language'] = 'en';

  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers['Authorization'] = newToken;
        return api(originalRequest); 
      }
    }

    return Promise.reject(error);
  }
);

export default api;
