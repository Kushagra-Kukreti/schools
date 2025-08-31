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
      if (key !== "image") formData.append(key, data[key]);
    }
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.post("/api/getData", formData);
      if (response.status === 200) {
        setMessage("School added successfully!");
        router.push("/displayData");
      } else {
        setMessage("Failed to add school.");
      }
    } catch (err) {
      setMessage("Error submitting form.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add School</h2>

        <input
          {...register("name", {
            required: "School name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" }
          })}
          placeholder="School Name"
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Address must be at least 5 characters" }
          })}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        <input
          {...register("city", {
            required: "City is required",
            pattern: { value: /^[A-Za-z\s]+$/, message: "City must contain only letters" }
          })}
          placeholder="City"
          className="w-full border p-2 rounded"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        <input
          {...register("state", {
            required: "State is required",
            pattern: { value: /^[A-Za-z\s]+$/, message: "State must contain only letters" }
          })}
          placeholder="State"
          className="w-full border p-2 rounded"
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        <input
          type="tel"
          {...register("contact", {
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Contact must be a valid 10-digit number"
            }
          })}
          placeholder="Contact Number"
          className="w-full border p-2 rounded"
        />
        {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

        <input
          type="email"
          {...register("email_id", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email"
            }
          })}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email_id && <p className="text-red-500">{errors.email_id.message}</p>}

        <input
          type="file"
          {...register("image", {
            validate: (files) =>
              files.length === 0 ||
              ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type) ||
              "Only JPG/PNG images allowed"
          })}
          className="w-full border p-2 rounded"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer"
        >
          Submit
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
