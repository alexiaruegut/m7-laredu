// src/components/AssignmentsList.tsx
import { useEffect, useState } from "react";

interface Assignment {
  id: number;
  title: string;
  due_date: string;
  subject_id: number;
}

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assignments", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch(() => setError("Error al obtener las tareas"));
  }, []);

  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Lista de Tareas</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="p-4 hover:bg-gray-50 transition-all duration-300 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                <p className="text-gray-600 text-sm">Fecha de entrega: {assignment.due_date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
