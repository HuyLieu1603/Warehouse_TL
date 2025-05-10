import React from "react";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  return <h1>Xin chào, {user?.name || "User"}!</h1>;
}
