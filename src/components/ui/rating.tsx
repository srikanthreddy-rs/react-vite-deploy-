import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
}

export const Rating = ({ 
  value, 
  onChange, 
  readonly = false, 
  size = 'md',
  className,
  showValue = false 
}: RatingProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={cn(
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            )}
            onClick={() => handleClick(star)}
            disabled={readonly}
          >
            <Star
              className={cn(
                sizes[size],
                star <= value
                  ? "fill-warning text-warning"
                  : "fill-none text-muted-foreground",
                !readonly && "hover:text-warning transition-colors"
              )}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground ml-2">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};