
// categories container 

const categoriesContainer = document.getElementById('categoriesContainer')
const treesContainer = document.getElementById('trees-container');
const loadingSpinner = document.getElementById('loading-spinner') ;
const treeDetailsModal = document.getElementById('tree_details_modal') ;


// function for loading spinner
function showLoading(status){

    if(status === true ){
        loadingSpinner.classList.remove('hidden') ;
        treesContainer.classList.add('hidden') ;
    } else{

        treesContainer.classList.remove('hidden') ;
        loadingSpinner.classList.add('hidden') ;

    }

}
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
        btn.onclick = () => selectCategory(element.id , btn)
        categoriesContainer.appendChild(btn)
    })
}


// function for category onclick 
async function selectCategory(categoryId , btn){
    console.log(categoryId , btn)

    showLoading(true)  ;

    const allButton = document.querySelectorAll('#categoriesContainer button , #allTrees') ;
    
    // step 1 -- every button make btn outline
    allButton.forEach(btn => {
        btn.classList.remove('btn-primary') ;
        btn.classList.add('btn-outline')
        
    })

    // paramiter theke asha btn take add btn-primary
    btn.classList.add('btn-primary') ;  
    btn.classList.remove('btn-outline') ;



    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`) ;

    const data = await res.json() ;
    console.log(data)
    showLoading(false)
    displayTrees(data.plants) ;
}


// dynamic for all btn 

document.getElementById('allTrees').addEventListener('click' , ()=>{
       const allButton = document.querySelectorAll('#categoriesContainer button , #allTrees') ;
    
    // step 1 -- every button make btn outline
    allButton.forEach(btn => {
        btn.classList.remove('btn-primary') ;
        btn.classList.add('btn-outline')
        
    })

    document.getElementById('allTrees').classList.add('btn-primary') ;  
    document.getElementById('allTrees').classList.remove('btn-outline') ;

    loadTrees()



    
})


// function for trees 

async function loadTrees() {

    showLoading(true) ;

    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    showLoading(false) ;
    displayTrees(data.plants);

}


function displayTrees(trees) {

    // console.log(trees)
    treesContainer.innerHTML = '' ;

    trees.forEach(tree => {
        // console.log(tree)
        const card = document.createElement('div');
        card.className = "card bg-white w-[95%]  shadow-sm "
        card.innerHTML = `
         <figure>
                        <img class="h-48 w-full object-cover" src=${tree.image}
                            alt="${tree.name}" title = '${tree.name}' />
                    </figure>
                    <div class="card-body p-2">
                        <h2 class="card-title cursor-pointer hover:text-green-700 " onclick="openTreeModal(${tree.id})">${tree.name}</h2>
                        <p class="text-sm text-left line-clamp-2">${tree.description}
                        </p>
                        <div class="badge  badge-outline badge-success bg-green-100">${tree.category}</div>

                        <div class="flex justify-between items-center">
                            <p class="font-bold text-xl text-[#15803D] text-left">$${tree.price}</p>
                            <button class="btn btn-primary bg-[#15803D]">Cart</button>
                        </div>
                    </div>
        
        `


        treesContainer.appendChild(card) ;
        
    })

}





// function for modal

async function openTreeModal(treeId){
    console.log("treeId" , treeId) ;

    treeDetailsModal

    const res =await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`) ;
    const data =await res.json() ;

    const plantDetails = data.plants ;
    console.log(plantDetails , data)
    treeDetailsModal.showModal() ;
}





loadCategories();
loadTrees();