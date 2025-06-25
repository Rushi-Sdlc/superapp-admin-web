import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import type { UseFilteredSearchOptions } from '../types/utility/utility.types';

export const useFilteredSearch = <T>({
  data,
  searchTerm,
  startDate,
  endDate,
  searchableFields,
  dateField,
  debounceDelay = 500,
}: UseFilteredSearchOptions<T>) => {
  const [debouncedSearch] = useDebounce(searchTerm, debounceDelay);

  const filteredData = useMemo(() => {
    const search = debouncedSearch.toLowerCase();

    return data.filter((item) => {
      const matchesSearch =
        !search ||
        Object.entries(item as Record<string, unknown>).some(([key, value]) => {
          if (searchableFields && !searchableFields.includes(key as keyof T)) {
            return false;
          }
          return String(value ?? '')
            .toLowerCase()
            .includes(search);
        });

      const effectiveDateField = dateField ?? ('createdAt' as keyof T);
      const rawDateValue = item[effectiveDateField];

      const itemDate =
        rawDateValue !== undefined && rawDateValue !== null
          ? new Date(rawDateValue as string | number | Date).getTime()
          : null;

      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() + 86400000 - 1 : null;

      const matchesDateRange =
        (!start || (itemDate && itemDate >= start)) &&
        (!end || (itemDate && itemDate <= end));

      return matchesSearch && matchesDateRange;
    });
  }, [data, debouncedSearch, startDate, endDate, searchableFields, dateField]);

  return filteredData;
};
