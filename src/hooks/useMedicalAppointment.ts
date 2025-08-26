import { Appointment } from "@/src/types/medicalappointments";
import { getAppointments, saveAppointments } from "@/src/utils/storage/index";
import { useCallback, useEffect, useState } from "react";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getAppointments();
    setAppointments(list);
    setLoading(false);
  }, []);

  const add = useCallback(async (appt: Appointment) => {
    const current = await getAppointments();
    const updated = [appt, ...current];
    await saveAppointments(updated);
    setAppointments(updated);
  }, []);

  const getById = useCallback(async (id: string) => {
    const list = await getAppointments();
    const found = list.find(a => a.id === id) || null;
    return found;
  }, []);

  useEffect(() => { load(); }, [load]);

  return { appointments, loading, reload: load, add, getById };
}
