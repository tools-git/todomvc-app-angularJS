(function (window) {
	'use strict';

	// 创建angularjs模块
	angular
	.module("todoApp",[])
	.controller("TodoController",["$scope",TodoController])
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
		// id是唯一标识

		vm.todoList=todoList;

		// 2 添加任务
		vm.add=function(){
			var taskName=vm.taskName;
			if(taskName.trim() === ''){
				return;
			}
			var id,
				length=todoList.length;
			
			if(length===0){
				id=1;
			}else{
				id=todoList[todoList.length - 1].id + 1;
			}
			todoList.push({id:id,name:taskName,isCompleted:false});
			vm.taskName="";
		}

		// 3 删除任务
		vm.del=function(id){
			for(var i=0;i<todoList.length;i++){
				if(todoList[i].id===id){
					todoList.splice(i,1);
					break;
				}
			}
		}

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
		}

		// 5 切换任务选中状态(单个或批量)
		// 单个选中：通过双向数据绑定来实现的（ng-model）
		vm.isCheckedAll=false;
		vm.checkAll=function(){
			for(var i=0;i<todoList.length;i++){
				todoList[i].isCompleted = vm.isCheckedAll;
			}
		}
		// 判断是不是全选
		vm.isAll=function(){
			var flag=0;
			for(var i=0;i<todoList.length;i++){
				if(todoList[i].isCompleted===true){
					flag++;
				}
			}
			if(flag===todoList.length){
				vm.isCheckedAll=true;
				vm.checkAll();
			}else{
				vm.isCheckedAll=false;
			}
		}

		// 6 清除已完成的任务
		vm.delCompleted=function(){
			var todoArr=[];
			for(var i=0;i<todoList.length;i++){
				// 删除已完成的，保存未完成的
				if(!todoList[i].isCompleted)
					todoArr.push(todoList[i]);
			}

			// 清空数据数组
			todoList.length=0;
			[].push.apply(todoList,todoArr);
		}


	}

})(window);
