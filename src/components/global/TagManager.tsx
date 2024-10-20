import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TagManagerProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
  onClearTags: () => void;
}

export function TagManager({ tags, onRemoveTag, onClearTags }: TagManagerProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <span key={tag} className="bg-yellow-400/50 text-sm px-2 py-1 rounded-full flex items-center">
          {tag}
          <button onClick={() => onRemoveTag(tag)} className="ml-2 focus:outline-none">
            <X size={14} />
          </button>
        </span>
      ))}
      <Button variant="outline" size="sm" onClick={onClearTags}>
        Clear All Tags
      </Button>
    </div>
  );
}