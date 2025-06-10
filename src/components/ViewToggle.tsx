
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ViewToggleProps {
  isAdminView: boolean;
  onToggleView: () => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ isAdminView, onToggleView }) => {
  const navigate = useNavigate();

  const handleToggleView = () => {
    onToggleView();
    // Navigate based on current view state
    if (isAdminView) {
      // Going to user view
      navigate('/my-implementations');
    } else {
      // Going to admin view
      navigate('/directions/administracion');
    }
  };

  return (
    <Button
      onClick={handleToggleView}
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
          Cambiar a Vista de Administrador
        </>
      )}
    </Button>
  );
};

export default ViewToggle;
