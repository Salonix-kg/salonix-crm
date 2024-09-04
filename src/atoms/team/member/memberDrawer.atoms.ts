import {atom} from 'jotai';

export type MemberSection = 'profile' | 'services';

export const isMemberDrawerOpenAtom = atom(false);

export const memberActiveSectionAtom = atom<MemberSection>('profile');
