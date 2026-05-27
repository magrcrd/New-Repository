"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VehiculosAdmin() {

  const [authorized, setAuthorized] =
    useState(false);

  const [cars, setCars] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [image, setImage] =
    useState("");

  const [year, setYear] =
    useState("");

  const [transmission, setTransmission] =
    useState("");

  const [fuel, setFuel] =
    useState("");

  const [price, setPrice] =
    useState("");

  useEffect(() => {

    checkAdmin();

  }, []);

  const checkAdmin = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      window.location.href = "/login";

      return;

    }

    if (
      user.email !==
      "magrcrd@gmail.com"
    ) {

      alert("No autorizado");

      window.location.href = "/";

      return;

    }

    setAuthorized(true);

    fetchCars();

  };

  const fetchCars = async () => {

    const { data } = await supabase
      .from("cars")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (data) {

      setCars(data);

    }

  };

  const addCar = async () => {

    if (
      !name ||
      !image ||
      !year ||
      !transmission ||
      !fuel ||
      !price
    ) {

      alert(
        "Completa todos los campos"
      );

      return;

    }

    await supabase
      .from("cars")
      .insert([
        {
          name,
          image,
          year,
          transmission,
          fuel,
          price,
        },
      ]);

    setName("");
    setImage("");
    setYear("");
    setTransmission("");
    setFuel("");
    setPrice("");

    fetchCars();

  };

  const deleteCar = async (
    id: number
  ) => {

    const confirmDelete =
      confirm(
        "¿Eliminar vehículo?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("cars")
      .delete()
      .eq("id", id);

    fetchCars();

  };

  if (!authorized) {

    return null;

  }

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Vehículos
            </h1>

            <p className="text-gray-400">
              Gestión de vehículos
            </p>

          </div>

          <button
            onClick={async () => {

              await supabase.auth.signOut();

              window.location.href =
                "/login";

            }}
            className="bg-red-500 px-5 py-3 rounded-2xl font-bold"
          >
            Cerrar Sesión
          </button>

        </div>

        {/* FORM */}

        <div className="bg-zinc-900 rounded-3xl p-6 mb-10 border border-white/10">

          <h2 className="text-2xl font-bold mb-6">
            Añadir Vehículo
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Imagen /carro.jpg"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Año"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
              className="bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Transmisión"
              value={transmission}
              onChange={(e) =>
                setTransmission(
                  e.target.value
                )
              }
              className="bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Combustible"
              value={fuel}
              onChange={(e) =>
                setFuel(e.target.value)
              }
              className="bg-black border border-white/10 rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Precio"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="bg-black border border-white/10 rounded-2xl p-4"
            />

          </div>

          <button
            onClick={addCar}
            className="mt-6 bg-[#D4A017] text-black px-6 py-4 rounded-2xl font-bold"
          >
            Guardar Vehículo
          </button>

        </div>

        {/* VEHICULOS */}

        <div className="grid md:grid-cols-3 gap-6">

          {cars.map((car) => (

            <div
              key={car.id}
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden"
            >

              <img
                src={car.image}
                alt={car.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold mb-4">
                  {car.name}
                </h2>

                <div className="space-y-2 text-gray-300 mb-6">

                  <p>
                    Año: {car.year}
                  </p>

                  <p>
                    Transmisión: {car.transmission}
                  </p>

                  <p>
                    Combustible: {car.fuel}
                  </p>

                  <p>
                    Precio: {car.price}
                  </p>

                </div>

                <button
                  onClick={() =>
                    deleteCar(car.id)
                  }
                  className="w-full bg-red-500 py-3 rounded-2xl font-bold"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}