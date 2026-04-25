figma.showUI(__html__, { width: 440, height: 360, title: 'Import Design Tokens' });

figma.ui.onmessage = (msg) => {
  if (msg.type !== 'IMPORT') return;

  if (!figma.variables) {
    figma.ui.postMessage({ type: 'ERROR', message: 'figma.variables is unavailable. Requires a paid Figma plan and the desktop app.' });
    return;
  }

  try {
    const { groups } = msg; // { collectionName: [{ modeName, flat }] }

    // ── Pass 1: create all collections, modes, and empty variables ────────
    const globalVarMap = {}; // tokenPath → Variable (for alias resolution)
    const collMeta = {};     // collectionName → { modeIds, modes }

    for (const [collName, modes] of Object.entries(groups)) {
      const collection = figma.variables.createVariableCollection(collName);

      // Set up modes
      const modeIds = {};
      const firstName = modes[0].modeName || 'Value';
      collection.renameMode(collection.modes[0].modeId, firstName);
      modeIds[firstName] = collection.modes[0].modeId;

      for (let i = 1; i < modes.length; i++) {
        const name = modes[i].modeName || `Mode ${i + 1}`;
        try {
          modeIds[name] = collection.addMode(name);
        } catch (_) {
          // plan limit — skip extra modes
        }
      }

      // Collect all unique token paths across all modes
      const allPaths = new Set(modes.flatMap(m => Object.keys(m.flat)));

      for (const path of allPaths) {
        const token = modes.map(m => m.flat[path]).find(Boolean);
        const resolvedType = toFigmaType(token.type);
        const v = figma.variables.createVariable(path, collection, resolvedType);
        if (token.description) v.description = token.description;
        if (token.codeSyntax && token.codeSyntax.web) {
          try { v.setVariableCodeSyntax('WEB', token.codeSyntax.web); } catch (_) {}
        }
        if (token.scopes && token.scopes.length) {
          try { v.scopes = token.scopes; } catch (_) {}
        }
        globalVarMap[path] = v;
      }

      collMeta[collName] = { modeIds, modes };
    }

    // ── Pass 2: set all values (aliases resolve now that all vars exist) ──
    let totalVars = 0;

    for (const [, { modeIds, modes }] of Object.entries(collMeta)) {
      for (const { modeName, flat } of modes) {
        const modeId = modeIds[modeName || 'Value'];
        if (!modeId) continue;

        for (const [path, token] of Object.entries(flat)) {
          const v = globalVarMap[path];
          if (!v) continue;
          v.setValueForMode(modeId, resolveValue(token, globalVarMap));
          totalVars++;
        }
      }
    }

    figma.ui.postMessage({
      type: 'DONE',
      stats: {
        collections: Object.keys(groups).length,
        variables: Object.keys(globalVarMap).length,
      },
    });

  } catch (err) {
    figma.ui.postMessage({ type: 'ERROR', message: err.message });
  }
};

function resolveValue(token, globalVarMap) {
  if (token.aliasKey && globalVarMap[token.aliasKey]) {
    return { type: 'VARIABLE_ALIAS', id: globalVarMap[token.aliasKey].id };
  }
  const val = token.value;
  switch (toFigmaType(token.type)) {
    case 'COLOR':   return hexToRgba(String(val));
    case 'FLOAT':   return Number(val);
    case 'BOOLEAN': return val === true || val === 'true';
    default:        return String(val);
  }
}

function toFigmaType(type) {
  switch (type) {
    case 'color':                          return 'COLOR';
    case 'number': case 'dimension':
    case 'fontSize': case 'lineHeight':
    case 'fontWeight': case 'opacity':     return 'FLOAT';
    case 'boolean':                        return 'BOOLEAN';
    default:                               return 'STRING';
  }
}

function hexToRgba(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  };
}
