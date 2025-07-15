import WebFont from 'webfontloader';

export const loadFont = (family: string, variants: string[] = ['regular']): Promise<void> => {
  return new Promise((resolve, reject) => {
    WebFont.load({
      google: {
        families: variants.length ? [`${family}:${variants.join(',')}`] : [family],
      },
      active() {
        resolve();
      },
      inactive() {
        reject(new Error('Failed to load font'));
      },
    });
  });
};
