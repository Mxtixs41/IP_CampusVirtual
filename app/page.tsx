'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Video, Calendar, MessageCircle, FileText,
  LogOut, Bell, Search, User, ChevronRight, PlayCircle, Download,
  CheckCircle, Clock, AlertCircle, MoreVertical, Filter, Plus
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

// --- 1. CONFIGURACIÓN DE COLORES Y TEMA ---
// Azul Institucional: bg-[#003366]
// Amarillo Acento: text-[#FFCC00]
// Fondo: bg-[#F3F4F6]

// --- 2. TIPOS DE DATOS ---
interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  profesor: string;
  progreso: number;
  proximaClase: string;
  linkZoom: string;
  tareasPendientes: number;
  imagen: string;
  descripcion?: string;
}

interface ActividadReciente {
  id: number;
  tipo: 'Tarea' | 'Foro' | 'Recurso' | 'Zoom';
  titulo: string;
  curso: string;
  fecha: string;
  estado: 'Pendiente' | 'Completado' | 'Nuevo';
}

interface EventoCalendario {
  id: number;
  dia: number;
  mes: string;
  titulo: string;
  tipo: 'Clase' | 'Examen' | 'Entrega';
  hora: string;
  curso: string;
}

interface Nota {
  id: number;
  curso: string;
  evaluacion: string;
  ponderacion: string;
  nota: number;
  fecha: string;
}

interface Foro {
  id: number;
  titulo: string;
  curso: string;
  autor: string;
  respuestas: number;
  ultimoMensaje: string;
  estado: 'Nuevo' | 'Activo' | 'Cerrado';
}

// --- 3. DATOS SIMULADOS ---
const cursosData: Curso[] = [
  {
    id: 1, nombre: "Anatomía General I", codigo: "ENF-101", profesor: "Dr. Juan Pérez",
    progreso: 75, proximaClase: "Hoy, 14:30 hrs", linkZoom: "#", tareasPendientes: 1,
    imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=60",
    descripcion: "Estudio de la estructura y función del cuerpo humano."
  },
  {
    id: 2, nombre: "Matemáticas Aplicadas", codigo: "MAT-200", profesor: "Mg. Ana Silva",
    progreso: 45, proximaClase: "Mañana, 08:30 hrs", linkZoom: "#", tareasPendientes: 3,
    imagen: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=60",
    descripcion: "Álgebra y cálculo aplicados a problemas reales."
  },
  {
    id: 3, nombre: "Taller de Empleabilidad", codigo: "TAL-303", profesor: "Ps. Carla Diaz",
    progreso: 90, proximaClase: "Jueves, 10:00 hrs", linkZoom: "#", tareasPendientes: 0,
    imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=60",
    descripcion: "Desarrollo de habilidades blandas para el mundo laboral."
  },
  {
    id: 4, nombre: "Inglés Técnico II", codigo: "ING-202", profesor: "Prof. Mark Smith",
    progreso: 30, proximaClase: "Viernes, 11:30 hrs", linkZoom: "#", tareasPendientes: 2,
    imagen: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=500&q=60",
    descripcion: "Vocabulario técnico específico para el área de salud."
  }
];

const actividadesData: ActividadReciente[] = [
  { id: 1, tipo: 'Zoom', titulo: "Clase Grabada: Sistema Nervioso", curso: "Anatomía General I", fecha: "Hace 2 horas", estado: 'Nuevo' },
  { id: 2, tipo: 'Tarea', titulo: "Entrega Informe Laboratorio 3", curso: "Anatomía General I", fecha: "Vence en 5 horas", estado: 'Pendiente' },
  { id: 3, tipo: 'Foro', titulo: "Dudas sobre el examen final", curso: "Matemáticas Aplicadas", fecha: "Ayer", estado: 'Completado' },
  { id: 4, tipo: 'Recurso', titulo: "PDF: Guía de Estudio", curso: "Taller de Empleabilidad", fecha: "Hace 2 días", estado: 'Nuevo' },
];

const calendarioData: EventoCalendario[] = [
  { id: 1, dia: 25, mes: 'NOV', titulo: "Clase: Anatomía I", tipo: 'Clase', hora: "14:30 - 16:00", curso: "Anatomía General I" },
  { id: 2, dia: 26, mes: 'NOV', titulo: "Entrega: Guía Ejercicios", tipo: 'Entrega', hora: "23:59 Límite", curso: "Matemáticas Aplicadas" },
  { id: 3, dia: 28, mes: 'NOV', titulo: "Examen Parcial 2", tipo: 'Examen', hora: "08:30 - 10:00", curso: "Inglés Técnico II" },
  { id: 4, dia: 30, mes: 'NOV', titulo: "Taller Práctico", tipo: 'Clase', hora: "10:00 - 13:00", curso: "Taller de Empleabilidad" },
];

const notasData: Nota[] = [
  { id: 1, curso: "Anatomía General I", evaluacion: "Prueba Solemne 1", ponderacion: "30%", nota: 5.8, fecha: "10/10/2025" },
  { id: 2, curso: "Anatomía General I", evaluacion: "Control de Lectura", ponderacion: "15%", nota: 6.5, fecha: "25/10/2025" },
  { id: 3, curso: "Matemáticas Aplicadas", evaluacion: "Guía de Ejercicios", ponderacion: "20%", nota: 4.2, fecha: "15/10/2025" },
  { id: 4, curso: "Inglés Técnico II", evaluacion: "Oral Presentation", ponderacion: "40%", nota: 6.0, fecha: "05/11/2025" },
];

const forosData: Foro[] = [
  { id: 1, titulo: "¿Cuándo se publican las notas del control?", curso: "Anatomía General I", autor: "Maria González", respuestas: 5, ultimoMensaje: "Hace 1 hora", estado: 'Activo' },
  { id: 2, titulo: "Material complementario Unidad 2", curso: "Matemáticas Aplicadas", autor: "Mg. Ana Silva", respuestas: 0, ultimoMensaje: "Ayer", estado: 'Nuevo' },
  { id: 3, titulo: "Debate: Importancia de la ética laboral", curso: "Taller de Empleabilidad", autor: "Ps. Carla Diaz", respuestas: 24, ultimoMensaje: "Hace 2 días", estado: 'Cerrado' },
];

const rendimientoData = [
  { name: 'Mar', Promedio: 5.5, Asistencia: 80 },
  { name: 'Abr', Promedio: 5.2, Asistencia: 75 },
  { name: 'May', Promedio: 6.0, Asistencia: 90 },
  { name: 'Jun', Promedio: 6.3, Asistencia: 85 },
  { name: 'Jul', Promedio: 6.1, Asistencia: 88 },
];

// --- 4. COMPONENTES DE VISTA ---

// VISTA: Dashboard (Resumen)
const DashboardView = ({ onJoinClass }: { onJoinClass: (curso: string) => void }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    {/* Banner de Bienvenida */}
    <div className="bg-gradient-to-r from-[#003366] to-blue-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2">¡Hola, Fernanda! 👋</h2>
        <p className="text-blue-100 max-w-xl">
          Tienes <span className="font-bold text-[#FFCC00]">2 clases síncronas</span> programadas para hoy y <span className="font-bold text-[#FFCC00]">4 tareas pendientes</span>.
          Tu conexión VPN a la red académica es estable y segura.
        </p>
        <button className="mt-6 bg-[#FFCC00] text-[#003366] px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition shadow-md flex items-center gap-2">
          <Video size={20}/> Ver Agenda de Hoy
        </button>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[#FFCC00] opacity-10 transform skew-x-12 translate-x-10"></div>
    </div>

    {/* Cursos Rápidos */}
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="text-[#003366]" /> Mis Cursos Activos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cursosData.slice(0, 3).map((curso) => (
          <div key={curso.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group">
            <div className="h-32 w-full relative overflow-hidden">
              <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-[#003366]">
                {curso.codigo}
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg text-gray-900 mb-1 truncate">{curso.nombre}</h4>
              <p className="text-sm text-gray-500 mb-4">{curso.profesor}</p>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">Progreso</span>
                  <span className="text-[#003366] font-bold">{curso.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#003366] h-2 rounded-full" style={{ width: `${curso.progreso}%` }}></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onJoinClass(curso.nombre)} className="flex-1 bg-[#003366] text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition flex items-center justify-center gap-2">
                  <Video size={16}/> Clase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart className="text-[#003366]" size={20}/> Mi Rendimiento Académico
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rendimientoData}>
              <defs>
                <linearGradient id="colorPromedio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003366" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[1, 7]} />
              <Tooltip />
              <Area type="monotone" dataKey="Promedio" stroke="#003366" fillOpacity={1} fill="url(#colorPromedio)" strokeWidth={3} />
              <Line type="monotone" dataKey="Asistencia" stroke="#FFCC00" strokeWidth={3} dot={{r: 4}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="text-[#FFCC00]" size={20}/> Actividad Reciente
        </h3>
        <div className="space-y-4">
          {actividadesData.map((act) => (
            <div key={act.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`mt-1 p-2 rounded-full h-fit ${
                act.tipo === 'Zoom' ? 'bg-blue-100 text-blue-600' : 
                act.tipo === 'Tarea' ? 'bg-red-100 text-red-600' : 
                act.tipo === 'Foro' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
              }`}>
                {act.tipo === 'Zoom' && <Video size={16}/>}
                {act.tipo === 'Tarea' && <AlertCircle size={16}/>}
                {act.tipo === 'Foro' && <MessageCircle size={16}/>}
                {act.tipo === 'Recurso' && <FileText size={16}/>}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{act.titulo}</p>
                <p className="text-xs text-gray-500">{act.curso} • {act.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// VISTA: Mis Cursos (Completo)
const CoursesView = ({ onJoinClass }: { onJoinClass: (curso: string) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <BookOpen className="text-[#003366]" /> Mis Cursos
      </h2>
      <div className="flex gap-2">
        <button className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
          <Filter size={16}/> Filtrar
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {cursosData.map((curso) => (
        <div key={curso.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition">
          <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
            <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{curso.nombre}</h3>
                <span className="bg-blue-100 text-[#003366] text-xs font-bold px-2 py-1 rounded">{curso.codigo}</span>
              </div>
              <p className="text-gray-500 text-sm mb-2">{curso.profesor}</p>
              <p className="text-gray-600 text-sm line-clamp-2">{curso.descripcion}</p>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-600">Avance General</span>
                  <span className="font-bold text-[#003366]">{curso.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#003366] h-2 rounded-full" style={{ width: `${curso.progreso}%` }}></div>
                </div>
              </div>
              <button onClick={() => onJoinClass(curso.nombre)} className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition flex items-center gap-2">
                <Video size={16}/> Entrar a Clase
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// VISTA: Calendario
const CalendarView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Calendar className="text-[#003366]" /> Calendario Académico
      </h2>
      <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 flex items-center gap-2">
        <Plus size={16}/> Nuevo Evento
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-700 mb-4">Agenda de Noviembre</h3>
        <div className="space-y-4">
          {calendarioData.map((evento) => (
            <div key={evento.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition group">
              <div className="flex flex-col items-center justify-center bg-blue-50 w-16 h-16 rounded-lg text-[#003366] border border-blue-100 group-hover:border-[#003366] transition-colors">
                <span className="text-xs font-bold uppercase">{evento.mes}</span>
                <span className="text-2xl font-bold">{evento.dia}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900">{evento.titulo}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    evento.tipo === 'Examen' ? 'bg-red-100 text-red-700' : 
                    evento.tipo === 'Entrega' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {evento.tipo}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{evento.curso}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <Clock size={12}/> {evento.hora}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
        <h3 className="font-bold text-gray-700 mb-4">Próximos Vencimientos</h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-center gap-2 text-red-700 font-bold mb-1">
              <AlertCircle size={16}/> Urgente
            </div>
            <p className="text-sm text-gray-800 font-medium">Entrega: Guía Ejercicios</p>
            <p className="text-xs text-gray-500">Vence en 12 horas</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-center gap-2 text-yellow-700 font-bold mb-1">
              <Clock size={16}/> Pendiente
            </div>
            <p className="text-sm text-gray-800 font-medium">Foro: Ética Laboral</p>
            <p className="text-xs text-gray-500">Vence mañana</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// VISTA: Notas
const GradesView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      <FileText className="text-[#003366]" /> Mis Calificaciones
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cursosData.map(c => (
        <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">{c.codigo}</p>
          <h4 className="font-bold text-gray-900 truncate">{c.nombre}</h4>
          <div className="mt-2 flex justify-between items-end">
            <span className="text-2xl font-bold text-[#003366]">5.8</span>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">Aprobando</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">Detalle de Evaluaciones</h3>
        <button className="text-[#003366] text-sm font-bold hover:underline flex items-center gap-1">
          <Download size={16}/> Descargar Informe
        </button>
      </div>
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 font-bold uppercase text-xs text-gray-500">
          <tr>
            <th className="px-6 py-4">Fecha</th>
            <th className="px-6 py-4">Curso</th>
            <th className="px-6 py-4">Evaluación</th>
            <th className="px-6 py-4 text-center">Ponderación</th>
            <th className="px-6 py-4 text-center">Nota</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {notasData.map((nota) => (
            <tr key={nota.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{nota.fecha}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{nota.curso}</td>
              <td className="px-6 py-4">{nota.evaluacion}</td>
              <td className="px-6 py-4 text-center">{nota.ponderacion}</td>
              <td className="px-6 py-4 text-center">
                <span className={`font-bold px-2 py-1 rounded text-white ${
                  nota.nota >= 4.0 ? 'bg-blue-600' : 'bg-red-500'
                }`}>
                  {nota.nota.toFixed(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// VISTA: Foros
const ForumsView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <MessageCircle className="text-[#003366]" /> Foros de Discusión
      </h2>
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input type="text" placeholder="Buscar temas..." className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003366] outline-none" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {forosData.map((foro) => (
        <div key={foro.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-[#003366] transition cursor-pointer group">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  foro.estado === 'Nuevo' ? 'bg-green-100 text-green-700' : 
                  foro.estado === 'Activo' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {foro.estado}
                </span>
                <span className="text-xs text-gray-500">{foro.curso}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#003366] transition-colors">{foro.titulo}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><User size={14}/> {foro.autor}</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {foro.ultimoMensaje}</span>
              </div>
            </div>
            <div className="text-center px-4 py-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
              <span className="block text-xl font-bold text-[#003366]">{foro.respuestas}</span>
              <span className="text-xs text-gray-500">Respuestas</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// VISTA: Aula Virtual (Simulación Zoom)
const ClassroomView = ({ curso, onExit }: { curso: string, onExit: () => void }) => (
  <div className="h-full flex flex-col animate-in zoom-in-95 duration-300">
    <div className="bg-black flex-1 rounded-xl overflow-hidden relative group shadow-2xl">
      {/* Header Video */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between text-white">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> En Vivo: {curso}</h3>
          <p className="text-xs text-gray-300">Vía Zoom Integration (AWS Low Latency)</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-black/50 px-3 py-1 rounded text-xs flex items-center gap-1"><User size={12}/> 24 Estudiantes</span>
        </div>
      </div>
      
      {/* Fake Video Content */}
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold border-4 border-[#FFCC00]">JP</div>
          <p className="text-white font-medium">Profesor Juan Pérez</p>
          <p className="text-gray-400 text-sm">Compartiendo pantalla...</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800/90 px-6 py-3 rounded-full flex gap-6 backdrop-blur-sm shadow-lg border border-white/10">
        <button className="text-white hover:text-gray-300 p-2"><Video size={20}/></button>
        <button className="text-white hover:text-gray-300 p-2"><MessageCircle size={20}/></button>
        <button className="text-white hover:text-gray-300 p-2"><FileText size={20}/></button>
        <div className="w-px bg-gray-600 h-6 my-auto"></div>
        <button onClick={onExit} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
          Salir de la Clase
        </button>
      </div>
    </div>
    <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center justify-between text-sm text-[#003366]">
      <div className="flex items-center gap-2">
        <CheckCircle size={16}/> 
        <span>Tu asistencia ha sido registrada automáticamente en Moodle.</span>
      </div>
      <button className="font-bold hover:underline">Ver material de la clase</button>
    </div>
  </div>
);

// --- 5. COMPONENTE PRINCIPAL (LAYOUT) ---
export default function CampusVirtualApp() {
  const [view, setView] = useState<'dashboard' | 'cursos' | 'calendario' | 'notas' | 'foros' | 'classroom'>('dashboard');
  const [activeClass, setActiveClass] = useState("");

  const handleJoinClass = (curso: string) => {
    setActiveClass(curso);
    setView('classroom');
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#003366] text-white flex flex-col shadow-2xl z-20">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-blue-800 bg-[#003366]">
          <div className="w-10 h-10 bg-[#FFCC00] rounded-lg flex items-center justify-center text-[#003366] font-bold text-lg shadow-lg transform -rotate-3">
            CV+
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold leading-tight">Campus Virtual+</h1>
            <p className="text-[10px] text-blue-200 opacity-75 tracking-wider uppercase">Plataforma LMS</p>
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          <div onClick={() => setView('dashboard')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'dashboard' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
            <LayoutDashboard size={20} className="mr-3" /> <span>Inicio</span>
          </div>
          <div onClick={() => setView('cursos')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'cursos' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
            <BookOpen size={20} className="mr-3" /> <span>Mis Cursos</span>
          </div>
          <div onClick={() => setView('calendario')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'calendario' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
            <Calendar size={20} className="mr-3" /> <span>Calendario</span>
          </div>
          <div onClick={() => setView('notas')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'notas' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
            <FileText size={20} className="mr-3" /> <span>Notas</span>
          </div>
          
          <div className="pt-4 mt-4 border-t border-blue-800">
            <p className="px-4 text-xs font-bold text-blue-400 uppercase mb-2">Comunidad</p>
            <div onClick={() => setView('foros')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'foros' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
              <MessageCircle size={20} className="mr-3" /> <span>Foros</span>
            </div>
          </div>
        </nav>
        
        {/* Footer Sidebar */}
        <div className="p-4 bg-blue-900/50">
           <button className="flex items-center text-blue-200 hover:text-white transition-colors w-full px-2 py-2 text-sm">
             <LogOut size={18} className="mr-3"/> <span>Cerrar Sesión</span>
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Header Superior */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 z-10 border-b border-gray-200">
          {/* Buscador */}
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar cursos, recursos o tareas..."
              className="pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm w-full focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all outline-none"
            />
          </div>

          {/* Perfil y Notificaciones */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-800">Fernanda Lagos</p>
                <p className="text-xs text-gray-500">Estudiante - Enfermería</p>
              </div>
              <div className="w-10 h-10 bg-[#003366] rounded-full border-2 border-gray-100 flex items-center justify-center text-white font-bold shadow-sm">
                 FL
              </div>
            </div>
          </div>
        </header>

        {/* Área de Contenido */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Background Pattern opcional */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10 pointer-events-none" />
          
          {view === 'dashboard' && <DashboardView onJoinClass={handleJoinClass} />}
          {view === 'cursos' && <CoursesView onJoinClass={handleJoinClass} />}
          {view === 'calendario' && <CalendarView />}
          {view === 'notas' && <GradesView />}
          {view === 'foros' && <ForumsView />}
          {view === 'classroom' && <ClassroomView curso={activeClass} onExit={() => setView('dashboard')} />}
        </main>
      </div>
    </div>
  );
}