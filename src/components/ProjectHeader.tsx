
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
    <Card className="mb-6 p-8 bg-white border-red-200 border-2">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-red-700 mb-4">
            Evaluación de Implementación de Proyectos - Metodología 6M
          </h1>
        </div>
        <div className="text-right">
          <img 
            src="/lovable-uploads/441a03f4-a193-4088-8265-7f033451acc1.png" 
            alt="Logo Atisa" 
            className="h-12 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="implementacion" className="font-semibold text-red-700">Nombre de implementación</Label>
            <Input
              id="implementacion"
              value={data.nombreImplementacion}
              onChange={(e) => onUpdate('nombreImplementacion', e.target.value)}
              className="mt-1 border-red-200 focus:border-red-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="direccion" className="font-semibold text-red-700">Dirección</Label>
              <Select value={data.direccion} onValueChange={(value) => onUpdate('direccion', value)}>
                <SelectTrigger className="mt-1 border-red-200 focus:border-red-400">
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
            <div>
              <Label htmlFor="gerencia" className="font-semibold text-red-700">Gerencia</Label>
              <Input
                id="gerencia"
                value={data.gerencia}
                onChange={(e) => onUpdate('gerencia', e.target.value)}
                className="mt-1 border-red-200 focus:border-red-400"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Label className="font-semibold text-red-700">¿Por qué es relevante?</Label>
            <div className="mt-2">
              <Textarea
                value={data.razon1}
                onChange={(e) => onUpdate('razon1', e.target.value)}
                placeholder="Describe por qué es relevante esta implementación..."
                className="border-red-200 focus:border-red-400 min-h-[120px]"
                rows={6}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectHeader;
