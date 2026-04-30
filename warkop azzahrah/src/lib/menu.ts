import { MenuFilter, MenuItem, MenuType } from '../types/menu';

interface FilterMenuItemsOptions {
  items: readonly MenuItem[];
  searchQuery: string;
  type: MenuFilter | MenuType;
  includeDescription?: boolean;
}

export const filterMenuItems = ({
  items,
  searchQuery,
  type,
  includeDescription = false,
}: FilterMenuItemsOptions) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesType = type === 'all' ? true : item.type === type;

    if (!matchesType) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = includeDescription
      ? `${item.name} ${item.description}`.toLowerCase()
      : item.name.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
};
