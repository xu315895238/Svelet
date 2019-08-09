<script>
	import MyMain from './shop/myMain.svelte'
	import Detail from './shop/details.svelte'
	import { Router, Link, Route } from "svelte-routing"
	import { onMount } from 'svelte'

	import {store} from '../public/store' // 仓库状态
	let data = []
	onMount(async function(){
		var x = await fetch('http://169.254.213.44:7002')
		var p = await x.text()
		data = JSON.parse(p).list
		store.set(data)
	})

</script>

<style>
	.box{
		width: 100%;
		height: 100%;
	}
</style>

<div class="box">
	<Router>
		<Route path='detail/*' > <Detail/></Route>
		<Route path='/'><MyMain data = {data}/></Route>
	</Router>
</div>
