# Obsidian Formatting Cheat Sheet

---

## Text

| Result | Syntax |
|---|---|
| **Bold** | `**text**` |
| *Italic* | `*text*` |
| ~~Strikethrough~~ | `~~text~~` |
| ==Highlight== | `==text==` |
| `Inline code` | `` `text` `` |
| > Blockquote | `> text` |

---

## Headings

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

---

## Lists

**Bullet list**
```
- Item one
- Item two
  - Nested item
```

**Numbered list**
```
1. First
2. Second
3. Third
```

**Task list**
```
- [ ] To do
- [x] Done
```

---

## Links

| Result | Syntax |
|---|---|
| Link to another note | `[[Note Name]]` |
| Link with custom label | `[[Note Name\|Label]]` |
| Link to a heading | `[[Note Name#Heading]]` |
| External URL | `[Label](https://example.com)` |

---

## Images & Embeds

```
![[image.png]]           embed image
![[image.png|300]]       embed image at 300px wide
![[Other Note]]          embed entire note inline
```

---

## Tables

```
| Column A | Column B |
|---|---|
| Value 1  | Value 2  |
```

---

## Code Blocks

````
```
plain code block
```

```typescript
// with syntax highlighting
const name = "Foundation";
```
````

---

## Callouts

```
> [!note]
> A general note.

> [!tip]
> A helpful tip.

> [!warning]
> Something to watch out for.

> [!important]
> Critical information.

> [!example]
> An example.
```

> [!note] Callouts can also have custom titles
> Just add the title after the type: `> [!note] My Title`

---

## Related

- [[Tech Glossary]] — definitions for Foundation design system terms
- [[accessibility-audit-todo]] — WCAG 2.2 audit log
- [[Issues & Open Questions]] — active bugs and open questions

---

## Horizontal Rule

```
---
```

---

## Keyboard Shortcuts

### Mac

| Action | Shortcut |
|---|---|
| Bold | `⌘ B` |
| Italic | `⌘ I` |
| New note | `⌘ N` |
| Open search | `⌘ O` |
| Global search | `⌘ Shift F` |
| Toggle sidebar | `⌘ \` |
| Toggle reading view | `⌘ E` |
| Insert template | `⌘ T` *(if Templater installed)* |
| Toggle checklist | `⌘ L` |
| Indent list item | `Tab` |
| Unindent list item | `Shift Tab` |

### Windows

| Action | Shortcut |
|---|---|
| Bold | `Ctrl B` |
| Italic | `Ctrl I` |
| New note | `Ctrl N` |
| Open search | `Ctrl O` |
| Global search | `Ctrl Shift F` |
| Toggle sidebar | `Ctrl \` |
| Toggle reading view | `Ctrl E` |
| Insert template | `Ctrl T` *(if Templater installed)* |
| Toggle checklist | `Ctrl L` |
| Indent list item | `Tab` |
| Unindent list item | `Shift Tab` |
