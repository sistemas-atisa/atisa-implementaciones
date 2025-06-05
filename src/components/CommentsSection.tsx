
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, User, Clock } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
}

const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Director General',
      role: 'Dirección General',
      content: 'Esta implementación es muy prometedora. Me gustaría ver más detalles sobre los costos de operación.',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: '2',
      author: 'Ana García',
      role: 'Finanzas',
      content: 'Los números se ven bien, pero necesitamos revisar el presupuesto para Q2.',
      timestamp: '2024-01-15 16:45'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Usuario Actual',
        role: 'Administración',
        content: newComment,
        timestamp: new Date().toLocaleString('es-MX', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <Card className="p-6 mb-8 bg-white border-gray-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-full">
          <MessageCircle className="h-5 w-5 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Comentarios y Observaciones</h3>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-4 border-gray-300 pl-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">{comment.author}</span>
              <span className="text-xs text-gray-500">({comment.role})</span>
              <div className="flex items-center gap-1 ml-auto text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {comment.timestamp}
              </div>
            </div>
            <p className="text-gray-700 text-sm">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Add New Comment */}
      <div className="border-t border-gray-200 pt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agregar comentario..."
          className="mb-3 border-gray-200 focus:border-gray-400 focus:ring-gray-400/20 rounded-lg"
          rows={3}
        />
        <Button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Agregar Comentario
        </Button>
      </div>
    </Card>
  );
};

export default CommentsSection;
