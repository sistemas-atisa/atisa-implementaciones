
import React from 'react';
import { Card } from '@/components/ui/card';

interface CostSummaryProps {
  tiempoImplementacion: number;
  montoTotalImplementacion: number;
  montoTotalOperacion: number;
}

const CostSummary: React.FC<CostSummaryProps> = ({
  tiempoImplementacion,
  montoTotalImplementacion,
  montoTotalOperacion
}) => {
  return (
    <Card className="mt-6 p-6 bg-white border-red-200 border-2">
      <h3 className="text-xl font-bold mb-6 text-red-700">Resumen de Costos</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Implementación Summary */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-red-600">Implementación</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
              <div className="text-xs text-red-600">Tiempo Total</div>
              <div className="text-lg font-bold text-red-700">{tiempoImplementacion} días</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
              <div className="text-xs text-red-600">Costo Total</div>
              <div className="text-lg font-bold text-red-700">${montoTotalImplementacion.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        {/* Operación Summary */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-red-600">Operación</h4>
          <div className="space-y-4">
            <div className="bg-red-200 p-4 rounded-lg border border-red-400 text-center">
              <div className="text-xs text-red-600">Costo Total de Operación</div>
              <div className="text-lg font-bold text-red-700">${montoTotalOperacion.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CostSummary;
