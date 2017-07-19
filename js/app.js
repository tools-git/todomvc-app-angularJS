(function (angular) {
	'use strict';

	// 创建angularjs模块
	angular
	// 关联控制模块和服务模块
	.module('todoApp', ['todoApp.ctrl', 'todoApp.service'])
	// 自定义指令-获取焦点事件
	.directive('todoFocus', function todoFocus($timeout) {
	    return function (scope, elem, attrs) {
	        // 为todoFocus属性的值添加监听
	        scope.$watch(attrs.todoFocus, function (newVal) {
	            if (newVal) {
	                $timeout(function () {
	                    elem[0].focus();
	                }, 0, false);
	            }
	        });
	    };
	});

})(angular);
