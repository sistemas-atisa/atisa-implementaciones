
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onSave: () => void;
  isLoading?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isLoading = false }) => {
  return (
    <div className="mt-8 mb-8 flex justify-center">
      <Button
        onClick={onSave}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
      >
        <Save className="h-5 w-5" />
        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
      </Button>
    </div>
  );
};

export default SaveButton;
