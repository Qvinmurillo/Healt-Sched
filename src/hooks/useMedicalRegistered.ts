import { Registered } from "@/src/types/medicalregistered";
import { getRegistered, saveRegistered } from "@/src/utils/storage/registered";
import { useCallback, useEffect, useState } from "react";

export function useRegistered() {
  const [items, setItems] = useState<Registered[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await getRegistered();
    setItems(list);
    setLoading(false);
  }, []);

  const add = useCallback(async (reg: Registered) => {
    const current = await getRegistered();
    const updated = [reg, ...current];
    await saveRegistered(updated);
    setItems(updated);
  }, []);

  const getById = useCallback(async (id: string) => {
    const list = await getRegistered();
    return list.find(reg => reg.id === id) || null;
  }, []);

  const update = useCallback(async (id: string, patch: Partial<Registered>) => {
    const list = await getRegistered();
    const updated = list.map(reg => (reg.id === id ? { ...reg, ...patch } : reg));
    await saveRegistered(updated);
    setItems(updated);
  }, []);

  const remove = useCallback(async (id: string) => {
    const list = await getRegistered();
    const updated = list.filter(reg => reg.id !== id);
    await saveRegistered(updated);
    setItems(updated);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { items, loading, reload: load, add, getById, update, remove };
}
