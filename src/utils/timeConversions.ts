
export type TimeUnit = 'dias' | 'semanas' | 'meses';

export const convertTime = (value: number, fromUnit: TimeUnit, toUnit: TimeUnit): number => {
  if (fromUnit === toUnit) return value;
  
  // Convert everything to days first
  let days: number;
  switch (fromUnit) {
    case 'dias':
      days = value;
      break;
    case 'semanas':
      days = value * 7;
      break;
    case 'meses':
      days = value * 30; // Assuming 30 days per month
      break;
    default:
      days = value;
  }
  
  // Convert from days to target unit
  switch (toUnit) {
    case 'dias':
      return Math.round(days);
    case 'semanas':
      return Math.round(days / 7 * 100) / 100; // Round to 2 decimal places
    case 'meses':
      return Math.round(days / 30 * 100) / 100; // Round to 2 decimal places
    default:
      return days;
  }
};

export const getTimeUnitLabel = (unit: TimeUnit): string => {
  switch (unit) {
    case 'dias':
      return 'Días';
    case 'semanas':
      return 'Semanas';
    case 'meses':
      return 'Meses';
    default:
      return 'Días';
  }
};
