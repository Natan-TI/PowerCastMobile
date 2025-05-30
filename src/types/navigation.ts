import { Event } from './index';  

export type RootStackParamList = {
  Panorama: undefined;
  Locations: undefined;
  Duration: { event: Event };         
  Damages:   { event: Event };
  Recommendations: { event: Event };
};
