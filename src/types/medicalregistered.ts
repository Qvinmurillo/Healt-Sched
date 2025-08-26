export type Registered = {
    id: string;
    noRequest: string;
    dateISO: string;
    status: "En Espera" | "Tramitado" | "Rechazado";
    notes: string;
    answer?: string;
    created_At:string;
    imageUri: string;

}

