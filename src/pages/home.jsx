import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../api/url"
import { Link } from "react-router-dom";



function Home() {

    const [selectedValue, setSelectedValue] = useState('');

    const [tasks, setTasks] = useState([])

    console.log(selectedValue)

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    

    useEffect(() => {
      const fetchTasks = async () => {
          try {
              const response = await axios.get(`${BASE_URL}?status=${selectedValue}`);
              setTasks(response.data);
          } catch (error) {
              console.error('Error al obtener las tareas', error);
          }
      };
      fetchTasks();
  }, [selectedValue]);


    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`${BASE_URL}${id}`);
          if (response.status === 200) {
            alert('Tarea eliminada con éxito');
            setTasks(tasks.filter(task => task._id !== id));
             
          } else {
            alert('No se pudo eliminar la tarea.');
          }
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
          alert('Hubo un error al eliminar la tarea.');
        }
      };

      const handleStatusChange = async (id, currentStatus) => {
        const updatedStatus = !currentStatus; 
        try {
            const response = await axios.put(`${BASE_URL}${id}`, {
                status: updatedStatus
            });

            if (response.status === 200) {
                
                setTasks(tasks.map(task => 
                    task._id === id ? { ...task, status: updatedStatus } : task
                ));
            } else {
                alert('No se pudo actualizar el estado de la tarea.');
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
            alert('Hubo un error al actualizar el estado de la tarea.');
        }
    };

      return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center font-space-grotesk">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[600px]">
            <h1 className="text-2xl font-bold mb-4 text-center">Lista de Tareas</h1>
    
            <div className="mb-4 flex justify-between items-center">
              <button className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-600"><Link to="/create">
                Crear Tarea</Link>
              </button>
              <select
                id="taskFilter"
                value={selectedValue}
                onChange={handleChange}
                className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded"
              >
                <option value="all">Todas las tareas</option>
                <option value="true">Tareas completadas</option>
                <option value="false">Tareas pendientes</option>
              </select>
            </div>
    
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="p-4 bg-gray-50 rounded border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="accent-indigo-500"
                      checked={task.status}
                      onChange={() => handleStatusChange(task._id, task.status)}
                    />
                    <div>
                      <h2 className="font-bold text-lg"><Link to={`/task/${task._id}`}>{task.title}</Link></h2>
                      <p>{task.status ? 'Completada' : 'Pendiente'}</p>
                      <p className="text-xs text-gray-500">{formatDate(task.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Link
                      to={`/task/${task._id}`}
                      className="bg-indigo-800 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Modificar
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-800 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

export default Home