import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/url";

function Create() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(`${BASE_URL}`, formData);
      console.log("Tarea creada:", response.data);
      alert("Tarea creada con éxito");
      setFormData({ title: "", description: "" }); 
      navigate("/")
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Hubo un error al crear la tarea.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-[500px] sm:w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Tarea</h1>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Escribe el título"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Escribe descripción de la tarea"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Crear Tarea
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-indigo-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 mt-4 transition duration-300"
        >
          Volver
        </button>
      </form>
    </div>
  );
}

export default Create   