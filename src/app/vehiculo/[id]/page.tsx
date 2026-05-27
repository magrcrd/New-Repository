"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Vehiculo() {

  const params = useParams();

  const [car, setCar] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {

    if (params?.id) {

      fetchCar();
      fetchReservations();

    }

  }, [params]);

  const fetchCar = async () => {

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    console.log(data);
    console.log(error);

    if (data) {

      setCar(data);

    }

  };

  const fetchReservations = async () => {

    const { data } = await supabase
      .from("reservations")
      .select("*");

    if (data) {

      setReservations(data);

    }

  };

  if (!car) {

    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center text-xl">
        Cargando vehículo...
      </main>
    );

  }

  return (

    <main className="bg-black text-white min-h-screen">

      <div className="max-w-4xl mx-auto px-5 py-10">

        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* IMAGEN */}

          <div className="max-w-md">

            <img
              src={car.image}
              alt={car.name}
              className="w-full h-[140px] object-cover rounded-3xl border border-white/10"
            />

          </div>

          {/* INFO */}

          <div>

            <p className="text-[#D4A017] uppercase tracking-[4px] mb-2 text-xs">
              MAG RENT CAR
            </p>

            <h1 className="text-2xl font-bold mb-2">
              {car.name}
            </h1>

            <p className="text-[#D4A017] text-xl font-bold mb-5">
              {car.price}
            </p>

            {/* SPECS */}

            <div className="grid grid-cols-2 gap-3 mb-6">

              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">
                  Transmisión
                </p>

                <p className="font-semibold text-sm">
                  {car.transmission}
                </p>

              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">
                  Combustible
                </p>

                <p className="font-semibold text-sm">
                  {car.fuel}
                </p>

              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">
                  Color
                </p>

                <p className="font-semibold text-sm">
                  {car.color}
                </p>

              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-3">

                <p className="text-gray-400 text-xs mb-1">
                  Categoría
                </p>

                <p className="font-semibold text-sm">
                  {car.category}
                </p>

              </div>

            </div>

            {/* FECHAS */}

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-4 mb-6">

              <h2 className="text-base font-bold mb-3 text-red-400">
                Fechas no disponibles
              </h2>

              <div className="space-y-2">

                {reservations
                  .filter(
                    (reservation) =>
                      reservation.car_name === car.name
                  )
                  .map((reservation, index) => (

                    <p
                      key={index}
                      className="text-gray-400 text-sm"
                    >
                      {new Date(
                        reservation.start_date
                      ).toLocaleDateString("es-DO")}{" "}
                      →
                      {" "}
                      {new Date(
                        reservation.end_date
                      ).toLocaleDateString("es-DO")}
                    </p>

                  ))}

                {reservations.filter(
                  (reservation) =>
                    reservation.car_name === car.name
                ).length === 0 && (

                  <p className="text-green-400 text-sm">
                    Disponible actualmente
                  </p>

                )}

              </div>

            </div>

            {/* BOTON */}

            <button
              onClick={async () => {

                const customerName =
                  prompt("Tu nombre");

                if (!customerName) return;

                const phone =
                  prompt("Tu teléfono");

                if (!phone) return;

                const startDate =
                  prompt("Fecha inicio");

                if (!startDate) return;

                const endDate =
                  prompt("Fecha fin");

                if (!endDate) return;

                const { data: existingReservations } =
                  await supabase
                    .from("reservations")
                    .select("*")
                    .eq("car_name", car.name);

                const isDateBlocked =
                  existingReservations?.some(
                    (reservation) => {

                      const existingStart =
                        new Date(
                          reservation.start_date
                        );

                      const existingEnd =
                        new Date(
                          reservation.end_date
                        );

                      const newStart =
                        new Date(startDate);

                      const newEnd =
                        new Date(endDate);

                      return (
                        newStart <= existingEnd &&
                        newEnd >= existingStart
                      );

                    }
                  );

                if (isDateBlocked) {

                  alert(
                    "Ese vehículo ya está reservado en esas fechas"
                  );

                  return;

                }

                // OBTENER USUARIO LOGUEADO

                const {
                  data: { user },
                } = await supabase.auth.getUser();

                // CREAR RESERVA

                const { error } = await supabase
                  .from("reservations")
                  .insert([
                    {
                      car_name: car.name,
                      customer_name:
                        customerName,
                      user_email:
                        user?.email || null,
                      phone,
                      start_date:
                        startDate,
                      end_date:
                        endDate,
                      status:
                        "pendiente",
                    },
                  ]);

                if (error) {

                  alert(
                    "Error creando reserva"
                  );

                  console.log(error);

                  return;

                }

                const whatsappUrl =
                  `https://wa.me/18092380861?text=Hola,%20quiero%20reservar%20el%20vehículo%20${car.name}`;

                window.location.href =
                  whatsappUrl;

              }}
              className="w-full bg-[#D4A017] text-black py-3 rounded-2xl font-bold text-sm hover:scale-[1.01] transition"
            >
              Reservar Vehículo
            </button>

          </div>

        </div>

      </div>

    </main>

  );
}