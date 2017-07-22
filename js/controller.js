(function (angular) {
  	'use strict';

  	// 控制器模块
  	angular
	.module('todoApp.ctrl',[])
	.controller("TodoController",["$scope",'$location','$routeParams','TodoSrv',TodoController]);
	// 控制器中应该值保留简单的业务逻辑处理

	// 因为现在这个控制器中，即包含了业务处理，也包含了数据操作
	// 为了代码结构更加合理，现在需要将 数据操作封装到一个 数据服务 中
	// 控制器将来只需要调用 数据服务 中操作数据的方法，具体的数据操作交给 数据服务 来完成

	function TodoController($scope, $location,
		$routeParams,TodoSrv){
		// vm ---> viewmodel 视图模型
		var vm = $scope;

		// 1 展示任务列表
		// 定义数据
		var todoList=TodoSrv.getData();
		// id是唯一标识

		vm.todoList=todoList;

		// 2 添加任务
		vm.taskName="";
		vm.add=function(){
			if(vm.taskName.trim() === ''){
				return;
			}
			TodoSrv.add(vm.taskName);
			vm.taskName="";
		}

		// 3 删除任务
		vm.del=TodoSrv.del;

		// 4 修改任务
		// 思路：双击任务元素，给当前项添加 editing 类
		vm.editingId=-1
		vm.edit=function(id){
			vm.editingId=id;
			// var Oedit=document.getElementById("sui_"+id);
			// console.log(Oedit);
			// Oedit.focus();
		}
		vm.editSave=function(){
			vm.editingId=-1
			TodoSrv.save();
		}

		// 5 切换任务选中状态(单个或批量)
		// 单个选中：通过双向数据绑定来实现的（ng-model）
		vm.isCheckedAll=false;
		vm.checkAll=function(){
			vm.isCheckedAll=!vm.isCheckedAll;
			TodoSrv.checkAll(vm.isCheckedAll);
		}
		// 判断是不是全选
		vm.isAll=function(){
			vm.isCheckedAll=TodoSrv.isAll(vm.isCheckedAll).isCheckedAll;
			return TodoSrv.isAll(vm.isCheckedAll).flag;
		}

		// 6 清除已完成的任务
		vm.delCompleted=TodoSrv.delCompleted;

		// 6.1 控制清除任务按钮的展示和隐藏
		// 当任务全都未完成时按钮隐藏
		vm.isShow=function(){
			return TodoSrv.isShow();
		}

		// 7 显示未完成任务数
		// 遍历数据未完成的个数

		// 8 显示不同状态的任务 以及当前任务高亮处理
		// 9 根据URL变化显示相应任务

		// vm.location=$location;
		// // 监听url的变化
		// vm.$watch('location.url()',function(newVal,oldVal){
		// 	switch(newVal){
		// 		case '/active':
		// 			vm.status = false;
		// 			break;
		// 		case '/completed':
		// 			vm.status = true;
		// 			break;
		// 		default:
		// 			vm.status = undefined;
		// 			break;
		// 	}
		// })

		// 路由执行过程：
		// 1 用户单击active这个a链接，改变URL中的锚点值
		// 2 锚点值发生改变以后，angular能够感知到这个变化（angular会监视锚点值的变化）
		// 3 此时，路由机制就会根据当前的锚点值，重新匹配路由规则
		// 4 当某个路由规则匹配以后，angular会把这个规则对应的视图内容通过templateUrl的ajax请求获取到并且展示到页面中（ng-view）
		// 5 这个规则对应的控制器中的代码也会被执行

		vm.status=undefined;
		var status=$routeParams.status;
		switch(status){
			case 'active':
				vm.status=false;
				break;
			case 'completed':
				vm.status=true;
				break;
			default:
				vm.status=undefined;
				break;
		}
	}
})(angular)