export default function Home() {
  const cars = [
    {
      name: "Hyundai Elnatra SEL 2020",
      image:
        "/carro1.jpg",
    },
    {
      name: "Kia Sorrento 2020",
      image:
        "/carro2.jpg",
    },
    {
      name: "Chevrolet Tahoe 2025",
      image:
        "/carro3.jpg",
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        <img
          src="magrcrd.png"
          alt="car"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            MAG RENT CAR
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Vehículos modernos y servicio premium en República Dominicana
          </p>

          <a
            href="https://wa.me/18092380861"
            target="_blank"
            className="bg-[#D4A017] text-black px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </section>

      {/* VEHICULOS */}
      <section className="py-24 px-6 md:px-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Vehículos Disponibles
          </h2>

          <p className="text-gray-400">
            Consulta disponibilidad directamente por WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car.name}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-6">{car.name}</h3>

                <a
                  href="https://wa.me/18092380861"
                  target="_blank"
                  className="block text-center bg-[#D4A017] text-black py-4 rounded-2xl font-bold"
                >
                  Consultar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center">
        <h3 className="text-2xl font-bold mb-3">MAG RENT CAR</h3>
        

        <p className="text-gray-400 mb-2">
          Instagram: @magrcrd
        </p>

        <p className="text-gray-400">
          WhatsApp: 809-238-0861
        </p>
      </footer>
    </main>
  );
}