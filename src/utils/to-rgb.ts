export const toRGB = (hex: string): number[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return hex.match(/[^#]./g).map(ff => parseInt(ff, 16));
};
