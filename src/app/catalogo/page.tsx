"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Catalogo() {

  const [cars, setCars] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    fetchCars();

  }, []);

  const fetchCars = async () => {

    const { data } = await supabase
      .from("cars")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      setCars(data);

    }

  };

  const filteredCars = cars.filter((car) => {

    const matchesCategory =
      selectedCategory === "Todos"
        ? true
        : selectedCategory === "SUV"
        ? car.category.includes("SUV")
        : selectedCategory === "Luxury"
        ? car.category.includes("Luxury")
        : car.category.includes(selectedCategory);

    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;

  });

  return (

    <main className="bg-black text-white min-h-screen">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur border-b border-white/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">

            <img
              src="/logo.png?v=3"
              alt="MAG RENT CAR"
              className="w-12 h-12 object-contain"
            />

            <div>

              <h1 className="font-bold text-xl">
                MAG RENT CAR
              </h1>

              <p className="text-xs text-[#D4A017]">
                Premium Mobility
              </p>

            </div>

          </div>

          <a
            href="https://instagram.com/magrcrd"
            target="_blank"
            className="border border-[#D4A017] text-[#D4A017] px-6 py-3 rounded-2xl font-bold hover:bg-[#D4A017] hover:text-black transition"
          >
            Instagram
          </a>

        </div>

      </nav>

      {/* CONTENT */}

      <div className="px-6 py-24">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="text-center mb-16">

            <p className="uppercase tracking-[8px] text-[#D4A017] mb-4">
              MAG RENT CAR
            </p>

            <h1 className="text-5xl font-bold mb-6">
              Catálogo de Vehículos
            </h1>

            <p className="text-gray-400 text-lg">
              Vehículos modernos y listos para entrega inmediata
            </p>

          </div>

          {/* SEARCH */}

          <div className="mb-10">

            <input
              type="text"
              placeholder="Buscar vehículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4A017]"
            />

          </div>

          {/* FILTERS */}

          <div className="flex justify-center gap-4 flex-wrap mb-14">

            <button
              onClick={() => setSelectedCategory("Todos")}
              className={`px-6 py-3 rounded-2xl font-bold transition ${
                selectedCategory === "Todos"
                  ? "bg-[#D4A017] text-black"
                  : "border border-[#D4A017] text-[#D4A017]"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setSelectedCategory("Económico")}
              className={`px-6 py-3 rounded-2xl font-bold transition ${
                selectedCategory === "Económico"
                  ? "bg-[#D4A017] text-black"
                  : "border border-[#D4A017] text-[#D4A017]"
              }`}
            >
              Económicos
            </button>

            <button
              onClick={() => setSelectedCategory("SUV")}
              className={`px-6 py-3 rounded-2xl font-bold transition ${
                selectedCategory === "SUV"
                  ? "bg-[#D4A017] text-black"
                  : "border border-[#D4A017] text-[#D4A017]"
              }`}
            >
              SUVs
            </button>

            <button
              onClick={() => setSelectedCategory("Luxury")}
              className={`px-6 py-3 rounded-2xl font-bold transition ${
                selectedCategory === "Luxury"
                  ? "bg-[#D4A017] text-black"
                  : "border border-[#D4A017] text-[#D4A017]"
              }`}
            >
              Luxury
            </button>

          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {filteredCars.map((car, index) => (

              <div
                key={index}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4A017] hover:-translate-y-2 transition duration-300"
              >

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold mb-2">
                    {car.name}
                  </h2>

                  <p className="text-[#D4A017] text-2xl font-bold mb-6">
                    {car.price}
                  </p>

                  <div className="space-y-2 text-gray-300 mb-8">

                    <p>
                      <span className="text-white font-semibold">
                        Transmisión:
                      </span>{" "}
                      {car.transmission}
                    </p>

                    <p>
                      <span className="text-white font-semibold">
                        Combustible:
                      </span>{" "}
                      {car.fuel}
                    </p>

                    <p>
                      <span className="text-white font-semibold">
                        Color:
                      </span>{" "}
                      {car.color}
                    </p>

                    <p>
                      <span className="text-white font-semibold">
                        Categoría:
                      </span>{" "}
                      {car.category}
                    </p>

                  </div>

                  <a
                    href={`/vehiculo/${car.id}`}
                    className="block w-full text-center bg-[#D4A017] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
                  >
                    Ver Vehículo
                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );
}