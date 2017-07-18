(function (window) {
	'use strict';

	// 创建angularjs模块
	angular
	.module("todoApp",[])
	.controller("TodoController",["$scope",TodoController]);

	function TodoController($scope){
		// vm ---> viewmodel 视图模型
		var vm = $scope;

		// 1 展示任务列表
		// 定义数据
		var todoList=[
			{id:1,name:"刘备",isCompleted:false},
			{id:2,name:"关羽",isCompleted:false},
			{id:3,name:"张飞",isCompleted:true},
			{id:4,name:"赵云",isCompleted:false}
		];

		vm.todoList=todoList;

		

	}

})(window);
