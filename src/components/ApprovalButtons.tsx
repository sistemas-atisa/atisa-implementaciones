
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface ApprovalButtonsProps {
  onApprove: () => void;
  onReject: () => void;
}

const ApprovalButtons: React.FC<ApprovalButtonsProps> = ({ onApprove, onReject }) => {
  return (
    <div className="flex gap-4 mt-6 justify-center">
      <Button
        onClick={onReject}
        variant="destructive"
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <X className="h-4 w-4" />
        Rechazar
      </Button>
      <Button
        onClick={onApprove}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <Check className="h-4 w-4" />
        Aprobar
      </Button>
    </div>
  );
};

export default ApprovalButtons;
