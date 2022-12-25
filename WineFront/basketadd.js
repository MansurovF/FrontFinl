if(localStorage.getItem('products') === null) {
    localStorage.setItem('products',JSON.stringify([]))
}


// let buttons = document.querySelectorAll('.btn');

var AddBasket = function(e) {
    console.log('elave olundu');

        let pr_id = e.parentElement.previousElementSibling.innerHTML;
        let pr_name = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
        let pr_price = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        let pr_image = e.parentElement.parentElement.nextElementSibling.src;
        
        let basket = JSON.parse(localStorage.getItem('products'));

        let exist_prod = basket.find(pr => pr.Id === pr_id);

        if(exist_prod === undefined) {
            basket.push({
                Id: pr_id,
                Name: pr_name,
                Price: pr_price,
                Image: pr_image,
                Count: 1
            })
            // document.querySelector('#alert p').innerHTML = 'Səbətə əlavə olundu'
            // document.getElementById('alert').style.right = '20px'
        }
        else{
            exist_prod.Count += 1;
            // document.querySelector('#alert p').innerHTML = 'Bu məhsul artıq əlavə olunub'
            // document.getElementById('alert').style.right = '20px'
            // document.getElementById('alert').style.backgroundColor = '#FF0033'
        }

        localStorage.setItem('products',JSON.stringify(basket));
        // setTimeout(() => {
        //     document.getElementById('alert').style.right = '-500px'
        // }, 1500);
        BasketCount();
    }


function BasketCount() {
  let basket = JSON.parse(localStorage.getItem('products'));
  document.getElementById('shopcartcount').innerHTML =  basket.length;
}

BasketCount();