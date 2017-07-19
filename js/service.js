(function (angular) {
	'use strict';

	// 将数据操作放到 服务模块 中
	angular
    .module('todoApp.service', [])
    .service('TodoSrv', ['$window', function ($window) {
		// var todoList=[
		// 		{id:1,name:"刘备",isCompleted:false},
		// 		{id:2,name:"关羽",isCompleted:false},
		// 		{id:3,name:"张飞",isCompleted:true},
		// 		{id:4,name:"赵云",isCompleted:false}
		// 	];

		var that=this;
		// 从 localStorage 中获取数据
		var localStorage=$window.localStorage;
		var todoList = JSON.parse(localStorage.getItem('todo')) || [];
		// 保存数据到localStorage
		that.save=function(){
			localStorage.setItem('todo', JSON.stringify(todoList));
		}

		// 获取数据的方法
      	that.getData = function () {
        	return todoList;
      	};

      	// 添加数据
      	that.add = function (taskName) {
        	var id,
          	length = todoList.length;
	        if (length === 0) {
	          id = 1;
	        } else {
	          id = todoList[todoList.length - 1].id + 1;
	        }

	        todoList.push({ id: id, name: taskName, isCompleted: false });

	        that.save();
      	};

      	// 删除数据
      	that.del=function(id){
			for(var i=0;i<todoList.length;i++){
				if(todoList[i].id===id){
					todoList.splice(i,1);
					break;
				}
			}

			that.save();
		}

		// 全选
		that.checkAll=function(isCheckedAll){
			for(var i=0;i<todoList.length;i++){
				todoList[i].isCompleted =isCheckedAll;
			}

			that.save();
		}

		// 判断是不是全选
		that.isAll=function(isCheckedAll){
			var flag=0;
			for(var i=0;i<todoList.length;i++){
				if(!todoList[i].isCompleted){
					flag++;
				}
			}
			if(flag===0){
				isCheckedAll=true;
				that.checkAll(isCheckedAll);
			}else{
				isCheckedAll=false;
			}

			that.save();
			return {flag:flag,isCheckedAll:isCheckedAll};
		}

		// 清除已完成的任务
		that.delCompleted=function(){
			var todoArr=[];
			for(var i=0;i<todoList.length;i++){
				// 删除已完成的，保存未完成的
				if(!todoList[i].isCompleted)
					todoArr.push(todoList[i]);
			}

			// 清空数据数组(没有改变指向)
			todoList.length=0;
			[].push.apply(todoList,todoArr);

			that.save();
			// 改变指向
			// vm.todoList=todoList=todoArr;

			/*for(var i=0;i<todoList.length;i++){
				if(todoList[i].isCompleted){
					todoList.splice(i,1);
					i++;
				}
			}*/
		}

		// 按钮的展示和隐藏
		that.isShow=function(){
			var ret = false;
	        for (var i = 0; i < todoList.length; i++) {
	          if (todoList[i].isCompleted) {
	            ret = true;
	            break;
	          }
	        }

	        that.save();
	        return ret;
		}

	}]);

})(angular)