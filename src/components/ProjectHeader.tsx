
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectHeaderData } from '@/types/project';

interface ProjectHeaderProps {
  data: ProjectHeaderData;
  onUpdate: (field: keyof ProjectHeaderData, value: string) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ data, onUpdate }) => {
  const direccionOpciones = [
    'CREO',
    'COO',
    'Administración',
    'Capital humano',
    'Finanzas'
  ];

  return (
    <Card className="mb-8 p-8 bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-lg">
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">
            Evaluación de Implementación de Proyectos
          </h1>
          <p className="text-lg text-slate-600 font-medium">Metodología 6M</p>
        </div>
        <div className="text-right">
          <img 
            src="/lovable-uploads/441a03f4-a193-4088-8265-7f033451acc1.png" 
            alt="Logo Atisa" 
            className="h-14 object-contain drop-shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="implementacion" className="text-sm font-semibold text-slate-700">
              Nombre de implementación
            </Label>
            <Input
              id="implementacion"
              value={data.nombreImplementacion}
              onChange={(e) => onUpdate('nombreImplementacion', e.target.value)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-200"
              placeholder="Ingrese el nombre de la implementación"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="direccion" className="text-sm font-semibold text-slate-700">
                Dirección
              </Label>
              <Select value={data.direccion} onValueChange={(value) => onUpdate('direccion', value)}>
                <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                  <SelectValue placeholder="Seleccionar dirección" />
                </SelectTrigger>
                <SelectContent>
                  {direccionOpciones.map((opcion) => (
                    <SelectItem key={opcion} value={opcion}>
                      {opcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gerencia" className="text-sm font-semibold text-slate-700">
                Gerencia
              </Label>
              <Input
                id="gerencia"
                value={data.gerencia}
                onChange={(e) => onUpdate('gerencia', e.target.value)}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-200"
                placeholder="Ingrese la gerencia"
              />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-slate-700">
            ¿Por qué es relevante?
          </Label>
          <Textarea
            value={data.razon1}
            onChange={(e) => onUpdate('razon1', e.target.value)}
            placeholder="Describe por qué es relevante esta implementación..."
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg min-h-[140px] transition-all duration-200"
            rows={7}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProjectHeader;
