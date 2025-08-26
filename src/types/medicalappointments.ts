export type Appointment = {
  id: string;
  title: string;          // "Cita Médica"
  Especialists: string;      // "Especialista Psicológico"
  dateISO: string;        // ISO string
  doctor?: string | null; // opcional
  notes?: string | null;  // opcional
  created_at: string;     // ISO
};
