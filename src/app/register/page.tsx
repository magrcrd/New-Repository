"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {

      alert(error.message);

      return;

    }

    alert("Cuenta creada correctamente");

    window.location.href = "/login";

  };

  return (

    <main className="bg-black text-white min-h-screen flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8">

        <p className="text-[#D4A017] uppercase tracking-[5px] text-sm mb-3">
          MAG RENT CAR
        </p>

        <h1 className="text-3xl font-bold mb-8">
          Crear Cuenta
        </h1>

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
            onClick={handleRegister}
            className="w-full bg-[#D4A017] text-black py-4 rounded-2xl font-bold"
          >
            Crear Cuenta
          </button>

        </div>

      </div>

    </main>

  );
}