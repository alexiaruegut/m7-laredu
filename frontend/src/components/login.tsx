import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Credenciales incorrectas");
        }
        return res.json();
      })
      .then((data) => {
        onLoginSuccess(data.token);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-400 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="email" placeholder="Email" className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 transition-all">Iniciar Sesión</button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
