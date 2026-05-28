"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function VehiculoDetalle() {

  const params = useParams();

  const [car, setCar] =
    useState<any>(null);

  const [reservedDates, setReservedDates] =
    useState<any[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  useEffect(() => {

    if (params?.id) {

      fetchCar();
      fetchReservations();

    }

  }, [params]);

  const fetchCar = async () => {

    const { data } =
      await supabase
        .from("cars")
        .select("*")
        .eq("id", params.id)
        .single();

    if (data) {

      setCar(data);

    }

  };

  const fetchReservations =
    async () => {

      const { data } =
        await supabase
          .from("reservations")
          .select("*")
          .eq("car_id", params.id);

      if (data) {

        setReservedDates(data);

      }

    };

  const isDateReserved = (
    date: Date
  ) => {

    return reservedDates.some(
      (reservation) => {

        const start =
          new Date(
            reservation.start_date
          );

        const end =
          new Date(
            reservation.end_date
          );

        return (
          date >= start &&
          date <= end
        );

      }
    );

  };

  const reserveCar = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert(
        "Debes iniciar sesión"
      );

      window.location.href =
        "/login";

      return;

    }

    if (
      !startDate ||
      !endDate
    ) {

      alert(
        "Selecciona fechas"
      );

      return;

    }

    await supabase
      .from("reservations")
      .insert([
        {
          car_id: car.id,
          car_name: car.name,
          user_email:
            user.email,
          start_date:
            startDate,
          end_date:
            endDate,
          status:
            "Pendiente",
        },
      ]);

    alert(
      "Reserva realizada"
    );

    window.location.href =
      "/perfil";

  };

  if (!car) {

    return (

      <main className="bg-black text-white min-h-screen flex items-center justify-center">

        Cargando...

      </main>

    );

  }

  return (

    <main className="bg-black text-white min-h-screen py-16 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGEN */}

        <div>

          <img
            src={car.image}
            alt={car.name}
            className="w-full rounded-3xl object-cover"
          />

        </div>

        {/* INFO */}

        <div>

          <p className="uppercase tracking-[6px] text-[#D4A017] mb-3">

            MAG RENT CAR

          </p>

          <h1 className="text-5xl font-bold mb-6">

            {car.name}

          </h1>

          <div className="space-y-4 text-lg text-gray-300 mb-8">

            <p>
              <span className="text-white font-bold">
                Año:
              </span>{" "}
              {car.year}
            </p>

            <p>
              <span className="text-white font-bold">
                Transmisión:
              </span>{" "}
              {car.transmission}
            </p>

            <p>
              <span className="text-white font-bold">
                Combustible:
              </span>{" "}
              {car.fuel}
            </p>

            <p>
              <span className="text-white font-bold">
                Color:
              </span>{" "}
              {car.color}
            </p>

            <p>
              <span className="text-white font-bold">
                Categoría:
              </span>{" "}
              {car.category}
            </p>

            <p className="text-4xl text-[#D4A017] font-bold pt-4">

              {car.price}

            </p>

          </div>

          {/* FECHAS */}

          <div className="grid gap-4 mb-8">

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4"
            />

          </div>

          <button
            onClick={reserveCar}
            className="w-full bg-[#D4A017] text-black py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition"
          >
            Reservar Vehículo
          </button>

        </div>

      </div>

      {/* CALENDARIO */}

      <div className="max-w-4xl mx-auto mt-20">

        <h2 className="text-3xl font-bold mb-8 text-center">

          Fechas Ocupadas

        </h2>

        <div className="bg-white text-black rounded-3xl p-6 flex justify-center">

          <Calendar
            tileDisabled={({ date }) =>
              isDateReserved(date)
            }
          />

        </div>

      </div>

    </main>

  );
}