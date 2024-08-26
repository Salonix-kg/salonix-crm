export type MasterCol = {
  left: number;
  right: number;
  width: number;
  id: string | null;
  x: number;
};

export const getMastersCol = () => {
  const mastersCol: MasterCol[] = [];

  const mastersColElements = document.querySelectorAll('.fc-timegrid-col');

  mastersColElements.forEach(masterColEl => {
    const rect = masterColEl.getBoundingClientRect();

    const masterColData = {
      left: rect.left,
      right: rect.right,
      width: rect.width,
      x: rect.x,
      id: masterColEl.getAttribute('data-resource-id'),
    };

    mastersCol.push(masterColData);
  });

  return mastersCol;
};

export const getMasterCol = (clientX: number, mastersCol: MasterCol[]) => {
  const currentMasterCol = mastersCol.find(
    day => day.left < clientX && day.right > clientX,
  );

  return currentMasterCol;
};
