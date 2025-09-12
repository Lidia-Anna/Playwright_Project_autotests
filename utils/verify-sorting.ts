import { expect, Locator } from '@playwright/test';

export async function expectSortedNames(
  locator: Locator,
  direction: 'asc' | 'desc' = 'asc'
) {
  await expect(async () => {
    const names = (await locator.allTextContents())
      .map(s => s.trim())
      .filter(Boolean);

    expect(names.length).toBeGreaterThan(1);

    let expected = [...names].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );
    if (direction === 'desc') expected = expected.reverse();

    expect(names).toEqual(expected);
  }).toPass();
}