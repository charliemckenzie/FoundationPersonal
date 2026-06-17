---
mode: agent
description: 'Query the Foundation session history to surface recent work, patterns, and improvement suggestions. Use: /chronicle standup | /chronicle improve | /chronicle search <topic>'
tools: [session_store_sql, read_file, memory]
---

# Chronicle — Foundation Session History

> **Requires an MCP server providing `session_store_sql` and `memory`.** This is not configured by default — `.vscode/mcp.json` has no servers. Until that server is registered, `/chronicle` will fail. This prompt is Copilot-only (Claude Code has no equivalent prompt mechanism).

You are a session historian for the Foundation design system project.
Use `session_store_sql` to query the local session store and surface useful insights.

**Always run `reindex` first** if the user hasn't queried recently (sessions may be stale).

---

## Commands

### `/chronicle standup`
Produce a daily standup summary of the last 24 hours.

```sql
-- Sessions in the last 24 hours
SELECT id, agent_name, summary, created_at, updated_at
FROM sessions
WHERE created_at >= datetime('now', '-1 day')
ORDER BY created_at DESC
```

Then query for files touched:
```sql
SELECT sf.file_path, COUNT(*) as edits, MAX(sf.updated_at) as last_edit
FROM session_files sf
JOIN sessions s ON sf.session_id = s.id
WHERE s.created_at >= datetime('now', '-1 day')
GROUP BY sf.file_path
ORDER BY edits DESC
LIMIT 20
```

Report:
- How many sessions ran
- Which agents were active
- Which files were edited most
- Summary of work done

---

### `/chronicle improve`
Analyse recent sessions to surface patterns, recurring issues, and improvement suggestions.

**Step 1 — Reindex**
Run `session_store_sql` with `action: reindex` to ensure sessions are current.

**Step 2 — Query last 7 days**
```sql
SELECT id, agent_name, summary, created_at
FROM sessions
WHERE created_at >= datetime('now', '-7 days')
ORDER BY created_at DESC
```

**Step 3 — Most-edited files (last 7 days)**
```sql
SELECT sf.file_path, COUNT(*) as edits
FROM session_files sf
JOIN sessions s ON sf.session_id = s.id
WHERE s.created_at >= datetime('now', '-7 days')
GROUP BY sf.file_path
ORDER BY edits DESC
LIMIT 15
```

**Step 4 — Agent activity breakdown**
```sql
SELECT agent_name, COUNT(*) as sessions
FROM sessions
WHERE created_at >= datetime('now', '-7 days')
  AND agent_name IS NOT NULL
GROUP BY agent_name
ORDER BY sessions DESC
```

**Step 5 — Analyse and report**

Based on the data, produce:

1. **Work patterns** — What areas of the codebase are getting the most attention?
2. **Hotspots** — Files edited repeatedly may indicate instability or ongoing work
3. **Agent usage** — Which agents are being used and for what?
4. **Improvement suggestions** — Based on patterns, what could be improved?
   - Repeated edits to the same file → consider if the component needs refactoring
   - No test files touched → Playwright tests may need writing
   - No story files touched → Storybook coverage may be falling behind
   - Heavy Milhouse activity → check if components moved through the full pipeline

Read `/memories/repo/` files to cross-reference known project conventions and add context.

---

### `/chronicle search <topic>`
Search session history for a specific topic, component, or file.

```sql
-- FTS search across session content
SELECT s.id, s.agent_name, s.summary, s.created_at
FROM sessions s
JOIN search_index si ON s.id = si.session_id
WHERE search_index MATCH '<topic>'
ORDER BY s.created_at DESC
LIMIT 10
```

Also search by file path:
```sql
SELECT sf.file_path, sf.session_id, s.summary, s.created_at
FROM session_files sf
JOIN sessions s ON sf.session_id = s.id
WHERE sf.file_path LIKE '%<topic>%'
ORDER BY s.created_at DESC
LIMIT 10
```

---

## Data Availability Note

The session store captures:
- Session metadata (agent name, timestamps, cwd, branch, summary)
- Files edited per session
- Turn-level refs and checkpoints (when available)

If queries return empty results, the index may be stale. Run:
```
action: reindex
```
Then retry.

**Step 3 — Most-edited files (last 7 days)**
```sql
SELECT sf.file_path, COUNT(*) as edits
FROM session_files sf
JOIN sessions s ON sf.session_id = s.id
WHERE s.created_at >= datetime('now', '-7 days')
GROUP BY sf.file_path
ORDER BY edits DESC
LIMIT 15
```

**Step 4 — Agent activity breakdown**
```sql
SELECT agent_name, COUNT(*) as sessions
FROM sessions
WHERE created_at >= datetime('now', '-7 days')
  AND agent_name IS NOT NULL
GROUP BY agent_name
ORDER BY sessions DESC
```

**Step 5 — Analyse and report**

Based on the data, produce:

1. **Work patterns** — What areas of the codebase are getting the most attention?
2. **Hotspots** — Files edited repeatedly may indicate instability or ongoing work
3. **Agent usage** — Which agents are being used and for what?
4. **Improvement suggestions** — Based on patterns, what could be improved?
   - Repeated edits to the same file → consider if the component needs refactoring
   - No test files touched → Playwright tests may need writing
   - No story files touched → Storybook coverage may be falling behind
   - Heavy Milhouse activity → check if components moved through the full pipeline

Read `/memories/repo/` files to cross-reference known project conventions and add context.

---

### `/chronicle search <topic>`
Search session history for a specific topic, component, or file.

```sql
-- FTS search across session content
SELECT s.id, s.agent_name, s.summary, s.created_at
FROM sessions s
JOIN search_index si ON s.id = si.session_id
WHERE search_index MATCH '<topic>'
ORDER BY s.created_at DESC
LIMIT 10
```

Also search by file path:
```sql
SELECT sf.file_path, sf.session_id, s.summary, s.created_at
FROM session_files sf
JOIN sessions s ON sf.session_id = s.id
WHERE sf.file_path LIKE '%<topic>%'
ORDER BY s.created_at DESC
LIMIT 10
```

---

## Data Availability Note

The session store captures:
- Session metadata (agent name, timestamps, cwd, branch, summary)
- Files edited per session
- Turn-level refs and checkpoints (when available)

If queries return empty results, the index may be stale. Run:
```
action: reindex
```
Then retry.
