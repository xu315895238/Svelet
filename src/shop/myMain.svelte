<style>
	h3{
		width: 100%;
		height: 30px;
		text-align: center;
		line-height:30px;
		border-bottom:1px solid #ccc;
	}
	.box{
		width: 100%;
		height: 100%;
		overflow-y:scroll;
	}
	dl{
		display:grid;
		grid-template-columns: 110px auto;
		grid-template-rows: 110px;
	}
	dt{
		width: 100px;
		height: 100px;
		background:skyblue;
	}
	dd button{
		width: 30px;
		height: 20px;
	}
	.flex{
		position:fixed;
		bottom:0;
		width: 100%;
		height: 50px;
		background:#ededed;
	}
	.floor{
		width:100%;
		height: 50px;
	}
	.inputs{
		float:right;
		width: 30px;
		height: 30px;
		border:1px solid #ccc;
		border-radius: 50%;
	}
	.inputs.active{
		background:green;
	}
</style>


<script>
	import { setContext, getContext } from 'svelte';
	import { Router, Link, Route } from "svelte-routing";


	export var data;
	export let my = false;

	var zong =0;
	var quan = false;

	let zongfn = () =>{ // 选中的总价
		var shops = data.filter(item => item.flag)
		shops.forEach(item =>{
			zong += item.price * item.num
		})
	}
	let add = (id) =>{
		data.forEach(item =>{
			if(item.id === id){
				item.num +=1
			}
		})
		zong = 0
		data = data
		zongfn()
	}
	let del = (id) =>{
		data.forEach(item =>{
			if(item.id === id && item.num >0){
				item.num -=1
			}
		})
		zong = 0
		data = data
		zongfn()
	}

	import {shoplist} from '../../public/store' // 仓库状态
	function addshop(shop,type,i){
		shoplist.update((value)=>{
			var ind = value.findIndex(item=>(item.id == shop.id))
			if(type === 'add'){
				console.log('add')
				if(ind === -1){
					value.push({...shop})
				}
			}else{
				console.log('del')
				console.log(shop.id)
				console.log(i)
				if(ind !== -1){
					value.splice(ind,1)
				}
				
			}
			return value
		})
		data = data
	}

	let inps = (item) =>{ // 单选
		item.flag = !item.flag
		quan = data.every(n => n.flag)
		zong = 0
		data = data
		zongfn()
	}
	let inpsorr = () =>{ // 全选
		quan = !quan
		data.forEach(item =>{
			item.flag = quan
		})
		zong = 0
		data = data
		zongfn()
	}
</script>

<div class="box">
	<h3>
		{#if my}
			MY购物车
		{:else}
			商品列表
		{/if}
	</h3>
	{#each data as item, i}
		<dl>
			<dt>{item.title}</dt>
			<dd>
				<p>品名 {item.title}
				{#if my}
					<span class='inputs {item.flag?"active":""}' on:click={()=>inps(item)}></span>
				{/if}
				</p>
				<p>单价 {item.price}</p>
				<p>总价 {item.price*item.num}</p>
				<p>
					数量
					<button on:click = {(e)=>{
						e.stopPropagation()
						del(item.id)
					}}>-</button>
					<span>{item.num}</span>
					<button on:click = {(e)=>{
						e.stopPropagation()
						add(item.id)
					}}>+</button>
					{#if !my}
						<span on:click={(e)=>{
							e.stopPropagation()
							addshop(item,'add')
						}}>加入购物车</span>
						{:else}
						<span on:click={(e)=>{
							e.stopPropagation()
							addshop(item,'del',i)
						}}>移出购物车</span>
					{/if}
				</p>
			</dd>
		</dl>
	{/each}
	<div class='flex'>

		{#if my}
			<p>商品总价：{zong} 折扣后应付：{zong}</p>
			<Link to='/'>返回首页</Link>
			<p style="float:right">全选<span class='inputs {quan?"active":""}' on:click={()=>inpsorr()}></span></p>
		{:else}
			<Link to='detail'>我的购物车</Link>
		{/if}

	</div>
	<div class='floor'></div>
</div>



