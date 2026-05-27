"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    // LOGIN

    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {

      alert(error.message);

      return;

    }

    // USUARIO DEL LOGIN ACTUAL

    const user =
      data.user;

    // ADMIN

    if (
      user?.email ===
      "magrcrd@gmail.com"
    ) {

      window.location.href =
        "/admin/vehiculos";

    } else {

      // CLIENTE

      window.location.href =
        "/perfil";

    }

  };

  return (

    <main className="bg-black text-white min-h-screen flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8">

        <p className="text-[#D4A017] uppercase tracking-[5px] text-sm mb-3">
          MAG RENT CAR
        </p>

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Iniciar Sesión
          </h1>

          <a
            href="/"
            className="bg-white text-black px-4 py-2 rounded-2xl font-bold text-sm"
          >
            Inicio
          </a>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4A017]"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4A017]"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#D4A017] text-black py-4 rounded-2xl font-bold"
          >
            Entrar
          </button>

        </div>

      </div>

    </main>

  );
}