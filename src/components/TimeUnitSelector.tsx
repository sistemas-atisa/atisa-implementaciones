
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type TimeUnit = 'dias' | 'semanas' | 'meses';

interface TimeUnitSelectorProps {
  value: TimeUnit;
  onChange: (value: TimeUnit) => void;
}

const TimeUnitSelector: React.FC<TimeUnitSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-700">Unidad:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-24 h-7 text-xs">
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
