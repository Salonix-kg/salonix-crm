import {atom} from 'jotai';

import {categoryServicesAtom, Service} from '@atoms/services';

export type ChangeMemberCategoryHandlerData = {
  categoryId: number;
  checked: boolean;
};

export const memberServicesAtom = atom<Service[]>([]);

export const changeMemberServiceHandlerAtom = atom(
  null,
  (get, set, service: Service) => {
    const servicesId = get(memberServicesAtom);

    const isExist = servicesId.find(({id}) => id === service.id);

    if (isExist) {
      set(memberServicesAtom, prev => prev.filter(({id}) => id !== service.id));

      return;
    }

    set(memberServicesAtom, prev => [...prev, service]);
  },
);

export const memberServicesIdAtom = atom<number[]>(get =>
  get(memberServicesAtom).map(service => service.id),
);

export const changeMemberCategoryHandlerAtom = atom(
  null,
  (get, set, data: ChangeMemberCategoryHandlerData) => {
    const services = get(categoryServicesAtom);
    const memberServices = get(memberServicesAtom);

    if (data.checked) {
      const categoryServices = services.find(
        ({category}) => category.id === data.categoryId,
      )!.services;

      const newServices = categoryServices.reduce((acc, curr) => {
        const isExist = memberServices.find(service => service.id === curr.id);

        if (!isExist) {
          acc.push(curr);
        }

        return acc;
      }, [] as Service[]);

      set(memberServicesAtom, prev => [...prev, ...newServices]);

      return;
    }

    set(memberServicesAtom, prev =>
      prev.filter(service => service.category.id !== data.categoryId),
    );
  },
);
