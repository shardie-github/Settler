# Internationalization (i18n) Architecture

## Overview

This document describes the internationalization architecture for the Settler application. The system is designed to be lightweight and ready for future expansion to multiple languages.

## Current Status

**Supported Locales**: English (en) - Primary
**Future Locales**: French (fr) - Scaffolded, ready for translation

## Architecture

### Folder Structure

```
src/lib/i18n/
├── index.ts              # Core i18n utilities and types
├── locales/
│   ├── en.json           # English translations
│   └── fr.json           # French translations (placeholder)
└── hooks/
    └── use-translation.ts # React hook (future)
```

### Core Files

#### `lib/i18n/index.ts`

Provides:
- `Locale` type definition
- `TranslationKeys` interface
- `translate()` function
- `getLocale()` function
- `setLocale()` function

#### Locale Files (`locales/*.json`)

JSON files containing all user-facing strings organized by category:
- `common`: Common UI strings (loading, error, success, etc.)
- `navigation`: Navigation labels
- `forms`: Form labels, placeholders, errors
- `errors`: Error messages
- `emptyStates`: Empty state messages
- `buttons`: Button labels

## Translation Key Structure

```typescript
{
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    // ...
  },
  "navigation": {
    "home": "Home",
    "docs": "Docs",
    // ...
  },
  "forms": {
    "required": "This field is required",
    "invalidEmail": "Please enter a valid email address",
    // ...
  },
  "errors": {
    "generic": "Something went wrong. Please try again.",
    "network": "Network error. Please check your connection.",
    // ...
  },
  "emptyStates": {
    "noData": "No data available",
    "noResults": "No results found",
    // ...
  },
  "buttons": {
    "create": "Create",
    "save": "Save Changes",
    // ...
  }
}
```

## Usage Patterns

### Basic Translation

```typescript
import { translate, getLocale } from '@/lib/i18n';

const locale = getLocale();
const loadingText = translate('common.loading', locale);
```

### With Parameters

```typescript
const minLengthError = translate(
  'forms.minLength',
  locale,
  { min: 8 }
);
// Returns: "Must be at least 8 characters"
```

### In Components

```tsx
import { translate, getLocale } from '@/lib/i18n';

function MyComponent() {
  const locale = getLocale();
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(key, locale, params);
  
  return (
    <button>
      {t('buttons.create')}
    </button>
  );
}
```

## Future Integration

### Next.js Integration

When ready to integrate with `next-intl` or similar:

1. **Install dependency**:
   ```bash
   npm install next-intl
   ```

2. **Update middleware**:
   ```typescript
   // middleware.ts
   import createMiddleware from 'next-intl/middleware';
   
   export default createMiddleware({
     locales: ['en', 'fr'],
     defaultLocale: 'en'
   });
   ```

3. **Update components**:
   ```tsx
   import { useTranslations } from 'next-intl';
   
   function MyComponent() {
     const t = useTranslations('common');
     return <button>{t('loading')}</button>;
   }
   ```

### React Hook (Future)

```typescript
// hooks/use-translation.ts
import { useState, useEffect } from 'react';
import { translate, getLocale, setLocale, Locale } from '@/lib/i18n';

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(getLocale());
  
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(key, locale, params);
  
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setLocaleState(newLocale);
    // Trigger re-render
  };
  
  return { t, locale, setLocale: changeLocale };
}
```

## Externalizing Strings

### Process

1. **Identify hardcoded strings** in components
2. **Add to locale file** under appropriate category
3. **Replace in component** with `translate()` call
4. **Test** in target locale

### Example Migration

**Before**:
```tsx
<button>Create Project</button>
```

**After**:
```tsx
import { translate, getLocale } from '@/lib/i18n';

const t = (key: string) => translate(key, getLocale());

<button>{t('buttons.create')}</button>
```

## RTL (Right-to-Left) Readiness

### Current Status
- Layout uses flexbox/grid (RTL-friendly)
- Text alignment respects `dir` attribute
- Icons positioned with logical properties

### Future Implementation

1. **Detect RTL languages** (Arabic, Hebrew, etc.)
2. **Set `dir="rtl"`** on HTML element
3. **Use logical CSS properties**:
   - `margin-inline-start` instead of `margin-left`
   - `padding-inline-end` instead of `padding-right`
4. **Flip icons** where appropriate
5. **Test layout** in RTL mode

## Language Switcher Component

### Future Component

```tsx
// components/LanguageSelector.tsx
'use client';

import { useTranslation } from '@/lib/i18n/hooks/use-translation';
import { supportedLocales, Locale } from '@/lib/i18n';

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  
  // Hide if only one language
  if (supportedLocales.length <= 1) return null;
  
  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      aria-label="Select language"
    >
      {supportedLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
```

## Best Practices

### 1. Externalize All User-Facing Text
- Buttons, labels, placeholders
- Error messages
- Empty states
- Tooltips, help text

### 2. Avoid Concatenation
**Bad**:
```typescript
`${t('common.loading')} ${itemName}`
```

**Good**:
```typescript
t('common.loadingItem', { item: itemName })
```

### 3. Use Descriptive Keys
**Bad**: `"text1"`, `"message"`
**Good**: `"buttons.create"`, `"errors.network"`

### 4. Keep Context
Group related strings:
- `forms.*` - Form-related strings
- `errors.*` - Error messages
- `navigation.*` - Navigation labels

### 5. Parameterize Dynamic Content
Use parameters for:
- Numbers (counts, limits)
- Names (user names, item names)
- Dates (formatted separately)

## Testing

### Manual Testing
1. Switch locale in browser/dev tools
2. Verify all strings are translated
3. Check layout in RTL mode (if applicable)
4. Test date/number formatting

### Automated Testing
```typescript
// __tests__/i18n.test.ts
import { translate, getLocale } from '@/lib/i18n';

describe('i18n', () => {
  it('translates keys correctly', () => {
    expect(translate('common.loading', 'en')).toBe('Loading...');
  });
  
  it('handles parameters', () => {
    expect(translate('forms.minLength', 'en', { min: 8 }))
      .toBe('Must be at least 8 characters');
  });
});
```

## Migration Checklist

When adding a new language:

- [ ] Create locale file (`locales/{locale}.json`)
- [ ] Translate all strings
- [ ] Add locale to `supportedLocales`
- [ ] Test in target locale
- [ ] Verify RTL support (if applicable)
- [ ] Update language switcher
- [ ] Test date/number formatting
- [ ] Update documentation

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [i18next Documentation](https://www.i18next.com/)
- [RTL CSS Guide](https://rtlstyling.com/)
- [ICU Message Format](https://formatjs.io/docs/core-concepts/icu-syntax/)

---

**Last Updated**: Phase 8 Implementation
**Maintained By**: Engineering Team
