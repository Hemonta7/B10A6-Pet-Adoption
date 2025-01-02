const loadDetails=async(petId)=>{
try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    );
    const data = await res.json();
    loadDetailsDisplay(data.petData);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

const loadDetailsDisplay=(petData)=>{
const modalContent = document.getElementById("modalContent");
modalContent.innerHTML = `
                    <img class="w-full my-2" src="${petData.image}"
                    <div>
                                        <h4 class="text-xl font-bold">${petData.pet_name}</h4>
                                        </div>
                    <div class="flex gap-4 my-2">
                    <div class="flex gap-1">
                       <img src="../images/Frame4.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Breed: ${petData.breed}</p>
                    </div>
                    <div class="flex gap-1">
                       <img src="../images/Frame1.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Birth: ${petData.date_of_birth}</p>
                    </div>
                    </div>
                    <div class="flex gap-10 my-2">
                    <div class="flex gap-1">
                       <img src="../images/Frame2.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Gender: ${petData.gender}</p>
                    </div>
                    <div class="flex gap-1">
                       <img src="../images/Frame3.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Price: ${petData.price}</p>
                    </div>
                    </div>
                    <div class="flex gap-1">
                       <img src="../images/Frame5.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Vaccinated status: ${petData.vaccinated_status}</p>
                    </div>
                <hr class="my-2">
                <h4 class="text-base font-semibold">Details Information</h4>
                <p class="my-2">${petData.pet_details}</p>
`;
document.getElementById("myModal").showModal();
}

const removeActiveClass=()=>{
    const categoryBtn = document.getElementsByClassName("category-btn");
    for(const btn of categoryBtn){
        btn.classList.remove("active");
    }
}

const loadCatergoryPets=async(category)=>{
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const data = await res.json();
    removeActiveClass();
    const activeBtn=document.getElementById(`btn-${category}`)
    activeBtn.classList.add("active")
    displayAllPets(data.data);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await res.json();
    displayCategories(data.categories);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

const displayCategories = (category) => {
  const buttonContainer = document.getElementById("buttonContainer");
  category.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = `
    <div id="btn-${item.category}" class="category-btn border rounded-full my-8 btn h-20">
        <div onclick=loadCatergoryPets("${item.category}") class="flex items-center my-3 mx-12 gap-2">
        <img src="${item.category_icon}" />
        <p class="text-xl font-bold">${item.category}</p> 
        </div>
        </div>
        `;
    buttonContainer.appendChild(button);
  });
};

const loadAllPets = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();
    displayAllPets(data.pets);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }

const displayAllPets = (pets) => {
  const gridContainer = document.getElementById("gridContainer");
  gridContainer.innerHTML="";
  if(pets.length==0){
    gridContainer.classList.remove("grid")
    gridContainer.innerHTML = `
    <div class="flex flex-col items-center p-4 bg-gray-100 rounded-3xl shadow-lg">
    <img class="w-40" src="../images/error.webp" />
    <h3 class="text-3xl font-bold">No Information Available</h3>
    <p class="text-base font-medium text-gray-600 w-2/3 mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return
  }else{
        gridContainer.classList.add("grid");
  }
  pets.forEach((pets) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-compact bg-base-100 w-72 shadow-xl p-4">
                    <figure class="rounded-lg">
                        <img class="rounded-lg" src="${pets.image}" alt="Pets" />
                    </figure>
                <div class="space-y-1">
                <h4 class="text-xl font-bold">${pets.pet_name}</h4>
                    <div class="flex gap-1">
                       <img src="../images/Frame4.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Breed: ${pets.breed}</p>
                    </div>
                    <div class="flex gap-1">
                       <img src="../images/Frame1.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Birth: ${pets.date_of_birth}</p>
                    </div>
                    <div class="flex gap-1">
                       <img src="../images/Frame2.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Gender: ${pets.gender}</p>
                    </div>
                    <div class="flex gap-1">
                       <img src="../images/Frame3.png"/>
                        <p class=" flex text-lg font-normal text-gray-500">Price: ${pets.price}</p>
                    </div>
                    
                </div>
                <hr class="my-2">
                <div class="flex justify-around">
                <button class="btn text-common bg-transparent border-2"><img class="w-8 h-8" src="https://img.icons8.com/?size=64&id=66627&format=png"/></button>
                <button class="btn text-common bg-transparent border-2">Adopt</button>
                <button onclick="loadDetails(${pets.petId})" class="btn text-common bg-transparent border-2">Details</button>
                </div>                    
                </div>
    `;
    gridContainer.appendChild(div);
  });
};

loadCategories();
loadAllPets();
