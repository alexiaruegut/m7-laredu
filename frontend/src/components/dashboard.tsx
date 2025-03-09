import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col p-10 bg-blue-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">Bienvenido de nuevo</h1>
      <p className="text-gray-600 text-lg mb-6">Gestiona tus cursos, asignaturas y tareas desde aquí.</p>

      <div className="grid grid-cols-3 gap-6">
        <DashboardCard title="Cursos" description="Administra tus cursos y explora contenido nuevo." link="/courses" />
        <DashboardCard title="Asignaturas" description="Consulta las asignaturas disponibles y su contenido." link="/subjects" />
        <DashboardCard title="Tareas" description="Gestiona tus tareas pendientes y completadas." link="/assignments" />
        <DashboardCard title="Entregas" description="Revisa y sube entregas de tus actividades." link="/submissions" />
        <DashboardCard title="Mensajes" description="Consulta y responde mensajes de profesores." link="/messages" />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  link: string;
}

function DashboardCard({ title, description, link }: DashboardCardProps) {
  return (
    <Link to={link} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
