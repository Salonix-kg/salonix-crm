import {ProfileSchema} from '@features/Team/MemberDrawer/Profile';

import {Member} from '@atoms/team/members';

import {dateFormat} from '@utils/date';
import {IDGenerator} from '@utils/IDGenerator.ts';
import {readFileAsDataURL} from '@utils/readFileDataAsURL.ts';

export const formToMember = async (
  data: ProfileSchema,
  servicesId: number[],
) => {
  const {
    fullName,
    phoneNumber,
    email,
    birthDate,
    position,
    commission,
    experience,
    avatar,
  } = data;

  const avatarString = avatar ? await readFileAsDataURL(avatar) : null;

  const newMember: Member = {
    id: IDGenerator(),
    fullName,
    email,
    position,
    commission,
    experience,
    servicesId,
    avatar: avatarString,
    phoneNumber: '+996' + phoneNumber.replace(/\s+/g, ''),
    birthDate: birthDate?.format(dateFormat) || null,
  };

  return newMember;
};
