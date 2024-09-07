import React from 'react';
import classNames from 'classnames';
import parse from 'html-react-parser';

import {Typography} from 'antd';

import styles from './HelperText.module.scss';

type PropsWithChildren = {
  className?: string;
  children: React.ReactNode;
  highlightedTexts?: string[];
};

export const HelperText = ({
  className,

  children,
  highlightedTexts = [],
}: PropsWithChildren) => {
  const highlightText = (text: string) => {
    if (!highlightedTexts.length) return text;

    let highlightedText = text;
    highlightedTexts.forEach(highlight => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<span class="highlight">$1</span>',
      );
    });

    return highlightedText;
  };

  const highlightedHtml = highlightText(String(children));

  return (
    <Typography.Text className={classNames(styles.text, className)}>
      {parse(highlightedHtml)}
    </Typography.Text>
  );
};
