// PostgREST caps every select at 1000 rows, so a large read must be paged.
// Each page query must ORDER BY a unique key: without it Postgres may return
// rows in a different order per query, so pages overlap or skip rows. A failed
// page throws; returning the rows read so far would pass short data off as real.
export async function fetchAllPages<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  pageSize = 1000,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await page(from, from + pageSize - 1);
    if (error) throw new Error(`Paged fetch failed: ${error.message}`);
    rows.push(...(data ?? []));
    if (!data || data.length < pageSize) return rows;
  }
}
