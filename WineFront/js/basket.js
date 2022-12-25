function GetProducts(){
    let basket=JSON.parse(localStorage.getItem('products'))
    let count=0;
    let total=document.querySelector('#total')
    if (basket === null|| basket.length===0) {
        document.querySelector('#Clear .btn').style.display='none'
        document.querySelector("#show").classList.remove('d-none')
    } else {
        document.querySelector("#main").classList.remove('d-none')
        let html=``
        let totl = 0;
        for (let product of basket) {
        count+=Number(product.Price*product.Count)
        html+=
        `
        <li class="lists list-group-item d-flex justify-content-between align-items-center">
            <div class="cart-list-item-row">
                <img alt="" class="img-fluid" style="width:80px ;" src=${product.Image}>
            </div>
            <div class="cart-list-item-row"><p>${product.Name}</p></div>
            <div class="cart-list-item-row">
                <div class="b-icons">
                  <i id="decrease" class="bi bi-dash-circle-fill"></i>
                  <input type="number" min=1 value=${product.Count} disabled>
                  <i id="increase" class="bi bi-plus-circle-fill"></i>
                </div>
            </div>
            <div id="price" class="cart-list-item-row">
               <span>Price: $${Number(product.Price.slice(1))*Number(product.Count)}</span>
               <p class="d-none">id:<span class="p_Id" data-id=${product.Id}>${product.Id}</span></p>
            </div>
            <div id='close' class="cart-list-item-row"><i class="bi bi-x"></i> </div>
        </li>
        ` 
        totl += Number(product.Price.slice(1))*Number(product.Count)
    }
    // document.getElementById('total').innerHTML = totl
    total.innerHTML=`${totl} $`
    console.log(totl);
    document.querySelector('.mirta').innerHTML=html;
    let lists=document.querySelectorAll('.lists')
    for (let list of lists) {
        let increase=list.querySelector('#increase')
        let decrease=list.querySelector('#decrease')
        let del=list.querySelector('#close')
        let input=list.querySelector('.b-icons input')
        increase.addEventListener('click',()=>{
            let l_id=list.querySelector('#price .p_Id').getAttribute('data-id')
            let item=basket.find(item=>item.Id===l_id);
            item.Count++
            console.log(item.Count);
            localStorage.setItem('products',JSON.stringify(basket))
            location.reload()    
        })
        decrease.addEventListener('click',()=>{
            let l_id=list.querySelector('#price .p_Id').getAttribute('data-id')
            let item=basket.find(item=>item.Id===l_id);
            if (item.Count>1) {
                item.Count--
                localStorage.setItem('products',JSON.stringify(basket))
                location.reload()
            } else if(item.Count===1){
                basket.splice(basket.indexOf(item),1)
                localStorage.setItem('products',JSON.stringify(basket))
                location.reload()
            }
           
        })
        del.addEventListener('click',()=>{
            let l_id=list.querySelector('#price .p_Id').getAttribute('data-id')
            let item=basket.find(item=>item.Id===l_id);
            basket.splice(basket.indexOf(item),1)
            localStorage.setItem('products',JSON.stringify(basket))
            location.reload()
        })
        input.addEventListener('change',()=>{
            let l_id=list.querySelector('#price .p_Id').getAttribute('data-id')
            let item=basket.find(item=>item.Id===l_id);
            item.Count=input.value
            localStorage.setItem('products',JSON.stringify(basket))
            location.reload()
        })
    }
    }
}  
GetProducts();
document.querySelector('#Clear .btn').addEventListener('click',()=>{
    localStorage.removeItem('products')
    location.reload()
})

// window.location = "http://" + window.location.hostname + ":5500/basket.html";
