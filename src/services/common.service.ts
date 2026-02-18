/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-02-18 10:44:33
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-18 10:46:23
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../single-spa/single-spa-props';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public readonly states: Array<GlobalState> = [];
}
