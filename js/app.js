var list = [
	/*{
		title : "qwqwqw"
	},
	{
		title : "wqwqwqw"
	}*/
]

new Vue({
	el: ".wrap",
	data: {
		list: list,
		todo:"",
		editTodos:'',
		editBefor:''
	},
	methods: {
		addTodo(ev) { //添加任务
			this.list.push({
				title: this.todo,
				isCheck:false
			});
			this.todo='';
		},
		deleteTodo(todo){
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		enterTodo(todo){
			//console.log(todo)
			this.editTodos = todo;
			this.editBefor = todo.title;
		},endTodo(todo){
			this.editTodos = '';
		},
		cancleTodo(todo){
			todo.title = this.editBefor;
			this.editBefor = '';
			this.editTodos = '';
			
		}
	},
	directives:{
		"foucs":{
			update(el,binding){
				if(binding.value){
					el.focus();
				}
			}
		}
	},
	computed:{
		noCheckedLen:function(){
			return this.list.filter(function(item){
				return !item.isCheck;
			}).length
		}
	}
});