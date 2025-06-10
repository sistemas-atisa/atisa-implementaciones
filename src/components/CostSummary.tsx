
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';

interface CostSummaryProps {
  tiempoImplementacion: number;
  tiempoOperacion?: number;
  montoTotalImplementacion: number;
  montoTotalOperacion: number;
  tiempoImplementacionUnit?: string;
  tiempoOperacionUnit?: string;
}

const CostSummary: React.FC<CostSummaryProps> = ({
  tiempoImplementacion,
  tiempoOperacion = 0,
  montoTotalImplementacion,
  montoTotalOperacion,
  tiempoImplementacionUnit = '',
  tiempoOperacionUnit = ''
}) => {
  return (
    <Card className="mt-8 p-8 bg-white border-gray-200 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="h-6 w-6 text-red-600" />
        <h3 className="text-xl font-bold text-gray-900">Resumen de Costos</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Implementación Summary */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h4 className="text-lg font-semibold text-gray-800">Implementación</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div className="text-sm text-gray-700 font-medium">Tiempo Total</div>
              </div>
              <div className="text-2xl font-bold text-red-700">
                {tiempoImplementacion}
              </div>
              {tiempoImplementacionUnit && (
                <div className="text-sm text-gray-600 mt-1">{tiempoImplementacionUnit}</div>
              )}
            </Card>
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-gray-800" />
                <div className="text-sm text-gray-700 font-medium">Costo Total</div>
              </div>
              <div className="text-2xl font-bold text-gray-800">${montoTotalImplementacion.toLocaleString()}</div>
            </Card>
          </div>
        </div>
        
        {/* Operación Summary */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <h4 className="text-lg font-semibold text-gray-800">Operación</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <div className="text-sm text-gray-700 font-medium">Tiempo Total</div>
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {tiempoOperacion}
              </div>
              {tiempoOperacionUnit && (
                <div className="text-sm text-gray-600 mt-1">{tiempoOperacionUnit}</div>
              )}
            </Card>
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-6 w-6 text-gray-800" />
                <div className="text-sm text-gray-700 font-medium">Costo Total</div>
              </div>
              <div className="text-2xl font-bold text-gray-800">${montoTotalOperacion.toLocaleString()}</div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CostSummary;
