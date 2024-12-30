import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/url";

function TaskDetail() {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        axios.get(`${BASE_URL}${id}`)
            .then(response => {
                setTask(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la tarea', error);
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}${id}`);
            if (response.status === 200) {
                alert('Tarea eliminada con éxito');
                navigate('/');
            } else {
                alert('No se pudo eliminar la tarea.');
            }
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            alert('Hubo un error al eliminar la tarea.');
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    const handleStatusChange = async (currentStatus) => {
        const updatedStatus = !currentStatus;
        try {
            const response = await axios.put(`${BASE_URL}${id}`, {
                status: updatedStatus,
            });

            if (response.status === 200) {
                setTask({ ...task, status: updatedStatus });
            } else {
                alert('No se pudo actualizar el estado de la tarea.');
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
            alert('Hubo un error al actualizar el estado de la tarea.');
        }
    };

   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask({
            ...task,
            [name]: value
        });
    };

   
    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`${BASE_URL}${id}`, {
                title: task.title,
                description: task.description
            });
            if (response.status === 200) {
                alert('Tarea actualizada con éxito');
                setIsEditing(false); 
            } else {
                alert('No se pudo actualizar la tarea.');
            }
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            alert('Hubo un error al actualizar la tarea.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center font-space-grotesk">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[600px]">
                <h1 className="text-2xl font-bold mb-4 text-center">Detalle de la Tarea</h1>

                <div className="mb-4 flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="accent-indigo-500"
                        checked={task.status}
                        onChange={() => handleStatusChange(task.status)}
                    />
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        ) : (
                            <h2 className="font-bold text-lg">{task.title}</h2>
                        )}
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                rows="4"
                            />
                        ) : (
                            <p className="text-xs text-gray-500">{task.description}</p>
                        )}
                    </div>
                </div>

                <div>
                    <p className="text-xl mb-4 text-gray-500">
                        Estado: {task.status ? 'Completada' : 'Pendiente'}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-xs text-gray-500">
                        Fecha de creación: {task.createdAt ? formatDate(task.createdAt) : 'Fecha no disponible'}
                    </p>
                </div>

                <div className="flex justify-between space-x-2">
                    <button onClick={() => navigate('/')} className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-600">
                        Volver
                    </button>
                    {isEditing ? (
                        <button
                            onClick={handleSaveChanges}
                            className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-600"
                        >
                            Guardar cambios
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)} // Cambiar a modo de edición
                            className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-600"
                        >
                            Modificar
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
