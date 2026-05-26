"use client";

import { useState } from "react";

export default function Catalogo() {

  const cars = [

    {
      name: "Hyundai Elantra SEL 2020",
      image: "/carro1.jpg",
      category: "Económico",
      price: "$30 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Kia Sorento SEL 4X4 2020",
      image: "/carro2.jpg",
      category: "SUV",
      price: "$55 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris oscuro",
    },

    {
      name: "Chevrolet Tahoe LT 2025",
      image: "/carro3.jpg",
      category: "Luxury",
      price: "$250 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Negro",
    },

    {
      name: "Mitsubishi Mirage G4 2020",
      image: "/carro4.jpg",
      category: "Económico",
      price: "$30 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Toyota Passo 2020",
      image: "/carro16.jpg",
      category: "Económico",
      price: "$25 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Ford Escape 4x4 SEL 2019",
      image: "/carro19.jpg",
      category: "SUV",
      price: "$45 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris oscuro",
    },

    {
      name: "Daihatsu Mira 2020",
      image: "/carro23.jpg",
      category: "Económico",
      price: "$20 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Mitsubishi Mirage G4 2019",
      image: "/carro24.jpeg",
      category: "Económico",
      price: "$30 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Daihatsu Mira 2019",
      image: "/carro25.jpeg",
      category: "Económico",
      price: "$20 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Toyota Passo 2020",
      image: "/carro26.jpeg",
      category: "Económico",
      price: "$25 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Nissan Note 2019",
      image: "/carro27.jpg",
      category: "Económico",
      price: "$30 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
    },

    {
      name: "Kia Sorento SEL 2019",
      image: "/carro34.jpeg",
      category: "SUV",
      price: "$55 por día",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris oscuro",
    },

  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

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
              src="/logo.png"
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

      <div className="px-6 py-24">

        <div className="max-w-7xl mx-auto">

          {/* TITULO */}

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

          {/* BUSCADOR */}

          <div className="mb-10">

            <input
              type="text"
              placeholder="Buscar vehículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4A017]"
            />

          </div>

          {/* BOTONES */}

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

            {filteredCars.map((car) => (

              <div
                key={car.name + car.image}
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

                  <div className="space-y-2 text-gray-300 mb-6">

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
                    href="https://wa.me/18092380861"
                    target="_blank"
                    className="block text-center bg-[#D4A017] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
                  >
                    Consultar Disponibilidad
                  </a>

                </div>

              </div>

            ))}

          </div>

          {/* INSTAGRAM FEED */}

          <section className="mt-32">

            <div className="text-center mb-12">

              <p className="uppercase tracking-[8px] text-[#D4A017] mb-4">
                Instagram
              </p>

              <h2 className="text-4xl font-bold mb-4">
                @magrcrd
              </h2>

              <p className="text-gray-400">
                Síguenos para ver nuevos vehículos y contenido diario
              </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <img
                src="/carro1.jpg"
                className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition duration-300"
              />

              <img
                src="/carro2.jpg"
                className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition duration-300"
              />

              <img
                src="/carro3.jpg"
                className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition duration-300"
              />

              <img
                src="/carro19.jpg"
                className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition duration-300"
              />

            </div>

            <div className="text-center mt-10">

              <a
                href="https://instagram.com/magrcrd"
                target="_blank"
                className="inline-block bg-[#D4A017] text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Ver Instagram
              </a>

            </div>

          </section>

        </div>

      </div>

      {/* BOTON WHATSAPP */}

      <a
        href="https://wa.me/18092380861"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:scale-110 transition duration-300 text-white p-5 rounded-full shadow-2xl z-50"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-current"
        >
          <path d="M19.11 17.2c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.21-.45-2.31-1.44-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.17-.24-.58-.49-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.66.61.7.22 1.33.19 1.83.12.56-.08 1.72-.7 1.96-1.37.24-.66.24-1.22.17-1.34-.07-.12-.27-.2-.56-.34zM16.01 3C8.83 3 3 8.82 3 16c0 2.54.74 5 2.13 7.11L3 29l6.07-2.09A12.94 12.94 0 0016.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3zm0 23.67c-2.15 0-4.25-.58-6.08-1.69l-.43-.25-3.6 1.24 1.18-3.51-.28-.45a10.65 10.65 0 01-1.64-5.7c0-5.9 4.8-10.7 10.7-10.7 2.86 0 5.54 1.11 7.56 3.13A10.63 10.63 0 0126.7 16c0 5.9-4.8 10.67-10.69 10.67z" />
        </svg>

      </a>

    </main>

  );
}