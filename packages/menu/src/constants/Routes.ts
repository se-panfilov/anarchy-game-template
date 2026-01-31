import Audio from '@Menu/views/Audio.vue';
import Graphics from '@Menu/views/Graphics.vue';
import Home from '@Menu/views/Home.vue';
import Legal from '@Menu/views/Legal.vue';
import Localization from '@Menu/views/Localization.vue';
import Settings from '@Menu/views/Settings.vue';

export enum Routes {
  Home = '/',
  Audio = '/audio',
  Graphics = '/graphics',
  Legal = '/legal',
  Localization = '/localization',
  Settings = '/settings'
}

export const menuRouteMap: Record<Routes, any> = {
  [Routes.Home]: Home,
  [Routes.Audio]: Audio,
  [Routes.Graphics]: Graphics,
  [Routes.Localization]: Localization,
  [Routes.Legal]: Legal,
  [Routes.Settings]: Settings
};
