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
		}
		vm.editSave=function(){
			vm.editingId=-1
		}

		
	}

})(window);
