import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface TagsDisplayProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  isSelectable?: boolean;
  selectedTags?: Set<string>;
  maxDisplay?: number;
}

export function TagsDisplay({
  tags,
  onTagClick,
  onTagRemove,
  isSelectable = false,
  selectedTags = new Set(),
  maxDisplay = tags.length,
}: TagsDisplayProps) {
  const displayTags = tags.slice(0, maxDisplay);
  const hiddenCount = tags.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayTags.map((tag, index) => (
        <div
          key={`${tag}-${index}`}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
            isSelectable && selectedTags.has(tag)
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          } ${isSelectable && onTagClick ? 'cursor-pointer' : ''}`}
          onClick={() => isSelectable && onTagClick && onTagClick(tag)}
        >
          <span>{tag}</span>
          {onTagRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTagRemove(tag);
              }}
              className="ml-1 hover:opacity-70"
              aria-label={`Supprimer le tag ${tag}`}
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}
      {hiddenCount > 0 && (
        <Badge variant="outline" className="text-xs">
          +{hiddenCount}
        </Badge>
      )}
    </div>
  );
}
