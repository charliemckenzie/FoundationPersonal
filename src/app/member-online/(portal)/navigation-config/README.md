# Member Online — Navigation config

This folder controls the **side navigation** in the Member Online portal
(`/member-online`). The nav has several variations for different member states
(Accumulation, $0 balance, Eligible for retirement, etc.). Each variation is a
plain JSON file you can edit directly — **no React or component code involved.**

> **Editing the nav? Start here.** Change the JSON in `configs/`, not the
> components in `src/components/MemberOnline/`.

---

## The one rule

**Each file in `configs/` is the entire nav for one member state.** It lists the
primary items, their sub-items, and the secondary items — top to bottom, exactly
as they appear. Files are self-contained: nothing is shared between them.

```
navigation-config/
  configs/
    accumulation.json     ← Accumulation (default)
    zero.json             ← $0 balance state
    eligible.json         ← Eligible for retirement
    decumulation.json     ← Decumulation (income) only
    both.json             ← Accumulation + Decumulation
  index.ts                ← registers the configs (you rarely touch this)
  types.ts                ← TypeScript shapes (you don't touch this)
  README.md               ← this file
```

---

## Anatomy of a config file

```jsonc
{
  "label": "Accumulation (default)",          // name in the config switcher
  "balance": {                                 // balance shown in the nav header
    "amount": "$112,200.00",
    "asAt": "As at 24 May 2026"
  },
  "primary":   [ /* main nav items */ ],
  "secondary": [ /* account-level items: Rewards, Profile, etc. */ ]
}
```

## Anatomy of a nav item

Every item in `primary` and `secondary` (and every sub-item) has this shape:

| Field | Required | What it does |
|---|---|---|
| `id` | **Yes** | Unique name within the file. Drives the active-page highlight. Use kebab-case, e.g. `"take-money-out"`. |
| `label` | **Yes** | The text shown in the nav. |
| `icon` | No | Font Awesome icon name, e.g. `"house"`, `"piggy-bank"`. See **Icons** below. |
| `href` | No | Where the item links to. `"#"` = not built yet (goes nowhere). A real path like `"/member-online/insurance"` when the page exists. See **URLs**. |
| `description` | No | Secondary line under the label, shown in flyout / drill-down sub-items only. |
| `children` | No | A list of sub-items. An item **with** `children` becomes a flyout (desktop) / drill-down (mobile) and ignores its own `href`. |

> An item has **either** a `href` (a link) **or** `children` (a flyout) — not both.

---

## Common edits

### Add a top-level item
Add an object to the `primary` array, in the position you want it to appear:

```json
{ "id": "calculators", "label": "Calculators", "icon": "calculator", "href": "#" }
```

### Add a child to a flyout
Add an object to that item's `children` array:

```json
{ "id": "tx-export", "label": "Export transactions", "icon": "download", "href": "#" }
```

### Remove / exclude a child
Delete the object from the `children` array. That's it — there's no separate
"exclude" list. (This is how `zero.json` shows fewer "Put money in" options than
`accumulation.json` — it simply omits those children.)

### Change an icon
Edit the item's `icon` value to another Font Awesome name.

### Change a label or the balance
Edit the `label` string, or the `balance.amount` / `balance.asAt` strings.

---

## Icons

`icon` takes a **Font Awesome icon name** (the kebab-case name, no `fa-` prefix),
e.g. `"chart-line"`, `"umbrella"`, `"money-check-dollar"`.

- To find a name, browse the **Icon** story in Storybook, or
  [fontawesome.com/icons](https://fontawesome.com/icons).
- The light/solid styling is automatic — the nav uses the light style normally
  and switches to solid when the item is active. You don't set this.

---

## URLs & routing

- `"href": "#"` — **not built yet.** The item shows in the nav but clicking it
  goes nowhere. This is the default for everything still in design.
- `"href": "/member-online/<page>"` — a **real link.** Use this once the page
  exists.

**Important:** putting a path in the nav does **not** create the page. A link
only works if a page actually exists at that path (a `page.tsx` under
`src/app/member-online/...`); otherwise it 404s. So adding a real link is two
jobs: set the `href` here **and** make sure the page exists.

To help track this, when you run the app in development the console prints an
**"unbuilt links"** list for each config — every item still pointing at `"#"`.
As you build real pages and swap in real paths, items drop off that list.

---

## Add a brand-new config

1. Copy an existing file in `configs/` to `configs/<your-name>.json` and edit it.
2. Open `index.ts` and add your file to the `CONFIG_FILES` list. The order there
   is the order it appears in the dashboard switcher.

That's all — it'll appear in the "Navigation config" switcher automatically.

## Which config shows by default

`DEFAULT_NAV_CONFIG` in `index.ts` sets the config shown on first load. (How the
"live" config is chosen for a real member is a separate mechanism, added later —
this is the single place it will plug in.)

---

## Notes & gotchas

- **`id` must be unique within a file.** It's used as the React key and the
  active-page highlight. The dev build throws a clear error if two items share an id.
- **Self-contained files mean some duplication.** Flyouts that appear in several
  configs (e.g. Transactions, Investments) are copied into each. If you change
  one, change it in the others that use it. Currently duplicated across configs:
  **Transactions**, **Investments**, **Put money in**, **Take money out (lump
  sum)**, and the **secondary** list.
- **Bad edits fail loudly in dev.** Missing `id`/`label`, an empty `children`
  array, or a duplicate `id` will throw an error with the config name when you
  run `npm run dev` — read the message, fix the JSON.
