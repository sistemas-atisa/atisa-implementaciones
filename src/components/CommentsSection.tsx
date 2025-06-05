
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, User } from 'lucide-react';

const CommentsSection: React.FC = () => {
  const [newComment, setNewComment] = useState('');

  // Sample comments data matching the image
  const comments = [
    {
      id: 1,
      author: 'Director General',
      department: 'Dirección General',
      message: 'Esta implementación es muy prometedora. Me gustaría ver más detalles sobre los costos de operación.',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 2,
      author: 'Ana García',
      department: 'Finanzas',
      message: 'Los números se ven bien, pero necesitamos revisar el presupuesto para Q2.',
      timestamp: '2024-01-15 16:45'
    }
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would add to the comments list
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <Card className="mt-8 p-6 bg-white border-gray-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="h-6 w-6 text-gray-600" />
        <h3 className="text-2xl font-bold text-gray-900">Comentarios y Observaciones</h3>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-4 border-gray-200 pl-4 py-3 bg-gray-50 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{comment.author}</span>
              <span className="text-sm text-gray-500">({comment.department})</span>
              <span className="ml-auto text-xs text-gray-400">{comment.timestamp}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{comment.message}</p>
          </div>
        ))}
      </div>

      {/* Add Comment Section */}
      <div className="border-t border-gray-200 pt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agregar comentario..."
          className="mb-3 min-h-[80px] resize-none border-gray-300 focus:border-gray-500 focus:ring-gray-500/20"
        />
        <Button
          onClick={handleAddComment}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
        >
          Agregar Comentario
        </Button>
      </div>
    </Card>
  );
};

export default CommentsSection;
