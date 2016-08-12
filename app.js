'use strict';
var a = Zone.current.fork({
  name: 'a1',
  properties: {},

  // onFork，拦截 zone 的复制
  // onIntercept，拦截回调函数的包装
  // onInvoke，拦截回调函数的调用
  // onHandleError，拦截错误处理
  // onScheduleTask，拦截任务调度
  // onInvokeTask，拦截任务执行
  // onCancelTask，拦截任务取消
  // onHasTask，任务队列状态变化通知

  // onFork: function () { console.log('onFork'); },
  // onIntercept: function () { console.log('onIntercept'); },
  onInvoke: function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
    console.log('onInvoke');
    parentZoneDelegate.invoke(targetZone, delegate);
  },
  // onHandleError: function () { console.log('onHandleError'); },
  onScheduleTask: function (parentZoneDelegate, currentZone, targetZone, task) {
    console.log('onScheduleTask');
    parentZoneDelegate.scheduleTask(targetZone, task);
  },
  onInvokeTask: function (parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
    console.log('onInvokeTask');
    parentZoneDelegate.invokeTask(targetZone, task);
  },
  onCancelTask: function (parentZoneDelegate, currentZone, targetZone, task) {
    console.log('onCancelTask');
    parentZoneDelegate.scheduleTask(targetZone, task);
  },
  onHasTask: function (params) {
    console.log('onHasTask');
  },
});

/**
 * 下面这些情况会被 Angular2 判断为有状态发生了改变：
 *   . 用户行为
 *   . http 返回
 *   . 定时器，setTimeout,setInterval
 * Zone 为这些事件都添加了钩子，用来通知 Angular 再完美不过了。
 */

a.run(function () {
  console.log('000');
  setTimeout(function () {
    console.log('111');
    setTimeout(function () {
      console.log('222');
    }, 500);
  }, 500);
});