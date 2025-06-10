
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Shield } from 'lucide-react';

interface ViewToggleProps {
  isAdminView: boolean;
  onToggleView: () => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ isAdminView, onToggleView }) => {
  return (
    <Button
      onClick={onToggleView}
      variant="outline"
      className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-200"
    >
      {isAdminView ? (
        <>
          <User className="h-4 w-4" />
          Cambiar a Vista de Usuario
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          Vista Administrador
        </>
      )}
    </Button>
  );
};

export default ViewToggle;
