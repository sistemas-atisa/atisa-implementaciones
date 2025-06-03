
export interface M6Data {
  duracion: number;
  duracionJustificacion: string;
  monto: number;
  montoJustificacion: string;
  calidad: string;
  descripcion: string;
}

export interface SectionData {
  manoDeObra: M6Data;
  metodologia: M6Data;
  medicion: M6Data;
  maquinaria: M6Data;
  materiales: M6Data;
  medioAmbiente: M6Data;
}

export interface ProjectHeaderData {
  direccion: string;
  gerencia: string;
  nombreImplementacion: string;
  razon1: string;
  razon2: string;
  razon3: string;
}
