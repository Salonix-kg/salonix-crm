import {toast} from 'react-toastify';
import {atom} from 'jotai';

import {ProfileSchema} from '@features/Team/MembersTable/MemberDrawer/Profile';

import {membersAtom} from '@atoms/team/members';

import {formToMember} from '@utils/member';

import {memberServicesAtom, memberServicesIdAtom} from './services.atoms';

export const addMemberAtom = atom(
  null,
  async (get, set, data: ProfileSchema) => {
    const servicesId = get(memberServicesIdAtom);

    const newMember = await formToMember(data, servicesId);

    set(membersAtom, prev => [...prev, newMember]);
    toast.success('Мастер успешно добавлен');
    set(memberServicesAtom, []);
  },
);
