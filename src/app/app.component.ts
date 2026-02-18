/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-18 11:08:52
 */
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService } from '../services/common.service';
import {
  GlobalState,
  SingleSpaProps,
  singleSpaPropsSubject,
} from '../single-spa/single-spa-props';

@Component({
  selector: 'micro-angular',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
  imports: [RouterOutlet],
  providers: [DatePipe],
})
export class AppComponent implements OnDestroy {
  private readonly __destroy$ = new Subject<void>();

  private __props!: SingleSpaProps;

  constructor(
    public readonly common: CommonService,
    private readonly __cdr: ChangeDetectorRef,
    private readonly __date: DatePipe,
  ) {
    singleSpaPropsSubject
      .pipe(takeUntil(this.__destroy$))
      .subscribe((props: SingleSpaProps) => {
        this.__props = props;
        this.__initGlobalStateChange();
      });
  }

  ngOnDestroy(): void {
    this.__destroy$.next();
    this.__destroy$.complete();
  }

  /** 发送数据到微前端 */
  public sendData(): void {
    const state: GlobalState = {
      from: 'angular',
      timeStr: this.__getTimeStr(),
      data: 'Hello from angular - ' + Math.random().toString(16).slice(2, 6),
    };

    this.__props.setGlobalState(state);
  }

  /** 监听微前端状态变化 */
  private __initGlobalStateChange(): void {
    this.__props.onGlobalStateChange((state: Record<string, any>) => {
      this.common.states.unshift(state as GlobalState);
      this.__cdr.detectChanges();
    });
  }

  /** 获取时间字符串 */
  private __getTimeStr(): string {
    return this.__date.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') ?? '';
  }
}
