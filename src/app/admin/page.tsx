"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Admin() {

  const router = useRouter();

  const [cars, setCars] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const checkUser = async () => {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {

      router.push("/login");

    }

  };

  const fetchCars = async () => {

    const { data } = await supabase
      .from("cars")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setCars(data);
    }

  };

  useEffect(() => {

    checkUser();

    fetchCars();

  }, []);

  const deleteCar = async (id: number) => {

    await supabase
      .from("cars")
      .delete()
      .eq("id", id);

    fetchCars();

  };

  const addCar = async () => {

    if (!name || !price || !category || !image) {

      alert("Completa todos los campos");

      return;

    }

    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("cars")
      .upload(fileName, image);

    if (uploadError) {

      alert(JSON.stringify(uploadError));

      console.log(uploadError);

      return;

    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("cars")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { error } = await supabase
      .from("cars")
      .insert([
        {
          name,
          price,
          category,
          image: imageUrl,
          transmission: "Automático",
          fuel: "Gasolina",
          color: "Negro",
        },
      ]);

    if (error) {

      alert(JSON.stringify(error));

      console.log(error);

      return;

    }

    setName("");
    setPrice("");
    setCategory("");
    setImage(null);

    fetchCars();

    alert("Vehículo agregado correctamente");

  };

  const logout = async () => {

    await supabase.auth.signOut();

    router.push("/login");

  };

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Panel Admin
            </h1>

            <p className="text-gray-400">
              Gestiona los vehículos de MAG RENT CAR
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
          >
            Cerrar Sesión
          </button>

        </div>

        <div className="bg-zinc-900 p-6 rounded-3xl mb-10 border border-white/10">

          <div className="grid md:grid-cols-5 gap-4">

            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black border border-white/10 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-black border border-white/10 rounded-2xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Categoría"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-black border border-white/10 rounded-2xl px-4 py-3"
            />

            <input
              type="file"
              onChange={(e) => {

                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }

              }}
              className="bg-black border border-white/10 rounded-2xl px-4 py-3"
            />

            <button
              onClick={addCar}
              className="bg-[#D4A017] text-black rounded-2xl font-bold hover:scale-105 transition"
            >
              Agregar
            </button>

          </div>

        </div>

        <div className="grid gap-6">

          {cars.map((car, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-6 flex items-center justify-between"
            >

              <div className="flex items-center gap-6">

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-32 h-24 object-cover rounded-2xl"
                />

                <div>

                  <h2 className="text-2xl font-bold mb-2">
                    {car.name}
                  </h2>

                  <p className="text-[#D4A017] font-bold mb-2">
                    {car.price}
                  </p>

                  <p className="text-gray-400">
                    {car.category}
                  </p>

                </div>

              </div>

              <button
                onClick={() => deleteCar(car.id)}
                className="bg-red-500 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
              >
                Eliminar
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}