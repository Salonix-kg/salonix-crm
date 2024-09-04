import {atom} from 'jotai';

import {servicesAtom} from '@atoms/services';
import {store} from '@atoms/store.ts';
import {Member} from '@atoms/team/members';

import {memberToProfileForm} from '@utils/member';

import {memberServicesAtom} from './services.atoms.ts';

export const selectedMemberAtom = atom<null | Member>(null);

export const selectedMemberFormAtom = atom(async get => {
  const member = get(selectedMemberAtom);

  return member ? await memberToProfileForm(member) : null;
});

store.sub(selectedMemberAtom, () => {
  const selectedMember = store.get(selectedMemberAtom);
  const services = store.get(servicesAtom);

  const memberServices = services.filter(service =>
    selectedMember?.servicesId.includes(service.id),
  );

  if (selectedMember) {
    store.set(memberServicesAtom, memberServices);
  }
});
