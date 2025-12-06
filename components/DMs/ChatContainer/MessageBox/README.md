# MessageBox Component Architecture

This directory contains the refactored MessageBox component, broken down into smaller, interconnected sub-components for better maintainability and code organization.

## Component Structure

### Main Component
- **`index.tsx`** - Main MessageBox component that orchestrates all sub-components and manages state

### Sub-Components

1. **`FormattingToolbar.tsx`**
   - Renders the formatting toolbar with all markdown formatting buttons
   - Handles image upload dropdown
   - Toggle preview button
   - Props: formatter actions, preview state, image dropdown state

2. **`MessageInput.tsx`**
   - Textarea input component with action buttons (Clear, Send)
   - Handles keyboard events and focus/blur
   - Props: message state, event handlers

3. **`MessagePreview.tsx`**
   - Displays markdown preview with rendered content
   - Shows action buttons (Clear, Send) in preview mode
   - Props: message content, preview content, event handlers

4. **`FormatContextMenu.tsx`**
   - Right-click context menu with all formatting options
   - Organized into sections (headings, text formatting, code, links, lists, etc.)
   - Props: formatter actions, image upload handler

### Custom Hook
- **`useMarkdownFormatter.ts`**
  - Encapsulates all markdown formatting logic
  - Provides formatting actions (bold, italic, lists, etc.)
  - Smart line break logic for lists and blockquotes
  - Returns: All formatting action functions

### Types
- **`types.ts`**
  - Shared TypeScript interfaces
  - `UploadedImage` - Image file with preview URL
  - `MarkdownFormatterActions` - All formatter action functions

## Data Flow

```
index.tsx (Main Component)
├── State Management
│   ├── message
│   ├── showPreview
│   ├── uploadedImages
│   └── isImageDropdownOpen
│
├── useMarkdownFormatter Hook
│   └── Returns all formatting actions
│
├── FormattingToolbar
│   ├── Receives: formatter, preview state
│   └── Emits: toggle preview, image upload
│
├── MessageInput (when !showPreview)
│   ├── Receives: message, handlers
│   └── Emits: message change, send, clear
│
├── MessagePreview (when showPreview)
│   ├── Receives: message content
│   └── Emits: send, clear
│
└── FormatContextMenu
    ├── Receives: formatter actions
    └── Emits: formatting actions
```

## Key Features

### Smart Line Breaks
- Lists and blockquotes only add line breaks when current line has content
- Prevents unnecessary empty lines

### Keyboard Shortcuts
- **Ctrl/Cmd + B** - Bold
- **Ctrl/Cmd + I** - Italic
- **Ctrl/Cmd + K** - Link
- **Ctrl/Cmd + Enter** - Send message
- **Enter** - New line

### Image Upload
- Supports file upload with preview
- Placeholder system for uploaded images
- Automatic URL cleanup on unmount

## Benefits of This Architecture

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other contexts
3. **Testability** - Smaller components are easier to test
4. **Maintainability** - Changes are isolated to specific components
5. **Type Safety** - Shared types ensure consistency
6. **Performance** - Memoized callbacks and optimized re-renders
