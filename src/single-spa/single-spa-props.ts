/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-02-17 08:52:03
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-18 10:24:29
 */
import { ReplaySubject } from 'rxjs';
import { AppProps } from 'single-spa';

export const singleSpaPropsSubject = new ReplaySubject<SingleSpaProps>(1);
export type OnGlobalStateChangeCallback = (
  state: Record<string, any>,
  prevState: Record<string, any>,
) => void;

// Add any custom single-spa props you have to this type def
// https://single-spa.js.org/docs/building-applications.html#custom-props
export type SingleSpaProps = AppProps & {
  onGlobalStateChange: (
    callback: OnGlobalStateChangeCallback,
    fireImmediately?: boolean,
  ) => void;
  setGlobalState: (state: Record<string, any>) => boolean;
};

/** 全局状态 */
export interface GlobalState {
  /** 状态来源 */
  from: 'main' | 'angular';
  /** 状态更新时间 */
  timeStr: string;
  /** 传递的数据 */
  data: any;
}
