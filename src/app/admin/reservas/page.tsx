"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ReservasAdmin() {

  const [authorized, setAuthorized] =
    useState(false);

  const [reservations, setReservations] =
    useState<any[]>([]);

  const [date, setDate] =
    useState(new Date());

  useEffect(() => {

    checkAdmin();

  }, []);

  const checkAdmin = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // SI NO HAY LOGIN

    if (!user) {

      window.location.href = "/login";

      return;

    }

    // SOLO ADMIN

    if (
      user.email !==
      "magrcrd@gmail.com"
    ) {

      alert(
        "No autorizado"
      );

      window.location.href = "/";

      return;

    }

    setAuthorized(true);

    fetchReservations();

  };

  const fetchReservations = async () => {

    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      setReservations(data);

    }

  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);

    fetchReservations();

  };

  // BLOQUEAR PANTALLA

  if (!authorized) {

    return null;

  }

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Reservas
        </h1>

        <p className="text-gray-400 mb-10">
          Gestión de reservas de clientes
        </p>

        {/* CALENDARIO */}

        <div className="bg-white text-black p-6 rounded-3xl mb-10">

          <Calendar
            onChange={(value) =>
              setDate(value as Date)
            }
            value={date}
          />

        </div>

        {/* RESERVAS */}

        <div className="grid gap-6">

          {reservations.map((reservation) => (

            <div
              key={reservation.id}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-6"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <h2 className="text-2xl font-bold mb-4">
                    {reservation.car_name}
                  </h2>

                  <div className="space-y-2 text-gray-300">

                    <p>
                      <span className="font-bold text-white">
                        Cliente:
                      </span>{" "}
                      {reservation.customer_name}
                    </p>

                    <p>
                      <span className="font-bold text-white">
                        Teléfono:
                      </span>{" "}
                      {reservation.phone}
                    </p>

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

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      updateStatus(
                        reservation.id,
                        "confirmada"
                      )
                    }
                    className="bg-green-500 text-black px-5 py-3 rounded-2xl font-bold"
                  >
                    Confirmar
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        reservation.id,
                        "cancelada"
                      )
                    }
                    className="bg-red-500 px-5 py-3 rounded-2xl font-bold"
                  >
                    Cancelar
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}