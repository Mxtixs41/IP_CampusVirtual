'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, AlertTriangle, FileText, Settings, LogOut, 
  Search, Bell, ChevronDown, Filter, ArrowLeft, Phone, Mail, 
  MessageSquare, BookOpen, CheckCircle, Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- 1. TIPOS DE DATOS ---
interface Intervencion {
  id: number;
  fecha: string;
  tipo: string;
  nota: string;
  autor: string;
}

interface Recurso {
  titulo: string;
  tipo: 'Video' | 'Guía' | 'Taller' | 'Cápsula';
  url: string;
}

interface ComentarioForo {
  fecha: string;
  mensaje: string;
  sentimiento: 'Positivo' | 'Neutral' | 'Negativo';
}

interface Estudiante {
  id: number;
  nombre: string;
  carrera: string;
  semestre: number;
  asistencia: number;
  notas: number;
  riesgo: number;
  estado: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
  email: string;
  telefono: string;
  historial: { mes: string; riesgo: number }[];
  comentarios: ComentarioForo[];
  intervenciones: Intervencion[];
  recursos: Recurso[];
}

// --- 2. DATOS SIMULADOS (10 Estudiantes) ---
const datosEstudiantes: Estudiante[] = [
  { 
    id: 1, nombre: "Fernanda Lagos", carrera: "Téc. en Enfermería", semestre: 2, asistencia: 62, notas: 3.8, riesgo: 95, estado: "Crítico", email: "f.lagos@crecermas.cl", telefono: "+569 1234 5678",
    historial: [{mes: 'Mar', riesgo: 40}, {mes: 'Abr', riesgo: 60}, {mes: 'May', riesgo: 85}, {mes: 'Jun', riesgo: 95}],
    comentarios: [
      { fecha: "02/11", mensaje: "No entiendo nada de Anatomía, voy a reprobar...", sentimiento: "Negativo" },
      { fecha: "28/10", mensaje: "¿Alguien tiene los apuntes? No pude ir a clase.", sentimiento: "Neutral" }
    ],
    intervenciones: [
      { id: 1, fecha: "01/11", tipo: "Llamada", nota: "No contestó. Se dejó mensaje de voz.", autor: "Tutor Coord." }
    ],
    recursos: [
      { titulo: "Refuerzo Anatomía I (Cápsula)", tipo: "Video", url: "#" },
      { titulo: "Guía de estudio: Signos Vitales", tipo: "Guía", url: "#" }
    ]
  },
  { 
    id: 2, nombre: "Jorge Muñoz", carrera: "Mecánica Automotriz", semestre: 1, asistencia: 75, notas: 4.2, riesgo: 88, estado: "Alto", email: "j.munoz@crecermas.cl", telefono: "+569 8765 4321",
    historial: [{mes: 'Mar', riesgo: 20}, {mes: 'Abr', riesgo: 30}, {mes: 'May', riesgo: 50}, {mes: 'Jun', riesgo: 88}],
    comentarios: [
      { fecha: "01/11", mensaje: "Profe, necesito más plazo para el taller.", sentimiento: "Neutral" }
    ],
    intervenciones: [],
    recursos: [
      { titulo: "Taller de Nivelación Matemática", tipo: "Taller", url: "#" }
    ]
  },
  { 
    id: 3, nombre: "Camila Rojas", carrera: "Analista Programador", semestre: 4, asistencia: 40, notas: 5.5, riesgo: 82, estado: "Alto", email: "c.rojas@crecermas.cl", telefono: "+569 1122 3344",
    historial: [{mes: 'Mar', riesgo: 60}, {mes: 'Abr', riesgo: 65}, {mes: 'May', riesgo: 70}, {mes: 'Jun', riesgo: 82}],
    comentarios: [],
    intervenciones: [
      { id: 2, fecha: "20/10", tipo: "Correo", nota: "Se envió correo por inasistencias reiteradas.", autor: "Sistema Automático" }
    ],
    recursos: []
  },
  { 
    id: 4, nombre: "Pedro Soto", carrera: "Contabilidad General", semestre: 2, asistencia: 85, notas: 4.5, riesgo: 65, estado: "Medio", email: "p.soto@crecermas.cl", telefono: "+569 3344 5566",
    historial: [{mes: 'Mar', riesgo: 50}, {mes: 'Abr', riesgo: 55}, {mes: 'May', riesgo: 60}, {mes: 'Jun', riesgo: 65}],
    comentarios: [{ fecha: "15/10", mensaje: "Gracias por la clase de hoy!", sentimiento: "Positivo" }],
    intervenciones: [],
    recursos: [{ titulo: "Ejercicios de Balance General", tipo: "Guía", url: "#" }]
  },
  { 
    id: 5, nombre: "Ana Silva", carrera: "Téc. en Enfermería", semestre: 3, asistencia: 92, notas: 6.1, riesgo: 20, estado: "Bajo", email: "a.silva@crecermas.cl", telefono: "+569 9988 7766",
    historial: [{mes: 'Mar', riesgo: 10}, {mes: 'Abr', riesgo: 15}, {mes: 'May', riesgo: 18}, {mes: 'Jun', riesgo: 20}],
    comentarios: [],
    intervenciones: [],
    recursos: []
  },
  { 
    id: 6, nombre: "Luis Bravo", carrera: "Mecánica Automotriz", semestre: 1, asistencia: 55, notas: 3.5, riesgo: 91, estado: "Crítico", email: "l.bravo@crecermas.cl", telefono: "+569 4455 6677",
    historial: [{mes: 'Mar', riesgo: 30}, {mes: 'Abr', riesgo: 50}, {mes: 'May', riesgo: 80}, {mes: 'Jun', riesgo: 91}],
    comentarios: [{ fecha: "03/11", mensaje: "Me cuesta mucho llegar a la sede a tiempo por el trabajo.", sentimiento: "Negativo" }],
    intervenciones: [],
    recursos: [{ titulo: "Programa de Apoyo Estudiante Trabajador", tipo: "Taller", url: "#" }]
  },
  { 
    id: 7, nombre: "Marta Diaz", carrera: "Analista Programador", semestre: 2, asistencia: 88, notas: 5.8, riesgo: 15, estado: "Bajo", email: "m.diaz@crecermas.cl", telefono: "+569 2233 4455",
    historial: [{mes: 'Mar', riesgo: 20}, {mes: 'Abr', riesgo: 18}, {mes: 'May', riesgo: 15}, {mes: 'Jun', riesgo: 15}],
    comentarios: [],
    intervenciones: [],
    recursos: []
  },
  { 
    id: 8, nombre: "Sofía Vargas", carrera: "Turismo", semestre: 4, asistencia: 72, notas: 4.8, riesgo: 78, estado: "Alto", email: "s.vargas@crecermas.cl", telefono: "+569 6677 8899",
    historial: [{mes: 'Mar', riesgo: 40}, {mes: 'Abr', riesgo: 50}, {mes: 'May', riesgo: 65}, {mes: 'Jun', riesgo: 78}],
    comentarios: [{ fecha: "01/11", mensaje: "Tengo dudas con la fecha del examen.", sentimiento: "Neutral" }],
    intervenciones: [],
    recursos: [{ titulo: "Calendario Académico Actualizado", tipo: "Guía", url: "#" }]
  },
  { 
    id: 9, nombre: "Diego Herrera", carrera: "Logística", semestre: 1, asistencia: 40, notas: 2.5, riesgo: 98, estado: "Crítico", email: "d.herrera@crecermas.cl", telefono: "+569 5544 3322",
    historial: [{mes: 'Mar', riesgo: 50}, {mes: 'Abr', riesgo: 70}, {mes: 'May', riesgo: 90}, {mes: 'Jun', riesgo: 98}],
    comentarios: [{ fecha: "20/10", mensaje: "Creo que me equivoqué de carrera.", sentimiento: "Negativo" }],
    intervenciones: [{ id: 3, fecha: "25/10", tipo: "Entrevista", nota: "Derivado a Orientación Vocacional.", autor: "Psicólogo" }],
    recursos: [{ titulo: "Charla: Vocación y Proyecto de Vida", tipo: "Video", url: "#" }]
  },
  { 
    id: 10, nombre: "Valentina Castro", carrera: "Diseño Gráfico", semestre: 3, asistencia: 95, notas: 6.5, riesgo: 5, estado: "Bajo", email: "v.castro@crecermas.cl", telefono: "+569 1111 2222",
    historial: [{mes: 'Mar', riesgo: 10}, {mes: 'Abr', riesgo: 8}, {mes: 'May', riesgo: 6}, {mes: 'Jun', riesgo: 5}],
    comentarios: [{ fecha: "04/11", mensaje: "¡Me encantó el último proyecto!", sentimiento: "Positivo" }],
    intervenciones: [],
    recursos: []
  }
];

const dataReporte = [
  { name: 'Marzo', Desercion: 2, Retencion: 98 },
  { name: 'Abril', Desercion: 5, Retencion: 95 },
  { name: 'Mayo', Desercion: 8, Retencion: 92 },
  { name: 'Junio', Desercion: 12, Retencion: 88 },
];

// --- 3. COMPONENTES DE VISTA ---

// VISTA: Detalle del Estudiante (SUPER POTENCIADA)
const StudentDetail = ({ student, onBack }: { student: Estudiante, onBack: () => void }) => {
  const [simAsistencia, setSimAsistencia] = useState(student.asistencia);
  const [simNotas, setSimNotas] = useState(student.notas);
  const [intervenciones, setIntervenciones] = useState(student.intervenciones);
  const [nuevaNota, setNuevaNota] = useState("");

  const calcularRiesgoSimulado = () => {
    let nuevoRiesgo = student.riesgo;
    if (simAsistencia > student.asistencia) nuevoRiesgo -= (simAsistencia - student.asistencia) * 0.5; 
    if (simNotas > student.notas) nuevoRiesgo -= (simNotas - student.notas) * 10;
    return Math.max(0, Math.min(100, Math.round(nuevoRiesgo)));
  };
  const riesgoSimulado = calcularRiesgoSimulado();

  const handleAddIntervencion = () => {
    if (!nuevaNota.trim()) return;
    const nueva = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' }),
      tipo: "Nota Tutor",
      nota: nuevaNota,
      autor: "Tutor Coord."
    };
    setIntervenciones([nueva, ...intervenciones]);
    setNuevaNota("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-brand-blue transition">
        <ArrowLeft size={20} className="mr-2" /> Volver al Dashboard
      </button>

      {/* Encabezado Principal */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
              {student.nombre.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{student.nombre}</h2>
              <p className="text-gray-500">{student.carrera} - Semestre {student.semestre}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Mail size={14}/> {student.email}</span>
                <span className="flex items-center gap-1"><Phone size={14}/> {student.telefono}</span>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg font-bold text-white text-center ${
              student.riesgo >= 90 ? 'bg-red-600' : student.riesgo >= 75 ? 'bg-orange-500' : student.riesgo >= 50 ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
            <p className="text-xs opacity-90">Riesgo Actual</p>
            <p className="text-xl">{student.riesgo}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Análisis de Sentimiento */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="text-purple-600" size={20}/> Análisis de Sentimiento (Foros Moodle)
            </h3>
            <div className="space-y-3">
              {student.comentarios.length > 0 ? student.comentarios.map((com, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                  com.sentimiento === 'Negativo' ? 'bg-red-50 border-red-500' : com.sentimiento === 'Positivo' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'
                }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-500">{com.fecha} - Detectado en Campus Virtual</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      com.sentimiento === 'Negativo' ? 'bg-red-100 text-red-700' : com.sentimiento === 'Positivo' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {com.sentimiento}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{com.mensaje}"</p>
                </div>
              )) : <p className="text-gray-400 text-sm italic">No hay actividad reciente en foros.</p>}
            </div>
          </div>

          {/* 2. Bitácora */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20}/> Bitácora de Gestión del Caso
            </h3>
            <div className="flex gap-2 mb-6">
              <input type="text" placeholder="Registrar nueva acción..." className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-blue outline-none" value={nuevaNota} onChange={(e) => setNuevaNota(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddIntervencion()} />
              <button onClick={handleAddIntervencion} className="bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition">Registrar</button>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {intervenciones.length > 0 ? intervenciones.map((inter) => (
                <div key={inter.id} className="flex gap-3 items-start">
                  <div className="mt-1"><Clock size={16} className="text-gray-400"/></div>
                  <div className="bg-gray-50 p-3 rounded-lg flex-1 border border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500 mb-1"><span className="font-bold text-brand-blue">{inter.autor}</span><span>{inter.fecha}</span></div>
                    <p className="text-sm text-gray-700">{inter.nota}</p>
                  </div>
                </div>
              )) : <p className="text-center text-gray-400 text-sm py-4">No hay intervenciones registradas aún.</p>}
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h3 className="text-lg font-bold text-gray-800 mb-4">Proyección de Riesgo</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={student.historial}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="riesgo" stroke="#003366" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-brand-yellow">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2"><Settings className="text-brand-yellow" size={20}/> Simulador Predictivo</h3>
            <p className="text-xs text-gray-500 mb-6">Ajusta variables para proyectar mejoras.</p>
            <div className="space-y-6">
              <div><div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Asistencia</span><span className="font-bold text-blue-600">{simAsistencia}%</span></div><input type="range" min="0" max="100" value={simAsistencia} onChange={(e) => setSimAsistencia(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue" /></div>
              <div><div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Notas</span><span className="font-bold text-blue-600">{simNotas.toFixed(1)}</span></div><input type="range" min="1" max="7" step="0.1" value={simNotas} onChange={(e) => setSimNotas(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-blue" /></div>
              <div className={`mt-8 p-4 rounded-lg text-center ${riesgoSimulado < student.riesgo ? 'bg-green-100' : 'bg-gray-50'}`}><p className="text-sm font-semibold text-gray-600">Riesgo Proyectado</p><p className="text-4xl font-bold text-gray-800">{riesgoSimulado}%</p></div>
              <button onClick={() => {setSimAsistencia(student.asistencia); setSimNotas(student.notas)}} className="w-full text-xs text-gray-500 underline mt-2">Restablecer</button>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="text-brand-yellow" size={20}/> Recursos Sugeridos</h3>
            <p className="text-xs text-blue-200 mb-4">Recomendaciones basadas en IA.</p>
            <div className="space-y-3">
              {student.recursos.length > 0 ? student.recursos.map((rec, idx) => (
                <a key={idx} href={rec.url} className="block bg-white/10 hover:bg-white/20 p-3 rounded-lg transition flex items-center gap-3">
                  <div className="bg-brand-yellow text-blue-900 p-1.5 rounded"><FileText size={14} /></div>
                  <div><p className="text-sm font-bold text-white">{rec.titulo}</p><p className="text-xs text-blue-200">{rec.tipo}</p></div>
                </a>
              )) : <p className="text-sm opacity-70">No hay recomendaciones activas.</p>}
            </div>
            <button className="w-full mt-4 bg-brand-yellow text-blue-900 font-bold py-2 rounded-lg text-sm hover:bg-yellow-400 transition">Enviar al Estudiante</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// VISTA: Alertas
const AlertsView = ({ students, onViewDetail }: { students: Estudiante[], onViewDetail: (s: Estudiante) => void }) => {
  const alertasActivas = students.filter(s => s.riesgo >= 75).sort((a, b) => b.riesgo - a.riesgo);
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><AlertTriangle className="text-red-600" /> Gestión de Alertas Prioritarias</h2>
        <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full">{alertasActivas.length} Casos Críticos</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {alertasActivas.map((student) => (
          <div key={student.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 font-bold text-lg">!</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{student.nombre}</h3>
                <p className="text-sm text-gray-500">{student.carrera} • Semestre {student.semestre}</p>
                <div className="flex gap-4 mt-1 text-xs font-medium text-gray-600"><span className="flex items-center gap-1">📉 Asistencia: <span className="text-red-600">{student.asistencia}%</span></span><span className="flex items-center gap-1">📝 Notas: <span className={student.notas < 4 ? "text-red-600" : "text-gray-600"}>{student.notas}</span></span></div>
              </div>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right"><p className="text-xs text-gray-400 uppercase font-bold">Probabilidad Deserción</p><p className="text-2xl font-bold text-red-600">{student.riesgo}%</p></div>
              <button onClick={() => onViewDetail(student)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">Gestionar Caso <ArrowLeft className="rotate-180" size={16}/></button>
            </div>
          </div>
        ))}
        {alertasActivas.length === 0 && <div className="text-center p-10 bg-green-50 rounded-xl border border-green-200 text-green-800"><p className="font-bold text-lg">¡Excelente!</p><p>No hay alertas críticas pendientes.</p></div>}
      </div>
    </div>
  );
};

// VISTA: Reportes
const ReportsView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-gray-800">Reportes Académicos y Retención</h2>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Proyección de Retención vs Deserción (Semestral)</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataReporte}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Retencion" fill="#82ca9d" name="Retención %" />
            <Bar dataKey="Desercion" fill="#ff6666" name="Deserción %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// VISTA: Mis Estudiantes
const MyStudentsView = ({ students, onViewDetail }: { students: Estudiante[], onViewDetail: (s: Estudiante) => void }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-gray-800">Mis Estudiantes Asignados</h2>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 font-bold uppercase text-xs">
          <tr><th className="px-6 py-4">Nombre</th><th className="px-6 py-4">Carrera</th><th className="px-6 py-4 text-center">Contacto</th><th className="px-6 py-4 text-center">Acción</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((est) => (
            <tr key={est.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{est.nombre}</td>
              <td className="px-6 py-4">{est.carrera}</td>
              <td className="px-6 py-4 text-center text-blue-600">{est.email}</td>
              <td className="px-6 py-4 text-center"><button onClick={() => onViewDetail(est)} className="text-brand-blue hover:underline font-medium">Ver Ficha</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- 4. APP PRINCIPAL ---
export default function Dashboard() {
  const [view, setView] = useState<'dashboard' | 'reportes' | 'detalle' | 'estudiantes' | 'alertas'>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Estudiante | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const estudiantesFiltrados = datosEstudiantes.filter(est => 
    est.nombre.toLowerCase().includes(busqueda.toLowerCase()) || est.carrera.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleViewDetail = (student: Estudiante) => {
    setSelectedStudent(student);
    setView('detalle');
  };

  return (
    <div className="flex h-screen bg-brand-light font-sans text-gray-800 overflow-hidden">
      <aside className="w-64 bg-brand-blue text-white flex flex-col shadow-2xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-blue-800 bg-brand-blue">
          <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-blue font-bold text-lg shadow-lg">C</div>
          <div className="ml-3"><h1 className="text-lg font-bold leading-tight">Crecer Más</h1><p className="text-xs text-blue-200 opacity-75">Instituto Profesional</p></div>
        </div>
        <nav className="flex-1 py-6 space-y-1">
          <div onClick={() => setView('dashboard')} className={`cursor-pointer flex items-center px-6 py-3 ${view === 'dashboard' ? 'bg-blue-900 border-l-4 border-brand-yellow' : 'hover:bg-blue-800 border-l-4 border-transparent'}`}><LayoutDashboard size={20} className="mr-3"/> <span className="font-medium">Dashboard</span></div>
          <div onClick={() => setView('alertas')} className={`cursor-pointer flex items-center px-6 py-3 ${view === 'alertas' ? 'bg-blue-900 border-l-4 border-brand-yellow' : 'hover:bg-blue-800 border-l-4 border-transparent'}`}>
            <div className="flex items-center justify-between w-full"><div className="flex items-center"><AlertTriangle size={20} className="mr-3"/> <span className="font-medium">Alertas</span></div><span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">4</span></div>
          </div>
          <div onClick={() => setView('estudiantes')} className={`cursor-pointer flex items-center px-6 py-3 ${view === 'estudiantes' ? 'bg-blue-900 border-l-4 border-brand-yellow' : 'hover:bg-blue-800 border-l-4 border-transparent'}`}><Users size={20} className="mr-3"/> <span className="font-medium">Mis Estudiantes</span></div>
          <div onClick={() => setView('reportes')} className={`cursor-pointer flex items-center px-6 py-3 ${view === 'reportes' ? 'bg-blue-900 border-l-4 border-brand-yellow' : 'hover:bg-blue-800 border-l-4 border-transparent'}`}><FileText size={20} className="mr-3"/> <span className="font-medium">Reportes</span></div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            {view === 'dashboard' && 'Sistema de Alerta Temprana'}
            {view === 'reportes' && 'Reportes de Gestión'}
            {view === 'detalle' && 'Ficha del Estudiante'}
            {view === 'estudiantes' && 'Directorio de Estudiantes'}
            {view === 'alertas' && 'Gestión de Alertas'}
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer"><Bell size={24} className="text-gray-500 hover:text-brand-blue transition-colors" /><span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span></div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="hidden md:block text-right"><p className="text-sm font-bold text-gray-700">Tutor Coordinador</p><p className="text-xs text-gray-500">Sede Central</p></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-200"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" /></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {view === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500"><h4 className="text-gray-500 text-xs font-bold uppercase">Matrícula Total</h4><span className="text-3xl font-bold text-gray-800">2,500</span></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500"><h4 className="text-gray-500 text-xs font-bold uppercase">Riesgo Crítico</h4><span className="text-3xl font-bold text-gray-800">125</span></div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500"><h4 className="text-gray-500 text-xs font-bold uppercase">Riesgo Alto</h4><span className="text-3xl font-bold text-gray-800">310</span></div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500"><h4 className="text-gray-500 text-xs font-bold uppercase">Retención</h4><span className="text-3xl font-bold text-gray-800">88%</span></div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Estudiantes en Riesgo</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                  </div>
                </div>
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 font-bold uppercase text-xs">
                    <tr><th className="px-6 py-4">Nombre</th><th className="px-6 py-4">Carrera</th><th className="px-6 py-4 text-center">Riesgo (IA)</th><th className="px-6 py-4 text-center">Acción</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {estudiantesFiltrados.map((est) => (
                      <tr key={est.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{est.nombre}</td>
                        <td className="px-6 py-4">{est.carrera}</td>
                        <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-full bg-gray-200 rounded-full h-2.5 w-24"><div className={`h-2.5 rounded-full ${est.riesgo >= 90 ? 'bg-red-600' : est.riesgo >= 75 ? 'bg-orange-500' : est.riesgo >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${est.riesgo}%` }}></div></div><span className="font-bold">{est.riesgo}%</span></div></td>
                        <td className="px-6 py-4 text-center"><button onClick={() => handleViewDetail(est)} className="text-brand-blue hover:underline font-medium">Ver Detalle</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {view === 'detalle' && selectedStudent && <StudentDetail student={selectedStudent} onBack={() => setView('dashboard')} />}
          {view === 'reportes' && <ReportsView />}
          {view === 'estudiantes' && <MyStudentsView students={datosEstudiantes} onViewDetail={handleViewDetail} />}
          {view === 'alertas' && <AlertsView students={datosEstudiantes} onViewDetail={handleViewDetail} />}
        </main>
      </div>
    </div>
  );
}