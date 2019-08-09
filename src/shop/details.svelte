
<script>
	import { Router, Link, Route } from "svelte-routing";
	import { readable, get } from 'svelte/store';
	import MyMain from './myMain.svelte'

	var sj='';
	const time = readable(new Date(), set => {
		const interval = setInterval(() => {
			set(new Date());
		}, 1000);

		return () => clearInterval(interval);
	});
	time.subscribe((value)=>{
		sj = value
	})


	import {shoplist} from '../../public/store' // 仓库状态
	var data = [];
	data = get(shoplist)
	
</script>

<div>
	<p>
		{sj.getFullYear()}年
		{sj.getMonth()+1}月
		{sj.getDate()}日
		{sj.getHours()}时
		{sj.getMinutes()}分
		{sj.getSeconds()}秒
	</p>
	<MyMain data = {data} my={true}></MyMain>
	
</div>
