
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';

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
    <Card className="mt-8 p-8 bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-slate-800">Resumen de Costos</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Implementación Summary */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h4 className="text-lg font-semibold text-slate-700">Implementación</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div className="text-sm text-slate-600 font-medium">Tiempo Total</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">{tiempoImplementacion}</div>
              <div className="text-sm text-slate-500">días</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div className="text-sm text-slate-600 font-medium">Costo Total</div>
              </div>
              <div className="text-2xl font-bold text-green-700">${montoTotalImplementacion.toLocaleString()}</div>
            </Card>
          </div>
        </div>
        
        {/* Operación Summary */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <h4 className="text-lg font-semibold text-slate-700">Operación</h4>
          </div>
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <div className="text-sm text-slate-600 font-medium">Costo Total de Operación</div>
            </div>
            <div className="text-3xl font-bold text-purple-700">${montoTotalOperacion.toLocaleString()}</div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default CostSummary;
