import {Suspense} from 'react';
import {useAtomValue} from 'jotai';

import {Button} from '@components/Button';

import {selectedMemberAtom} from '@atoms/team/member';

import {theme} from '@styles/theme.ts';

export type FooterProps = {
  onSave: () => void;
};

export const Footer = ({onSave}: FooterProps) => {
  const selectedMember = useAtomValue(selectedMemberAtom);

  return (
    <Suspense>
      <Button
        onClick={onSave}
        block
        bg={theme.black}
        size="large"
        type="primary">
        {selectedMember ? 'Сохрнанить' : 'Добавить'}
      </Button>
    </Suspense>
  );
};
