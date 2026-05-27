"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Perfil() {

  const [user, setUser] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {

    getUser();

  }, []);

  const getUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      window.location.href = "/login";

      return;

    }

    setUser(user);

    fetchReservations(user.email!);

  };

  const fetchReservations = async (
    email: string
  ) => {

    const { data } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_email", email);

    if (data) {

      setReservations(data);

    }

  };

  const handleLogout = async () => {

    await supabase.auth.signOut();

    window.location.href = "/login";

  };

  return (

    <main className="bg-black text-white min-h-screen px-5 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-[#D4A017] uppercase tracking-[4px] text-sm mb-2">
              MAG RENT CAR
            </p>

            <h1 className="text-3xl font-bold">
              Mi Perfil
            </h1>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-3 rounded-2xl font-bold"
          >
            Cerrar Sesión
          </button>

        </div>

        {/* USER */}

        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 mb-10">

          <p className="text-gray-400 mb-2">
            Correo
          </p>

          <p className="text-xl font-semibold">
            {user?.email}
          </p>

        </div>

        {/* RESERVAS */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Mis Reservas
          </h2>

          <div className="grid gap-5">

            {reservations.map((reservation, index) => (

              <div
                key={index}
                className="bg-zinc-900 border border-white/10 rounded-3xl p-6"
              >

                <h3 className="text-xl font-bold mb-3">
                  {reservation.car_name}
                </h3>

                <div className="space-y-2 text-gray-300">

                  <p>
                    <span className="font-bold text-white">
                      Inicio:
                    </span>{" "}
                    {new Date(
                      reservation.start_date
                    ).toLocaleDateString("es-DO")}
                  </p>

                  <p>
                    <span className="font-bold text-white">
                      Final:
                    </span>{" "}
                    {new Date(
                      reservation.end_date
                    ).toLocaleDateString("es-DO")}
                  </p>

                  <p>
                    <span className="font-bold text-white">
                      Estado:
                    </span>{" "}
                    {reservation.status}
                  </p>

                </div>

              </div>

            ))}

            {reservations.length === 0 && (

              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-10 text-center text-gray-400">

                No tienes reservas todavía

              </div>

            )}

          </div>

        </div>

      </div>

    </main>

  );
}