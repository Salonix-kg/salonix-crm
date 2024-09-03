import {atom} from 'jotai';

import {categoriesAtom,Category} from './categories.atoms';

export const setCategoryAtom = atom(null, (_, set, category: Category) => {
  set(categoriesAtom, prev => {
    const existingIndex = prev.findIndex(cat => cat.key === category.key);

    if (existingIndex !== -1) {
      // Если категория с таким key уже существует, перезаписываем её
      const updatedCategories = [...prev];
      updatedCategories[existingIndex] = category;
      return updatedCategories;
    } else {
      // Если категория с таким key не существует, добавляем новую
      return [...prev, category];
    }
  });
});
