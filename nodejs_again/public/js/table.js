document.addEventListener("DOMContentLoaded", ()=>{
	document.querySelector("header.home").addEventListener("click", ()=>{
		document.location.href = "/"
	})
	const product_article =  document.querySelector("article.product_list")
	if(product_article) {
		product_article.addEventListener("click",(e)=>{
			const target = e.target

			if(target.tagName === "DIV" 
				&& target.className.includes("menu")){
					const menu_id = target.dataset.menu_id
					alert(menu_id)
					//document.location.href = `/pos/order/${table_id}`
				}
			
		})
	}
})