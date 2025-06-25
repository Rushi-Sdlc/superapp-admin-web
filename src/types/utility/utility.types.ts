export interface UseFilteredSearchOptions<T> {
  data: T[];
  searchTerm: string;
  startDate?: string;
  endDate?: string;
  searchableFields?: (keyof T)[];
  dateField?: keyof T;
  debounceDelay?: number;
}
