
export type TimeUnit = 'dias' | 'semanas' | 'meses';

export const convertFromDays = (days: number, unit: TimeUnit): number => {
  switch (unit) {
    case 'dias':
      return days;
    case 'semanas':
      return Math.round((days / 7) * 100) / 100; // Round to 2 decimal places
    case 'meses':
      return Math.round((days / 30) * 100) / 100; // Round to 2 decimal places
    default:
      return days;
  }
};

export const convertToDays = (value: number, unit: TimeUnit): number => {
  switch (unit) {
    case 'dias':
      return value;
    case 'semanas':
      return value * 7;
    case 'meses':
      return value * 30;
    default:
      return value;
  }
};

export const getUnitLabel = (unit: TimeUnit): string => {
  switch (unit) {
    case 'dias':
      return 'días';
    case 'semanas':
      return 'semanas';
    case 'meses':
      return 'meses';
    default:
      return 'días';
  }
};
