export const getRowKeys = <T extends Record<string, unknown>>(row: T): string[] => Object.keys(row);

export function filterData<T extends Array<Record<string, unknown>>>(data: T, search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item) => {
    const keys = getRowKeys(item);

    keys.map((key) => {
      return String(item[key]).toLowerCase().includes(query);
    });
  });
}

// export function sortData(
//   data: RowData[],
//   payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
// ) {
//   const { sortBy } = payload;

//   if (!sortBy) {
//     return filterData(data, payload.search);
//   }

//   return filterData(
//     [...data].sort((a, b) => {
//       if (payload.reversed) {
//         return b[sortBy].localeCompare(a[sortBy]);
//       }

//       return a[sortBy].localeCompare(b[sortBy]);
//     }),
//     payload.search
//   );
// }
