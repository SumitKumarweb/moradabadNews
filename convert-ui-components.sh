#!/bin/bash

# Bulk UI Component Converter
# Converts TypeScript UI components to JavaScript

echo "🔄 Converting UI components from TypeScript to JavaScript..."

# Source and destination directories
SRC_DIR="../moradabad-news/components/ui"
DEST_DIR="./src/components/ui"

# Create destination directory
mkdir -p "$DEST_DIR"

# List of UI components to convert (already done: button, card, input, label, toast, toaster)
components=(
  "accordion"
  "alert-dialog"
  "alert"
  "aspect-ratio"
  "avatar"
  "badge"
  "breadcrumb"
  "button-group"
  "calendar"
  "carousel"
  "checkbox"
  "collapsible"
  "command"
  "context-menu"
  "dialog"
  "drawer"
  "dropdown-menu"
  "empty"
  "field"
  "form"
  "hover-card"
  "input-group"
  "input-otp"
  "item"
  "kbd"
  "menubar"
  "navigation-menu"
  "pagination"
  "popover"
  "progress"
  "radio-group"
  "resizable"
  "scroll-area"
  "select"
  "separator"
  "sheet"
  "sidebar"
  "skeleton"
  "slider"
  "sonner"
  "spinner"
  "switch"
  "table"
  "tabs"
  "textarea"
  "toggle-group"
  "toggle"
  "tooltip"
  "use-mobile"
)

# Convert each component
for component in "${components[@]}"; do
  src_file="$SRC_DIR/${component}.tsx"
  dest_file="$DEST_DIR/${component}.jsx"
  
  if [ -f "$src_file" ]; then
    echo "  Converting $component.tsx → $component.jsx"
    
    # Copy and convert using sed
    cat "$src_file" | \
      # Remove 'use client' directive
      grep -v "^'use client'" | \
      grep -v "^\"use client\"" | \
      # Remove type imports
      sed 's/import type {[^}]*} from [^;]*;//g' | \
      sed 's/type VariantProps/VariantProps/g' | \
      # Remove interface declarations (multi-line)
      sed '/^interface /,/^}/d' | \
      sed '/^export interface /,/^}/d' | \
      # Remove type annotations from React.forwardRef
      sed 's/React\.forwardRef<[^>]*>/React.forwardRef/g' | \
      # Remove type annotations from parameters
      sed 's/: React\.[A-Za-z<>]*//g' | \
      sed 's/: HTML[A-Za-z]*//g' | \
      sed 's/& VariantProps<[^>]*>//g' | \
      sed 's/& {[^}]*}//g' | \
      # Remove export type
      sed '/^export type /d' | \
      sed 's/export { type [^,]*, /export { /g' | \
      sed 's/, type [^}]*}/}/g' | \
      # Clean up
      sed 's/  \+/ /g' > "$dest_file"
    
    echo "    ✓ Converted $component"
  else
    echo "    ⚠ Skipping $component (file not found)"
  fi
done

echo ""
echo "✅ UI component conversion complete!"
echo "📁 Location: $DEST_DIR"
echo ""
echo "⚠️  Note: Some components may need manual cleanup."
echo "   Review each file and fix any remaining TypeScript syntax."

