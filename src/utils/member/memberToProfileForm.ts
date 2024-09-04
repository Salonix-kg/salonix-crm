import dayjs from 'dayjs';

import {ProfileSchema} from '@features/Team/MemberDrawer/Profile';

import {Member} from '@atoms/team/members';

import {dateFormat} from '@utils/date';

export const memberToProfileForm = async (
  member: Member,
): Promise<ProfileSchema> => {
  const {
    fullName,
    avatar,
    birthDate,
    commission,
    email,
    experience,
    position,
    phoneNumber,
  } = member;

  return {
    fullName,
    commission,
    email,
    experience,
    position,
    avatar,
    birthDate: dayjs(birthDate, dateFormat),
    phoneNumber: phoneNumber.replace('+996', ''),
  };
};
