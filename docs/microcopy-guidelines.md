# Microcopy Guidelines

## Overview

This document defines the tone, voice, and writing standards for all user-facing text in the Settler application. Consistent microcopy creates a cohesive user experience and builds trust.

## Tone & Voice

### Tone
- **Friendly**: Approachable and warm, but not overly casual
- **Professional**: Competent and trustworthy
- **Concise**: Direct and to the point, avoiding verbosity
- **Empowering**: Helps users understand and take action

### Voice
- **Active**: Use active voice ("Create project" not "Project can be created")
- **Empowering**: Focus on what users can accomplish
- **Non-patronizing**: Treat users as capable and intelligent
- **Clear**: Avoid jargon unless necessary, explain technical terms when used

### Style Principles

1. **Be Direct**: Say what you mean clearly and concisely
2. **Be Positive**: Frame instructions positively when possible
3. **Be Specific**: Avoid vague phrases like "a moment" or "soon"
4. **Be Consistent**: Use the same terminology throughout
5. **Be Action-Oriented**: Use verbs for buttons and actions

## Writing Rules

### Buttons & CTAs

**Format**: Title case, action verbs
- ✅ "Create Project"
- ✅ "Save Changes"
- ✅ "View Dashboard"
- ✅ "Get Started"
- ❌ "create project" (sentence case)
- ❌ "Click here" (vague)
- ❌ "Submit" (too generic)

**Guidelines**:
- Use action verbs: Create, Save, Delete, Edit, View, etc.
- Be specific: "Save Changes" not "Save"
- For destructive actions, be clear: "Delete Account" not "Remove"

### Form Labels & Placeholders

**Labels**:
- Be descriptive: "Email Address" not "Email" (if context unclear)
- Use title case: "First Name"
- Required fields: Add asterisk (*) and indicate in help text

**Placeholders**:
- Show example format: "john@example.com"
- Be helpful: "Enter your email address"
- Avoid placeholder as only label (accessibility issue)

**Error Messages**:
- Be specific: "Email address is invalid" not "Error"
- Be actionable: "Password must be at least 8 characters"
- Be helpful: "This email is already registered. Try signing in instead."

### Empty States

**Structure**:
1. Icon/Illustration (visual)
2. Headline (what's missing)
3. Description (why it's empty, optional)
4. CTA (what to do next)

**Examples**:
- ✅ "No projects yet"
  - "Create your first project to get started"
  - [Create Project]
- ✅ "No results found"
  - "Try adjusting your filters or search terms"
  - [Clear Filters]

### Error States

**Structure**:
1. Clear error title
2. User-friendly explanation (no technical jargon)
3. Actionable next steps
4. Retry/Support options

**Examples**:
- ✅ "Unable to load data"
  - "Please check your connection and try again"
  - [Try Again] [Contact Support]
- ✅ "Something went wrong"
  - "We're working on fixing this. Please try again in a few minutes."
  - [Try Again]

### Loading States

- Use present continuous: "Loading..." not "Load"
- Be specific when possible: "Saving changes..." not "Loading..."
- For long operations: "Processing... This may take a minute"

### Success Messages

- Be specific: "Project created successfully" not "Success"
- Be brief: "Changes saved" not "Your changes have been successfully saved"
- Use positive language: "Connected" not "Connection successful"

### Tooltips

- Be concise: One line when possible
- Be helpful: Explain why, not just what
- Examples:
  - ✅ "This setting affects all team members"
  - ❌ "Settings"

### Modal Titles & Descriptions

**Titles**: Clear action or question
- ✅ "Delete Project?"
- ✅ "Create New Project"
- ❌ "Warning"
- ❌ "Are you sure?"

**Descriptions**: Explain consequences
- ✅ "This action cannot be undone. All data will be permanently deleted."
- ❌ "This will delete the project."

## Terminology Consistency

### Standard Terms

| Context | Preferred Term | Avoid |
|---------|---------------|-------|
| User actions | Create, Edit, Delete, View | Add, Remove, Show |
| Data states | Loading, Error, Empty | Fetching, Failed, None |
| Navigation | Dashboard, Settings, Profile | Home, Config, Account |
| Forms | Submit, Save, Cancel | Send, Store, Close |

### Technical Terms

When using technical terms:
1. **First use**: Explain briefly
   - "API key (used to authenticate requests)"
2. **Subsequent uses**: Use consistently
3. **Avoid**: Unnecessary technical jargon in user-facing text

## Before & After Examples

### Button Labels

**Before**: "Click here to get started"
**After**: "Get Started"

**Before**: "Submit"
**After**: "Save Changes"

**Before**: "Remove"
**After**: "Delete Project"

### Error Messages

**Before**: "Error: Failed to fetch"
**After**: "Unable to load data. Please check your connection and try again."

**Before**: "404 Not Found"
**After**: "The page you're looking for doesn't exist."

### Empty States

**Before**: "No data"
**After**: "No projects yet. Create your first project to get started."

**Before**: "Nothing here"
**After**: "No results found. Try adjusting your search or filters."

### Form Placeholders

**Before**: "Email"
**After**: "you@example.com"

**Before**: "Password"
**After**: "Enter your password"

## Accessibility Considerations

1. **Alt Text**: Descriptive for images, empty for decorative
2. **ARIA Labels**: Use when text isn't visible (icon buttons)
3. **Error Announcements**: Use `aria-live` for dynamic errors
4. **Loading States**: Use `aria-busy` and `aria-live`

## Language & Localization

- Write in plain English (US)
- Avoid idioms and cultural references
- Keep strings externalized for translation
- Consider RTL languages in layout (future)

## Review Checklist

Before publishing any user-facing text:

- [ ] Uses active voice
- [ ] Is concise and clear
- [ ] Uses consistent terminology
- [ ] Provides actionable guidance
- [ ] Avoids technical jargon (or explains it)
- [ ] Is accessible (proper labels, ARIA)
- [ ] Matches tone and voice guidelines
- [ ] Has been proofread for typos

## Examples by Component Type

### Navigation
- "Docs" (not "Documentation" - too long for nav)
- "Get Started" (not "Sign Up" - more welcoming)

### Forms
- "Email Address" (label)
- "you@example.com" (placeholder)
- "Please enter a valid email address" (error)

### Buttons
- Primary: "Create Project"
- Secondary: "Cancel"
- Destructive: "Delete Account"

### Notifications
- Success: "Project created successfully"
- Error: "Unable to save changes. Please try again."
- Info: "Your changes have been saved"

---

**Last Updated**: Phase 8 Implementation
**Maintained By**: Design & Product Team
