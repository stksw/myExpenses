"use client";
import axios from "axios";

export const ServerApi = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ProviderAxios = ({ children }: { children: React.ReactNode }) => {
  return <div>loading...</div>;
};
