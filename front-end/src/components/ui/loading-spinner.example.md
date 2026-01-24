# LoadingSpinner Component Usage Examples

## Basic Usage

```tsx
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Simple spinner
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading data..." />

// Different sizes
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

## Common Use Cases

### 1. Full Screen Loading
```tsx
<LoadingSpinner size="lg" text="Loading application..." fullScreen />
```

### 2. Button Loading State
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <div className="flex items-center">
      <LoadingSpinner size="sm" className="mr-2" />
      Processing...
    </div>
  ) : (
    'Submit'
  )}
</Button>
```

### 3. Card/Section Loading
```tsx
<Card>
  <CardContent>
    {isLoading ? (
      <LoadingSpinner text="Loading content..." />
    ) : (
      <div>Your content here</div>
    )}
  </CardContent>
</Card>
```

### 4. Inline Loading
```tsx
<div className="flex items-center space-x-2">
  <LoadingSpinner size="sm" />
  <span>Saving changes...</span>
</div>
```

## Props

- `size`: 'sm' | 'md' | 'lg' - Controls spinner size
- `className`: string - Additional CSS classes
- `text`: string - Optional loading text
- `fullScreen`: boolean - Makes it full screen with background