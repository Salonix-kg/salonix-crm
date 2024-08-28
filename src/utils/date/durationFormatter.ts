export const durationFormatter = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours ? hours + 'ч' : ''} ${mins ? mins + 'м' : ''}`;
};
