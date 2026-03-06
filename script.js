
// categories container 

const categoriesContainer = document.getElementById('categoriesContainer')

async function loadCategories(){
  

    // async await 
    const res = await fetch('https://openapi.programming-hero.com/api/categories') ;
    const data = await res.json() ;
    console.log(data) ;

    data.categories.forEach(element =>{
        console.log(element) ;
        const btn = document.createElement('button') ;
        btn.className = 'btn btn-outline w-full' ;
        btn.textContent = element.category_name ;
        categoriesContainer.appendChild(btn)
    } )
}


loadCategories() ;