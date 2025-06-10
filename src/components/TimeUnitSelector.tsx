
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';

export type TimeUnit = 'dias' | 'semanas' | 'meses';

interface TimeUnitSelectorProps {
  value: TimeUnit;
  onValueChange: (value: TimeUnit) => void;
}

const TimeUnitSelector: React.FC<TimeUnitSelectorProps> = ({ value, onValueChange }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Clock className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Unidad de tiempo:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-32 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dias">Días</SelectItem>
          <SelectItem value="semanas">Semanas</SelectItem>
          <SelectItem value="meses">Meses</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeUnitSelector;
