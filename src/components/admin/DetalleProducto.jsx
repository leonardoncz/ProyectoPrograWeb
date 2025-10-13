// DetalleProductoModal.jsx
import { useState, useEffect } from "react";

const DetalleProducto = ({ producto, onClose, onGuardar }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    image: "",
    active: true,
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        name: producto.name,
        type: producto.type,
        breed: producto.breed,
        image: producto.image,
        active: producto.active,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGuardar = () => {
    onGuardar({ ...producto, ...formData });
    onClose();
  };

  if (!producto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Detalle del Producto</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
        >
          X
        </button>

        <div className="flex flex-col gap-3">
          <label className="font-medium">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />

          <label className="font-medium">Tipo:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          >
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>

          <label className="font-medium">Raza:</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />

          <label className="font-medium">Imagen (URL):</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />

          <label className="font-medium flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Activo
          </label>

          <button
            onClick={handleGuardar}
            className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
