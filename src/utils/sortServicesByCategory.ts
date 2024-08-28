import {SortedServices} from '@atoms/calendar/order';
import {Service} from '@atoms/calendar/services';

export const sortServicesByCategory = (
  services: Service[],
): SortedServices[] => {
  const groupedServices: {[key: string]: SortedServices} = {};

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
