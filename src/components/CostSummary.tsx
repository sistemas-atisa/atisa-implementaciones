
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/utils/formatCurrency';

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
  const montoTotal = montoTotalImplementacion + montoTotalOperacion;

  return (
    <Card className="p-8 mb-8 bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Resumen de Costos y Tiempo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Tiempo de Implementación</h4>
          <p className="text-3xl font-bold text-blue-600">{formatNumber(tiempoImplementacion)}</p>
          <p className="text-sm text-gray-600">días</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Costo de Implementación</h4>
          <p className="text-2xl font-bold text-green-600">${formatNumber(montoTotalImplementacion)}</p>
          <p className="text-sm text-gray-600">MXN</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Costo de Operación</h4>
          <p className="text-2xl font-bold text-orange-600">${formatNumber(montoTotalOperacion)}</p>
          <p className="text-sm text-gray-600">MXN</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Costo Total</h4>
          <p className="text-2xl font-bold text-purple-600">${formatNumber(montoTotal)}</p>
          <p className="text-sm text-gray-600">MXN</p>
        </div>
      </div>
    </Card>
  );
};

export default CostSummary;
