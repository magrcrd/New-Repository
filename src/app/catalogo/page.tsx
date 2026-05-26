"use client";

import { useState } from "react";

export default function Catalogo() {

  const cars = [

    {
      name: "Hyundai Elantra SEL 2020",
      image: "/carro1.jpg",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
      category: "Económico",
    },

    {
      name: "Kia Sorento SEL 4X4 2020",
      image: "/carro2.jpg",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
      category: "SUV",
    },

    {
      name: "Chevrolet Tahoe LT 2025",
      image: "/carro3.jpg",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Negro",
      category: "Luxury",
    },

    {
      name: "Mitsubishi Mirage G4 2020",
      image: "/carro4.jpg",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Rojo",
      category: "Económico",
    },

    {
      name: "Toyota Passo 2020",
      image: "/carro16.jpg",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Gris",
      category: "Económico",
    },

    {
      name: "Ford Escape 4x4 SEL 2019",
      image: "/carro19.jpg",
      transmission: "Automático",
      fuel: "Gasolina",
      color: "Blanca",
      category: "SUV",
    },
{
  name: "Daihatsu Mira 2020",
  image: "/carro23.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Negro",
  category: "Económico",
},

{
  name: "Mitsubishi Mirage G4 2019",
  image: "/carro24.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Azul",
  category: "Económico",
},

{
  name: "Daihatsu Mira 2019",
  image: "/carro25.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Azul",
  category: "Económico",
},

{
  name: "Toyota Passo 2020",
  image: "/carro26.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Gris",
  category: "Económico",
},

{
  name: "Nissan Note 2019",
  image: "/carro27.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Daihatsu Mira 2020",
  image: "/carro28.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Mitsubishi Mirage G4 2019",
  image: "/carro29.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Mitsubishi Mirage G4 2019",
  image: "/carro30.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Rojo",
  category: "Económico",
},

{
  name: "Daihatsu Mira 2020",
  image: "/carro31.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Daihatsu Mira 2016",
  image: "/carro32.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Mitsubishi Mirage Hatchback G4 2019",
  image: "/carro33.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Gris",
  category: "Económico",
},

{
  name: "Kia Sorento SEL 2019",
  image: "/carro34.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "SUV",
},

{
  name: "Daihatsu Mira 2016",
  image: "/carro35.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Suzuki Alto 2019",
  image: "/carro36.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Daihatsu Mira 2019",
  image: "/carro37.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Blanco",
  category: "Económico",
},

{
  name: "Suzuki Alto 2016",
  image: "/carro38.jpg",
  transmission: "Automático",
  fuel: "Gasolina",
  color: "Gris",
  category: "Económico",
},
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredCars =
    selectedCategory === "Todos"
      ? cars
      : cars.filter((car) => car.category === selectedCategory);

  return (

    <main className="bg-black text-white min-h-screen px-6 py-24">

      <div className="max-w-7xl mx-auto">

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

          <div className="flex justify-center gap-4 flex-wrap mt-8">

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

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {filteredCars.map((car) => (

            <div
              key={car.name}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4A017] transition duration-300"
            >

              <img
                src={car.image}
                alt={car.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold mb-4">
                  {car.name}
                </h2>

                <div className="space-y-2 text-gray-300 mb-6">

                  <p>Transmisión: {car.transmission}</p>

                  <p>Combustible: {car.fuel}</p>

                  <p>Color: {car.color}</p>

                  <p>Categoría: {car.category}</p>

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

      </div>

    </main>

  );
}