import {toast} from 'react-toastify';
import {atom} from 'jotai';

import {ProfileSchema} from '@features/Team/MemberDrawer/Profile';

import {selectedMemberAtom} from '@atoms/team/member/member.atoms.ts';
import {memberServicesIdAtom} from '@atoms/team/member/services.atoms.ts';
import {membersAtom} from '@atoms/team/members';

import {formToMember} from '@utils/member';

export const editMemberAtom = atom(
  null,
  async (get, set, data: ProfileSchema) => {
    const servicesId = get(memberServicesIdAtom);
    const selectedMember = get(selectedMemberAtom);

    const newMember = await formToMember(data, servicesId);

    set(membersAtom, prev =>
      prev.map(member => {
        if (member.id === selectedMember?.id) {
          return {...newMember, id: selectedMember.id};
        }

        return member;
      }),
    );
    toast.success('Мастер успешно отредактирован');
  },
);
