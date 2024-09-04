import {generatePath} from 'react-router-dom';

export enum ROUTE_PATHS {
  HOME = '/',
  LOGIN = '/login',
  WORK_CALENDAR = '/calendar',
  PROFILE = '/profile',
  MENU_SERVICE = '/menu-service',
  TEAM = '/team',
}

export type RouteParamsType = object;

export type TRouteProp<RouteName extends keyof RouteParamsType> =
  RouteParamsType[RouteName];

export const ROUTE_URLS: Record<
  keyof typeof ROUTE_PATHS,
  (...params: string[]) => string
> = {
  HOME: () => generatePath(ROUTE_PATHS.HOME),
  LOGIN: () => generatePath(ROUTE_PATHS.LOGIN),
  WORK_CALENDAR: () => generatePath(ROUTE_PATHS.WORK_CALENDAR),
  MENU_SERVICE: () => generatePath(ROUTE_PATHS.MENU_SERVICE),
  PROFILE: () => generatePath(ROUTE_PATHS.PROFILE),
  TEAM: () => generatePath(ROUTE_PATHS.TEAM),
};
