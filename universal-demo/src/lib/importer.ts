// Minimal importer utilities for normalizing spreadsheet rows into our product model

export type RawRow = Record<string, any>;

export function normalizeHeader(h: string) {
  return h.trim().toLowerCase().replace(/\s+/g, '_');
}

// Canonical column list we expect (user can map variants)
export const canonicalColumns = [
  'style_name',
  'product_code',
  'size',
  'sku',
  'upc',
  'collection',
  'artist_name'
];

// Regions that we will look for when mapping price/quantity columns
export const REGION_PREFIXES = ['US', 'UK', 'EU', 'DE', 'FR', 'IT'];

export function parseAndNormalize(rows: RawRow[]) {
  // For MVP: normalize headers to snake_case and return array of normalized rows
  return rows.map((r) => {
    const out: Record<string, any> = {};
    Object.keys(r).forEach((k) => {
      const nk = normalizeHeader(k);
      out[nk] = r[k];
    });

    // Try to coerce numeric values for price/quantity fields
    Object.keys(out).forEach((k) => {
      if (/price|quant|quantity|qty|value|cost/i.test(k) && out[k] !== '') {
        const n = Number(String(out[k]).replace(/[^0-9.-]+/g, ''));
        if (!Number.isNaN(n)) out[k] = n;
      }
    });

    return out;
  });
}

export default { parseAndNormalize };
