export default function Home() {

  const cars = [
    {
      name: "Hyundai Elantra SEL 2020",
      image: "/carro1.jpg",
    },

    {
      name: "Kia Sorento 2020",
      image: "/carro2.jpg",
    },

    {
      name: "Chevrolet Tahoe 2025",
      image: "/carro3.jpg",
    },
  ];

  return (
    <>
      <main className="bg-black text-white min-h-screen">

        {/* NAVBAR */}

        <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur border-b border-white/10">

          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

            <div className="flex items-center gap-3">

              <img
                src="/logo.png?v=3"
                alt="MAG RENT CAR"
                className="w-16 h-16 object-contain"
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

            <div className="flex items-center gap-3 flex-wrap">

              <a
                href="/login"
                className="bg-white text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
              >
                Login
              </a>

              <a
                href="/register"
                className="bg-[#D4A017] text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
              >
                Crear Cuenta
              </a>


              <a
                href="/admin/vehiculos?v=2"
                className="bg-red-500 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
              >
                Admin
              </a>

            </div>

          </div>

        </nav>

        {/* HERO */}

        <section className="relative h-screen flex items-center justify-center text-center px-6">

          <img
            src="/carro3.jpg"
            alt="car"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          <div className="relative z-10 max-w-4xl">

            <p className="uppercase tracking-[8px] text-[#D4A017] mb-4">
              Premium Car Rental
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              MAG RENT CAR
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Vehículos modernos y servicio premium en República Dominicana
            </p>

            <div className="flex justify-center gap-4 flex-wrap">

              <a
                href="https://wa.me/18092380861"
                target="_blank"
                className="bg-[#D4A017] text-black px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
              >
                Reservar por WhatsApp
              </a>

              <a
                href="/catalogo"
                className="border border-[#D4A017] text-[#D4A017] px-8 py-4 rounded-2xl text-lg font-bold hover:bg-[#D4A017] hover:text-black transition"
              >
                Ver Catálogo
              </a>

            </div>

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
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4A017] hover:-translate-y-2 transition duration-300"
              >

                <img
                  src={car.image}
                  alt={car.name}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-6">
                    {car.name}
                  </h3>

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

          <h3 className="text-2xl font-bold mb-3">
            MAG RENT CAR
          </h3>

          <p className="text-[#D4A017] mb-4">
            Premium Mobility
          </p>

          <a
            href="https://instagram.com/magrcrd"
            target="_blank"
            className="text-gray-400 hover:text-[#D4A017] transition block"
          >
            Instagram: @magrcrd
          </a>

          <a
            href="https://wa.me/18092380861"
            target="_blank"
            className="text-gray-400 hover:text-[#D4A017] transition block mt-2"
          >
            WhatsApp: 809-238-0861
          </a>

        </footer>

      </main>
    </>
  );
}