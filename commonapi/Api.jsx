'use client'
import axios from 'axios';
import { useState } from 'react';

const api = axios.create({
  baseURL: 'http://192.168.2.180:3000/admin',
});

// Refresh access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("usertoken");

  if (!refreshToken) {
    console.error("No refresh token found");
    return null;
  }

  console.log("Refreshing token with refresh_token:", refreshToken);

  try {
    const response = await axios.post(
      "http://192.168.2.180:3000/admin/refresh_token", 
      null, 
      {
        headers: {
          refresh_token: refreshToken, // Ensure this is correct
        }
      }
    );

    console.log("Server Response:", response);

    const { token, refresh_token } = response.data;
    if (token && refresh_token) {
      localStorage.setItem("token", token);
      localStorage.setItem("usertoken", refresh_token);
      return token;
    } else {
      console.error("Invalid response from server:", response.data);
      return null;
    }

  } catch (error) {
    console.error("Token refresh failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("usertoken");

  if (token) config.headers['Authorization'] = `Bearer ${token}`; // Adding 'Bearer' before the token
  if (refreshToken) config.headers['refresh_token'] = refreshToken;
  config.headers['language'] = 'en'; // Optionally, set the language header

  return config;
});

// Response interceptor to handle expired token (403 errors)
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("Refreshing token due to 403 error...");

      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest); 
      } else {
        console.error("Failed to refresh token");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
