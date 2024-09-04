import {SortedServices} from '@atoms/calendar/order';
import {Service} from '@atoms/services';

export const sortServicesByCategory = <T extends Service>(
  services: T[],
): SortedServices<T>[] => {
  const groupedServices: {[key: string]: SortedServices<T>} = {};

  services.forEach(service => {
    const categoryKey = service.category.id;

    if (!groupedServices[categoryKey]) {
      groupedServices[categoryKey] = {
        category: service.category,
        services: [],
      };
    }

    groupedServices[categoryKey].services.push(service);
  });

  return Object.values(groupedServices);
};
