/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-01-25 18:44:20
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-18 11:08:52
 */
import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {
  /** 微前端全局状态 */
  public readonly globalStates = signal<GlobalState[]>([]);

  private readonly __destroy$ = new Subject<void>();

  private __props!: SingleSpaProps;

  constructor(
    private readonly __date: DatePipe,
    private readonly __cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
    // setGlobalState 是 Object.assign 方式，订阅者会拿到合并后的全局状态
    const state: GlobalState = {
      from: 'angular',
      timeStr: this.__getTimeStr(),
      data: 'Hello from angular - ' + Math.random().toString(16).slice(2, 6),
    };

    this.__props.setGlobalState(state);
  }

  /**
   * 监听微前端状态变化
   *
   * 第二个参数 fireImmediately 为 true，表示立即执行一次回调，获取初始状态
   */
  private __initGlobalStateChange(): void {
    this.__props.onGlobalStateChange((state: Record<string, any>) => {
      const states = [state as GlobalState, ...this.globalStates()];
      this.globalStates.set(states);

      this.__cdr.detectChanges();
    }, true);
  }

  /** 获取时间字符串 */
  private __getTimeStr(): string {
    return this.__date.transform(new Date(), 'yyyy-MM-dd HH:mm:ss') ?? '';
  }
}
