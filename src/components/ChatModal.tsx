
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Send } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  description: string;
  time: number;
  cost: number;
  currentDirection?: string;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  description,
  time,
  cost,
  currentDirection = ''
}) => {
  const [comment, setComment] = useState('');

  const handleSendComment = () => {
    // Here you would implement the actual send functionality
    console.log('Sending comment:', comment);
    setComment('');
  };

  // Capitalize the first letter of the direction
  const formatDirection = (dir: string) => {
    if (!dir) return 'DIRECCIÓN SISTEMAS Y TECNOLOGÍA';
    return `DIRECCIÓN ${dir.toUpperCase()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-t-lg -m-6 mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {formatDirection(currentDirection)}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-left space-y-1 text-sm">
            <div><strong>6M:</strong> {categoryName}</div>
            <div><strong>Descripción:</strong> {description || 'Sin descripción'}</div>
            <div><strong>Duración:</strong> {time} días</div>
            <div><strong>Costos:</strong> ${cost.toLocaleString()} m.n.</div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="text-center text-gray-500 py-8">
            No hay mensajes en la bitácora
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex gap-2">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Añadir comentario..."
              className="flex-1 min-h-[40px] max-h-[100px] resize-none"
              rows={2}
            />
            <Button
              onClick={handleSendComment}
              disabled={!comment.trim()}
              className="self-end"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
