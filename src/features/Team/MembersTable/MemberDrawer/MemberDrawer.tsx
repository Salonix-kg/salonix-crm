import {Suspense, useCallback, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {Badge, Drawer, Segmented} from 'antd';
import {SegmentedOptions} from 'antd/es/segmented';

import {
  addMemberAtom,
  editMemberAtom,
  isMemberDrawerOpenAtom,
  memberActiveSectionAtom,
  MemberSection,
  memberServicesAtom,
  memberServicesIdAtom,
  selectedMemberAtom,
} from '@atoms/team/member';

import {theme} from '@styles/theme.ts';

import {Footer} from './Footer';
import {Profile, ProfileSchema, profileSchema} from './Profile';
import {Services} from './Services';

import styles from './MemberDrawer.module.scss';

export const MemberDrawer = () => {
  const [isOpen, setIsOpen] = useAtom(isMemberDrawerOpenAtom);
  const [activeSection, setActiveSection] = useAtom(memberActiveSectionAtom);
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const memberServicesId = useAtomValue(memberServicesIdAtom);

  const addMember = useSetAtom(addMemberAtom);
  const editMember = useSetAtom(editMemberAtom);
  const setMemberServices = useSetAtom(memberServicesAtom);

  const profileForm = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedMember(null);
      setMemberServices([]);
      profileForm.reset({});
      setActiveSection('profile');
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSave = useCallback(
    async (data: ProfileSchema) => {
      if (!memberServicesId.length) {
        toast.info('Выберите услуги которые этот мастер предоставляет');
        setActiveSection('services');
        return;
      }

      if (selectedMember?.id) await editMember(data);
      else await addMember(data);

      handleClose();
    },
    [
      addMember,
      editMember,
      handleClose,
      memberServicesId.length,
      selectedMember,
      setActiveSection,
    ],
  );

  const sections: SegmentedOptions<MemberSection> = useMemo(
    () => [
      {label: 'Профиль', value: 'profile'},
      {
        label: (
          <Badge
            offset={[8, 0]}
            color={theme['primary-color']}
            count={memberServicesId.length}>
            Услуги
          </Badge>
        ),
        value: 'services',
      },
    ],
    [memberServicesId.length],
  );

  const sectionsContent = useMemo(
    () => ({
      profile: <Profile form={profileForm} />,
      services: <Services />,
    }),
    [profileForm],
  );

  return (
    <Drawer
      title={selectedMember ? 'Редактировать' : 'Добавить участника команды'}
      width={600}
      open={isOpen}
      classNames={{body: styles.body}}
      footer={<Footer onSave={profileForm.handleSubmit(handleSave)} />}
      onClose={handleClose}>
      <div className={styles.header}>
        <Segmented
          value={activeSection}
          block
          options={sections}
          onChange={setActiveSection}
        />
      </div>
      <Suspense>
        <div className={styles.content}>{sectionsContent[activeSection]}</div>
      </Suspense>
    </Drawer>
  );
};
