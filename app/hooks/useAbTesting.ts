export enum Versions {
  V1 = 'Scroll',
  V2 = 'Accordion',
  NonCgg = 'nonGgg',
}

const GCC_COUNTRIES = ['AE', 'BH', 'KW', 'OM', 'QA', 'SA'];

export const useABVersion = (detectedCountry: string) => {
  let abVersion: Versions = Versions.NonCgg;
  if (GCC_COUNTRIES.includes(detectedCountry)) {
    abVersion = Math.random() > 0.5 ? Versions.V1 : Versions.V2; // todo: use A/B testing backend.
  }
  console.log(detectedCountry);
  return abVersion;
};
