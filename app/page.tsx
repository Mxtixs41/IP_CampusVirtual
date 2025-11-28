'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, BookOpen, Video, Calendar, MessageCircle, FileText,
  LogOut, Bell, Search, User, ChevronRight, PlayCircle, Download,
  CheckCircle, Clock, AlertCircle, MoreVertical, Filter, Plus,
  Library, Settings, Upload, X, Menu, Award, GraduationCap, MapPin, Mail, Phone, Edit3,
  HelpCircle, MessageSquare
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ComposedChart
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
  promedioActual?: number;
}

interface ActividadReciente {
  id: number;
  tipo: 'Tarea' | 'Foro' | 'Recurso' | 'Zoom' | 'Examen';
  titulo: string;
  curso: string;
  fecha: string;
  estado: 'Pendiente' | 'Completado' | 'Nuevo' | 'Urgente';
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

interface RecursoBiblioteca {
  id: number;
  titulo: string;
  tipo: 'PDF' | 'Video' | 'Link';
  curso: string;
  fecha: string;
  size?: string;
}

interface Tarea {
  id: number;
  titulo: string;
  curso: string;
  vencimiento: string;
  estado: 'Pendiente' | 'Entregado' | 'Calificado' | 'Atrasado';
  nota?: number;
}

// --- 3. DATOS SIMULADOS ---
const cursosData: Curso[] = [
  {
    id: 1, nombre: "Anatomía General I", codigo: "ENF-101", profesor: "Dr. Juan Pérez",
    progreso: 75, proximaClase: "Hoy, 14:30 hrs", linkZoom: "#", tareasPendientes: 1,
    imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=60",
    descripcion: "Estudio de la estructura y función del cuerpo humano.",
    promedioActual: 3.8
  },
  {
    id: 2, nombre: "Matemáticas Aplicadas", codigo: "MAT-200", profesor: "Mg. Ana Silva",
    progreso: 45, proximaClase: "Mañana, 08:30 hrs", linkZoom: "#", tareasPendientes: 3,
    imagen: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=60",
    descripcion: "Álgebra y cálculo aplicados a problemas reales.",
    promedioActual: 4.2
  },
  {
    id: 3, nombre: "Taller de Empleabilidad", codigo: "TAL-303", profesor: "Ps. Carla Diaz",
    progreso: 90, proximaClase: "Jueves, 10:00 hrs", linkZoom: "#", tareasPendientes: 0,
    imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=60",
    descripcion: "Desarrollo de habilidades blandas para el mundo laboral.",
    promedioActual: 6.5
  },
  {
    id: 4, nombre: "Inglés Técnico II", codigo: "ING-202", profesor: "Prof. Mark Smith",
    progreso: 30, proximaClase: "Viernes, 11:30 hrs", linkZoom: "#", tareasPendientes: 2,
    imagen: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=500&q=60",
    descripcion: "Vocabulario técnico específico para el área de salud.",
    promedioActual: 6.0
  }
];

const actividadesData: ActividadReciente[] = [
  { id: 1, tipo: 'Zoom', titulo: "Clase Grabada: Sistema Nervioso", curso: "Anatomía General I", fecha: "Hace 2 horas", estado: 'Nuevo' },
  { id: 2, tipo: 'Tarea', titulo: "Entrega Informe Laboratorio 3", curso: "Anatomía General I", fecha: "Vence en 5 horas", estado: 'Urgente' },
  { id: 3, tipo: 'Foro', titulo: "Dudas sobre el examen final", curso: "Matemáticas Aplicadas", fecha: "Ayer", estado: 'Completado' },
  { id: 4, tipo: 'Recurso', titulo: "PDF: Guía de Estudio", curso: "Taller de Empleabilidad", fecha: "Hace 2 días", estado: 'Nuevo' },
  { id: 5, tipo: 'Examen', titulo: "Quiz Rápido Unidad 2", curso: "Inglés Técnico II", fecha: "Hace 3 días", estado: 'Completado' },
];

const calendarioData: EventoCalendario[] = [
  { id: 1, dia: 25, mes: 'NOV', titulo: "Clase: Anatomía I", tipo: 'Clase', hora: "14:30 - 16:00", curso: "Anatomía General I" },
  { id: 2, dia: 26, mes: 'NOV', titulo: "Entrega: Guía Ejercicios", tipo: 'Entrega', hora: "23:59 Límite", curso: "Matemáticas Aplicadas" },
  { id: 3, dia: 28, mes: 'NOV', titulo: "Examen Parcial 2", tipo: 'Examen', hora: "08:30 - 10:00", curso: "Inglés Técnico II" },
  { id: 4, dia: 30, mes: 'NOV', titulo: "Taller Práctico", tipo: 'Clase', hora: "10:00 - 13:00", curso: "Taller de Empleabilidad" },
];

const notasData: Nota[] = [
  { id: 1, curso: "Anatomía General I", evaluacion: "Prueba Solemne 1", ponderacion: "30%", nota: 3.8, fecha: "10/10/2025" },
  { id: 2, curso: "Anatomía General I", evaluacion: "Control de Lectura", ponderacion: "15%", nota: 4.0, fecha: "25/10/2025" },
  { id: 3, curso: "Matemáticas Aplicadas", evaluacion: "Guía de Ejercicios", ponderacion: "20%", nota: 4.2, fecha: "15/10/2025" },
  { id: 4, curso: "Inglés Técnico II", evaluacion: "Oral Presentation", ponderacion: "40%", nota: 6.0, fecha: "05/11/2025" },
];

const forosData: Foro[] = [
  { id: 1, titulo: "¿Cuándo se publican las notas del control?", curso: "Anatomía General I", autor: "Maria González", respuestas: 5, ultimoMensaje: "Hace 1 hora", estado: 'Activo' },
  { id: 2, titulo: "Material complementario Unidad 2", curso: "Matemáticas Aplicadas", autor: "Mg. Ana Silva", respuestas: 0, ultimoMensaje: "Ayer", estado: 'Nuevo' },
  { id: 3, titulo: "Debate: Importancia de la ética laboral", curso: "Taller de Empleabilidad", autor: "Ps. Carla Diaz", respuestas: 24, ultimoMensaje: "Hace 2 días", estado: 'Cerrado' },
  { id: 4, titulo: "Consulta sobre la prueba de Anatomía", curso: "Anatomía General I", autor: "Juan Pérez", respuestas: 2, ultimoMensaje: "Hace 3 horas", estado: 'Activo' },
];

const rendimientoData = [
  { name: 'Mar', Promedio: 5.5, Asistencia: 80 },
  { name: 'Abr', Promedio: 5.2, Asistencia: 75 },
  { name: 'May', Promedio: 6.0, Asistencia: 90 },
  { name: 'Jun', Promedio: 6.3, Asistencia: 85 },
  { name: 'Jul', Promedio: 4.5, Asistencia: 88 },
];

const bibliotecaData: RecursoBiblioteca[] = [
  { id: 1, titulo: "Atlas de Anatomía Humana.pdf", tipo: 'PDF', curso: "Anatomía General I", fecha: "20/11/2025", size: "15 MB" },
  { id: 2, titulo: "Grabación Clase 12: Sistema Nervioso", tipo: 'Video', curso: "Anatomía General I", fecha: "18/11/2025", size: "Streaming" },
  { id: 3, titulo: "Ejercicios Resueltos Algebra.pdf", tipo: 'PDF', curso: "Matemáticas Aplicadas", fecha: "15/11/2025", size: "2.4 MB" },
  { id: 4, titulo: "Link: TED Talk sobre Liderazgo", tipo: 'Link', curso: "Taller de Empleabilidad", fecha: "10/11/2025", size: "N/A" },
];

const tareasData: Tarea[] = [
  { id: 1, titulo: "Informe Laboratorio 3", curso: "Anatomía General I", vencimiento: "Hoy, 23:59", estado: 'Pendiente', nota: undefined },
  { id: 2, titulo: "Guía de Ejercicios N°4", curso: "Matemáticas Aplicadas", vencimiento: "Mañana, 23:59", estado: 'Pendiente', nota: undefined },
  { id: 3, titulo: "Video Presentación Personal", curso: "Inglés Técnico II", vencimiento: "Ayer", estado: 'Atrasado', nota: undefined },
  { id: 4, titulo: "Ensayo: Ética Profesional", curso: "Taller de Empleabilidad", vencimiento: "10/11/2025", estado: 'Calificado', nota: 6.5 },
  { id: 5, titulo: "Prueba Diagnóstico", curso: "Matemáticas Aplicadas", vencimiento: "01/11/2025", estado: 'Entregado', nota: undefined },
];

// --- 4. COMPONENTES DE VISTA ---

// COMPONENTE: Notificación Toast
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 z-50">
    <CheckCircle size={20} className="text-green-400" />
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:text-gray-300"><X size={16} /></button>
  </div>
);

// VISTA: Dashboard (Resumen)
const DashboardView = ({ onJoinClass, onViewTasks }: { onJoinClass: (curso: string) => void, onViewTasks: () => void }) => (
  <div className="space-y-8 animate-in fade-in duration-500 select-none">
    {/* Banner de Bienvenida */}
    <div className="bg-gradient-to-r from-[#003366] to-blue-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-2">¡Hola, Fernanda! 👋</h2>
        <p className="text-blue-100 max-w-xl">
          Atención: Tienes <span className="font-bold text-red-400">1 asignatura en riesgo</span> (Anatomía General I).
          Revisa tus notas y contacta a tu tutor si necesitas apoyo.
        </p>
        <div className="flex gap-3 mt-6">
          <button className="bg-[#FFCC00] text-[#003366] px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition shadow-md flex items-center gap-2 select-none">
            <Video size={20}/> Ver Agenda de Hoy
          </button>
          <button onClick={onViewTasks} className="bg-white/20 border border-white/30 text-white px-6 py-2 rounded-lg font-bold hover:bg-white/30 transition flex items-center gap-2 select-none">
            <CheckCircle size={20}/> Mis Tareas Pendientes
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-[#FFCC00] opacity-10 transform skew-x-12 translate-x-10 pointer-events-none"></div>
    </div>

    {/* Accesos Rápidos KPI */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md transition cursor-pointer">
        <span className="text-3xl font-bold text-[#003366]">5.1</span>
        <span className="text-xs text-gray-500 uppercase font-bold mt-1">Promedio General</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md transition cursor-pointer">
        <span className="text-3xl font-bold text-green-600">88%</span>
        <span className="text-xs text-gray-500 uppercase font-bold mt-1">Asistencia Global</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md transition cursor-pointer">
        <span className="text-3xl font-bold text-orange-500">3</span>
        <span className="text-xs text-gray-500 uppercase font-bold mt-1">Tareas Pendientes</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md transition cursor-pointer">
        <span className="text-3xl font-bold text-blue-500">12</span>
        <span className="text-xs text-gray-500 uppercase font-bold mt-1">Créditos Aprobados</span>
      </div>
    </div>

    {/* Cursos Rápidos */}
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="text-[#003366]" /> Mis Cursos Activos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cursosData.slice(0, 3).map((curso) => (
          <div key={curso.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group relative select-none">
            {curso.promedioActual && (
              <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10 ${
                curso.promedioActual < 4.0 ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'
              }`}>
                Nota: {curso.promedioActual}
              </div>
            )}
            <div className="h-32 w-full relative overflow-hidden">
              <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 pointer-events-none"/>
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
                  <div className={`h-2 rounded-full ${curso.promedioActual && curso.promedioActual < 4.0 ? 'bg-red-500' : 'bg-[#003366]'}`} style={{ width: `${curso.progreso}%` }}></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onJoinClass(curso.nombre)} className="flex-1 bg-[#003366] text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition flex items-center justify-center gap-2 select-none">
                  <Video size={16}/> Clase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* GRÁFICO CORREGIDO: EJES DOBLES */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart className="text-[#003366]" size={20}/> Mi Rendimiento vs Asistencia
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rendimientoData}>
              <defs>
                <linearGradient id="colorPromedio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={rendimientoData[rendimientoData.length-1].Promedio < 5.0 ? "#ef4444" : "#003366"} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={rendimientoData[rendimientoData.length-1].Promedio < 5.0 ? "#ef4444" : "#003366"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" domain={[1, 7]} label={{ value: 'Nota', angle: -90, position: 'insideLeft', fill: '#003366' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: 'Asistencia %', angle: 90, position: 'insideRight', fill: '#EAB308' }} />
              <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #e5e7eb'}} formatter={(value: number, name: string) => [name === 'Asistencia' ? `${value}%` : value, name]} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="Promedio" stroke={rendimientoData[rendimientoData.length-1].Promedio < 5.0 ? "#ef4444" : "#003366"} fillOpacity={1} fill="url(#colorPromedio)" strokeWidth={3} name="Promedio Notas" />
              <Line yAxisId="right" type="monotone" dataKey="Asistencia" stroke="#EAB308" strokeWidth={3} dot={{r: 4, fill: '#EAB308'}} name="Asistencia" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 select-none">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="text-[#FFCC00]" size={20}/> Actividad Reciente
        </h3>
        <div className="space-y-4">
          {actividadesData.map((act) => (
            <div key={act.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className={`mt-1 p-2 rounded-full h-fit ${
                act.tipo === 'Zoom' ? 'bg-blue-100 text-blue-600' : 
                act.tipo === 'Tarea' ? 'bg-red-100 text-red-600' : 
                act.tipo === 'Foro' ? 'bg-purple-100 text-purple-600' : 
                act.tipo === 'Examen' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
              }`}>
                {act.tipo === 'Zoom' && <Video size={16}/>}
                {act.tipo === 'Tarea' && <AlertCircle size={16}/>}
                {act.tipo === 'Foro' && <MessageCircle size={16}/>}
                {act.tipo === 'Recurso' && <FileText size={16}/>}
                {act.tipo === 'Examen' && <FileText size={16}/>}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{act.titulo}</p>
                <p className="text-xs text-gray-500">{act.curso} • {act.fecha}</p>
                {act.estado === 'Urgente' && <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded mt-1 inline-block">¡Urgente!</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// VISTA: Mis Cursos
const CoursesView = ({ onJoinClass }: { onJoinClass: (curso: string) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <BookOpen className="text-[#003366]" /> Mis Cursos
      </h2>
      <div className="flex gap-2">
        <button className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 select-none">
          <Filter size={16}/> Filtrar
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {cursosData.map((curso) => (
        <div key={curso.id} className={`bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row gap-6 hover:shadow-md transition ${curso.promedioActual && curso.promedioActual < 4.0 ? 'border-l-4 border-l-red-500 border-gray-200' : 'border-gray-200'}`}>
          <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
            <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover pointer-events-none" />
            {curso.promedioActual && curso.promedioActual < 4.0 && (
               <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-xs font-bold text-center py-1">
                 Riesgo Académico
               </div>
            )}
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
                  <span className={`font-bold ${curso.promedioActual && curso.promedioActual < 4.0 ? 'text-red-600' : 'text-[#003366]'}`}>{curso.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${curso.promedioActual && curso.promedioActual < 4.0 ? 'bg-red-500' : 'bg-[#003366]'}`} style={{ width: `${curso.progreso}%` }}></div>
                </div>
              </div>
              <button onClick={() => onJoinClass(curso.nombre)} className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition flex items-center gap-2 select-none">
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
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Calendar className="text-[#003366]" /> Calendario Académico
      </h2>
      <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 flex items-center gap-2 select-none">
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
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      <FileText className="text-[#003366]" /> Mis Calificaciones
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cursosData.map(c => (
        <div key={c.id} className={`bg-white p-4 rounded-xl shadow-sm border ${c.promedioActual && c.promedioActual < 4.0 ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
          <p className="text-xs text-gray-500 mb-1">{c.codigo}</p>
          <h4 className="font-bold text-gray-900 truncate">{c.nombre}</h4>
          <div className="mt-2 flex justify-between items-end">
            <span className={`text-2xl font-bold ${c.promedioActual && c.promedioActual < 4.0 ? 'text-red-600' : 'text-[#003366]'}`}>{c.promedioActual?.toFixed(1) || "N/A"}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-bold ${c.promedioActual && c.promedioActual < 4.0 ? 'text-red-700 bg-red-100' : 'text-green-600 bg-green-50'}`}>
              {c.promedioActual && c.promedioActual < 4.0 ? 'En Riesgo' : 'Aprobando'}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">Detalle de Evaluaciones</h3>
        <button className="text-[#003366] text-sm font-bold hover:underline flex items-center gap-1 select-none">
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
                  nota.nota >= 4.0 ? 'bg-blue-600' : 'bg-red-600'
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
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
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

// VISTA: Biblioteca
const LibraryView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Library className="text-[#003366]" /> Biblioteca Digital (S3)
      </h2>
      <div className="flex gap-2">
        <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 flex items-center gap-2 select-none">
          <Upload size={16}/> Subir Recurso
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {bibliotecaData.map((recurso) => (
        <div key={recurso.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition group">
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg ${
              recurso.tipo === 'PDF' ? 'bg-red-100 text-red-600' :
              recurso.tipo === 'Video' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              {recurso.tipo === 'PDF' && <FileText size={20}/>}
              {recurso.tipo === 'Video' && <Video size={20}/>}
              {recurso.tipo === 'Link' && <BookOpen size={20}/>}
            </div>
            <button className="text-gray-400 hover:text-[#003366]"><MoreVertical size={16}/></button>
          </div>
          <h4 className="font-bold text-gray-800 text-sm mb-1 truncate">{recurso.titulo}</h4>
          <p className="text-xs text-gray-500 mb-4">{recurso.curso}</p>
          <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3">
            <span>{recurso.size}</span>
            <span>{recurso.fecha}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// VISTA: Mis Tareas
const TasksView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      <CheckCircle className="text-[#003366]" /> Mis Tareas
    </h2>

    <div className="grid grid-cols-1 gap-3">
      {tareasData.map((tarea) => (
        <div key={tarea.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${
              tarea.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-600' :
              tarea.estado === 'Atrasado' ? 'bg-red-100 text-red-600' :
              tarea.estado === 'Calificado' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
            }`}>
              <Clock size={20}/>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{tarea.titulo}</h4>
              <p className="text-sm text-gray-500">{tarea.curso}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
              tarea.estado === 'Pendiente' ? 'bg-yellow-50 text-yellow-700' :
              tarea.estado === 'Atrasado' ? 'bg-red-50 text-red-700' :
              tarea.estado === 'Calificado' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {tarea.estado}
            </div>
            <p className="text-xs text-gray-400 mt-1">Vence: {tarea.vencimiento}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// VISTA: Perfil (NUEVO DISEÑO MEJORADO)
const ProfileView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none">
    {/* Encabezado del Perfil con Fondo */}
    <div className="relative">
      <div className="h-48 bg-gradient-to-r from-[#003366] to-[#004080] rounded-t-xl"></div>
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition">
          <Settings size={20} />
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition">
          <Edit3 size={20} />
        </button>
      </div>
      
      <div className="px-8 pb-8 bg-white rounded-b-xl shadow-sm border-x border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-6 items-end -mt-16 mb-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-lg">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-4xl font-bold text-[#003366] border-2 border-gray-200">FL</div>
            </div>
            <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
          </div>
          
          {/* Info Principal */}
          <div className="flex-1 mb-2">
            <h2 className="text-3xl font-bold text-gray-900">Fernanda Lagos</h2>
            <p className="text-[#003366] font-medium flex items-center gap-2">
              <GraduationCap size={18}/> Estudiante Regular - Téc. en Enfermería
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={14}/> Sede Santiago Centro</span>
              <span className="flex items-center gap-1"><Mail size={14}/> f.lagos@crecermas.cl</span>
            </div>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="flex gap-4 mb-2">
            <div className="text-center px-4 border-r border-gray-200">
              <p className="text-2xl font-bold text-[#003366]">5.1</p>
              <p className="text-xs text-gray-500 uppercase font-bold">PGA</p>
            </div>
            <div className="text-center px-4 border-r border-gray-200">
              <p className="text-2xl font-bold text-green-600">88%</p>
              <p className="text-xs text-gray-500 uppercase font-bold">Asist.</p>
            </div>
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-blue-600">3º</p>
              <p className="text-xs text-gray-500 uppercase font-bold">Semestre</p>
            </div>
          </div>
        </div>

        {/* Barra de Progreso de Carrera */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-bold text-gray-700">Progreso de la Carrera</h4>
            <span className="text-sm font-bold text-[#003366]">35% Completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-[#003366] to-blue-500 h-3 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Has aprobado 12 de 34 asignaturas obligatorias.</p>
        </div>
      </div>
    </div>

    {/* Grid de Detalles */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna Izquierda: Datos */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-[#FFCC00]" size={20}/> Información Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-gray-500 mb-1">RUT</p>
              <p className="font-medium text-gray-800">19.876.543-2</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fecha de Nacimiento</p>
              <p className="font-medium text-gray-800">12 de Agosto, 2002</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Teléfono Móvil</p>
              <p className="font-medium text-gray-800">+56 9 1234 5678</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Dirección Particular</p>
              <p className="font-medium text-gray-800">Av. Providencia 1234, Depto 502</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="text-[#FFCC00]" size={20}/> Logros y Certificaciones
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="p-2 bg-blue-200 text-blue-800 rounded-full"><Award size={20}/></div>
              <div>
                <h4 className="font-bold text-[#003366] text-sm">Cuadro de Honor - 2024</h4>
                <p className="text-xs text-gray-600">Por obtener promedio superior a 6.0</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 opacity-75">
              <div className="p-2 bg-gray-200 text-gray-500 rounded-full"><Award size={20}/></div>
              <div>
                <h4 className="font-bold text-gray-700 text-sm">Certificación RCP Básico</h4>
                <p className="text-xs text-gray-500">Pendiente de cursar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Configuración */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="text-gray-400" size={20}/> Preferencias
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Notificaciones Email</span>
              <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Alertas SMS</span>
              <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Modo Oscuro</span>
              <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 font-medium transition">
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  </div>
);

// VISTA: Aula Virtual (Simulación Zoom) - MODAL OVERLAY
const ClassroomModal = ({ curso, onExit }: { curso: string, onExit: () => void }) => (
  <div className="fixed inset-0 z-50 bg-black/90 flex flex-col animate-in zoom-in-95 duration-300">
    <div className="flex-1 relative flex flex-col">
      {/* Header Video */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between text-white items-start">
        <div>
          <h3 className="font-bold text-xl flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span> En Vivo: {curso}</h3>
          <p className="text-sm text-gray-300">Conectado vía Zoom Integration (AWS Low Latency)</p>
        </div>
        <div className="flex gap-4 items-center">
           <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"><User size={16}/> 24 Estudiantes</span>
           <button onClick={onExit} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
             <X size={18}/> Salir
           </button>
        </div>
      </div>
      
      {/* Fake Video Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-900 relative">
        <div className="text-center">
          <div className="w-32 h-32 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold border-4 border-[#FFCC00] shadow-2xl relative">
            JP
            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#003366]"></div>
          </div>
          <p className="text-white text-xl font-bold mb-2">Profesor Juan Pérez</p>
          <p className="text-gray-400 text-base">Está compartiendo su pantalla...</p>
        </div>

        {/* Participantes Grid (Fake) */}
        <div className="absolute right-4 top-24 bottom-24 w-48 flex flex-col gap-2 overflow-hidden">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center border border-gray-700">
              <User size={24} className="text-gray-600"/>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-8 pb-4">
        <button className="flex flex-col items-center gap-1 text-white hover:text-[#FFCC00] transition group">
          <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700"><Video size={24}/></div>
          <span className="text-xs">Cámara</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white hover:text-[#FFCC00] transition group">
          <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700"><MessageCircle size={24}/></div>
          <span className="text-xs">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-green-500 hover:text-green-400 transition group">
          <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700"><Upload size={24}/></div>
          <span className="text-xs">Compartir</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-white hover:text-[#FFCC00] transition group">
          <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700"><FileText size={24}/></div>
          <span className="text-xs">Notas</span>
        </button>
      </div>
    </div>
  </div>
);

// --- 5. COMPONENTE PRINCIPAL (LAYOUT) ---
export default function CampusVirtualApp() {
  const [view, setView] = useState<'dashboard' | 'cursos' | 'calendario' | 'notas' | 'foros' | 'biblioteca' | 'tareas' | 'perfil'>('dashboard');
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleJoinClass = (curso: string) => {
    setActiveClass(curso);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans text-gray-800 overflow-hidden select-none relative">
      
      {/* TOAST NOTIFICATION */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* CLASSROOM MODAL OVERLAY */}
      {activeClass && (
        <ClassroomModal 
          curso={activeClass} 
          onExit={() => { setActiveClass(null); showToast("Has salido de la clase correctamente."); }} 
        />
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#003366] text-white flex flex-col shadow-2xl z-20 transition-all duration-300">
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
        <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
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
          <div onClick={() => setView('tareas')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'tareas' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
            <CheckCircle size={20} className="mr-3" /> <span>Mis Tareas</span>
          </div>
          <div onClick={() => setView('biblioteca')} className={`cursor-pointer flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${view === 'biblioteca' ? 'bg-blue-800 text-[#FFCC00] font-bold shadow-inner' : 'hover:bg-blue-800/50 text-blue-100'}`}>
            <Library size={20} className="mr-3" /> <span>Biblioteca</span>
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
          <button onClick={() => setView('perfil')} className="flex items-center text-blue-200 hover:text-white transition-colors w-full px-2 py-2 text-sm mb-2">
            <Settings size={18} className="mr-3"/> <span>Configuración</span>
          </button>
          <button className="flex items-center text-blue-200 hover:text-white transition-colors w-full px-2 py-2 text-sm">
            <LogOut size={18} className="mr-3"/> <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        
        {/* Header Superior */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 z-10 border-b border-gray-200 shrink-0">
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
          <div className="flex items-center gap-6 relative">
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Panel de Notificaciones Dropdown */}
            {showNotifications && (
              <div className="absolute top-12 right-40 w-80 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h4 className="font-bold text-gray-800 text-sm">Notificaciones</h4>
                  <button onClick={() => setShowNotifications(false)}><X size={16} className="text-gray-400"/></button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 border-b border-gray-50 hover:bg-blue-50 cursor-pointer">
                    <p className="text-sm font-bold text-[#003366]">Nueva nota publicada</p>
                    <p className="text-xs text-gray-500">Matemáticas Aplicadas - Prueba 2</p>
                    <p className="text-[10px] text-gray-400 mt-1">Hace 10 min</p>
                  </div>
                  <div className="p-4 border-b border-gray-50 hover:bg-blue-50 cursor-pointer">
                    <p className="text-sm font-bold text-red-600">¡Tarea por vencer!</p>
                    <p className="text-xs text-gray-500">Informe Laboratorio 3</p>
                    <p className="text-[10px] text-gray-400 mt-1">Hace 1 hora</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer" onClick={() => setView('perfil')}>
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
          
          {/* VISTAS */}
          {view === 'dashboard' && <DashboardView onJoinClass={handleJoinClass} onViewTasks={() => setView('tareas')} />}
          {view === 'cursos' && <CoursesView onJoinClass={handleJoinClass} />}
          {view === 'calendario' && <CalendarView />}
          {view === 'notas' && <GradesView />}
          {view === 'foros' && <ForumsView />}
          {view === 'biblioteca' && <LibraryView />}
          {view === 'tareas' && <TasksView />}
          {view === 'perfil' && <ProfileView />}
        </main>

        {/* Botón Flotante de Ayuda */}
        <button 
          onClick={() => showToast("Conectando con Soporte Académico...")}
          className="fixed bottom-8 right-8 bg-[#FFCC00] text-[#003366] p-4 rounded-full shadow-lg hover:bg-yellow-400 transition transform hover:scale-110 z-40 flex items-center justify-center"
        >
          <MessageSquare size={24} fill="#003366" className="text-[#003366]" />
        </button>
      </div>
    </div>
  );
}