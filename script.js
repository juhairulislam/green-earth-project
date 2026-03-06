
// categories container 

const categoriesContainer = document.getElementById('categoriesContainer')
const treesContainer = document.getElementById('trees-container');

// function for categories

async function loadCategories() {


    // async await 
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    // console.log(data) ;

    data.categories.forEach(element => {
        // console.log(element) ;
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline w-full';
        btn.textContent = element.category_name;
        categoriesContainer.appendChild(btn)
    })
}


// function for trees 

async function loadTrees() {

    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    displayTrees(data.plants);

}


function displayTrees(trees) {

    // console.log(trees)

    trees.forEach(tree => {
        console.log(tree)
        const card = document.createElement('div');
        card.className = "card bg-white w-[95%]  shadow-sm "
        card.innerHTML = `
         <figure>
                        <img class="h-48 w-full object-cover" src=${tree.image}
                            alt="${tree.name}" title = '${tree.name}' />
                    </figure>
                    <div class="card-body p-2">
                        <h2 class="card-title">${tree.name}</h2>
                        <p class="text-sm text-left line-clamp-2">${tree.description}
                        </p>
                        <div class="badge  badge-outline badge-success bg-green-100">${tree.category}</div>

                        <div class="flex justify-between items-center">
                            <p class="font-bold text-xl text-[#15803D] text-left">$5000</p>
                            <button class="btn btn-primary bg-[#15803D]">Cart</button>
                        </div>
                    </div>
        
        `


        treesContainer.appendChild(card)
    })

}





loadCategories();
loadTrees();