/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-17 09:59:05
 */
import { Routes } from '@angular/router';

export enum RoutePath {
  Home = 'angular-home',
  Detail = 'angular-detail',
}

export const routes: Routes = [
  {
    path: RoutePath.Home,
    loadComponent: () =>
      import('../pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: RoutePath.Detail,
    loadComponent: () =>
      import('../pages/detail/detail.component').then((m) => m.DetailComponent),
  },
];
