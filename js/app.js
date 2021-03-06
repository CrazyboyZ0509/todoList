/*var list = [
	{
		title : "qwqwqw"
	},
	{
		title : "wqwqwqw"
	}
]*/

var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

var list = store.fetch( "newClass");

var filter = {
	all:function(){
		return list;
	},
	finish:function(){
		return list.filter(function(item){
			return item.isCheck;
		})
	},
	unfinish:function(){
		return list.filter(function(item){
			return !item.isCheck;
		})
	}
}

var vm = new Vue({
	el: ".wrap",
	data: {
		list: list,
		todo:"",
		editTodos:'',
		editBefor:'',
		visibility:"all"
	},
	watch:{
		list:{
			handler:function(){
				store.save("newClass",this.list);
			},
			deep:true
		}
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
		},
		filteredList:function(){
			
			return filter[this.visibility] ? filter[this.visibility](list) : list;
			
		}
	}
});

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	
	vm.visibility = hash;
}

watchHashChange();

window.addEventListener("hashchange",watchHashChange);
