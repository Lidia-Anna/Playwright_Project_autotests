export const parsePrice = (text: string): number => {
      const cleaned = text.replace(/\s/g, '').replace(/[^\d,.-]/g, '').replace(',', '.');
      const n = Number(cleaned.match(/-?\d+(\.\d+)?/)?.[0] ?? NaN);
      if (Number.isNaN(n)) throw new Error(`Cannot parse price from "${text}"`);
      return n;
    };