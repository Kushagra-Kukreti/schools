"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function GetData() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
        if(key!=="image")
        formData.append(key, data[key])
    }
    if (data.image[0]) {
        formData.append("image", data.image[0]);
    }
    const response = await axios.post("/api/getData",formData)
    if (response.status === 200) {
        setMessage("School added successfully!")
        router.push("/displayData")
    }
    else setMessage("Failed to add school.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add School</h2>
        <input {...register("name", { required: true })} placeholder="School Name" className="w-full border p-2 rounded" />
        {errors.name && <p className="text-red-500">Name is required</p>}
        <input {...register("address", { required: true })} placeholder="Address" className="w-full border p-2 rounded" />
        <input {...register("city", { required: true })} placeholder="City" className="w-full border p-2 rounded" />
        <input {...register("state", { required: true })} placeholder="State" className="w-full border p-2 rounded" />
        <input type="number" {...register("contact", { required: true })} placeholder="Contact Number" className="w-full border p-2 rounded" />
        <input type="email" {...register("email_id", { required: true })} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="file" {...register("image")} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer">Submit</button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
