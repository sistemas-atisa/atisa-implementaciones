
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type TimeUnit = 'dias' | 'semanas' | 'meses';

interface TimeUnitSelectorProps {
  value: TimeUnit;
  onChange: (unit: TimeUnit) => void;
}

const TimeUnitSelector: React.FC<TimeUnitSelectorProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-28 h-6 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dias">Días</SelectItem>
        <SelectItem value="semanas">Semanas</SelectItem>
        <SelectItem value="meses">Meses</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeUnitSelector;
