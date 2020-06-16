// console.log('hello script.js')

const randomUserAPI = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const modalContainer = document.createElement('div');
const modalDiv = document.createElement('div');
const modalBtn = document.createElement('div');
modalBtn.className = "modal-btn-container";
modalBtn.innerHTML = `
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
`;

let allUsers = [];

const searchContainer = document.querySelector('.search-container');
const form = document.createElement('form');
form.setAttribute('action', "#");
form.setAttribute('method', "get");
const submit = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;
searchContainer.appendChild(form);
form.innerHTML = submit;


async function fetching(url) {
    try {
        const res = await fetch(url);
        const jsonRes = await res.json();
        return await jsonRes.results;
    } catch(error) {
        throw error;
    }
}

fetching(randomUserAPI)
    .then(randomUserCards);

function randomUserCards(users) {
    // console.log(user)
    allUsers = users.map( user => {
        console.log(user)
        const userInfo = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `
        gallery.innerHTML += userInfo;
        
        return { ...user };
    })

    showModal()

}

function randomUserModal(userIndex) {
    const birthday = new Date(Date.parse(allUsers[userIndex].dob.date)).toLocaleDateString() 

    modalContainer.className = "modal-container";
    modalDiv.className = "modal";
    modalContainer.appendChild(modalDiv);
    modalContainer.appendChild(modalBtn)
    document.body.appendChild(modalContainer);

    const card = `
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${allUsers[userIndex].picture.thumbnail}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${allUsers[userIndex].name.first} ${allUsers[userIndex].name.last}</h3>
            <p class="modal-text">${allUsers[userIndex].email}</p>
            <p class="modal-text cap">${allUsers[userIndex].location.city}</p>
            <hr>
            <p class="modal-text">${allUsers[userIndex].phone}</p>
            <p class="modal-text">${allUsers[userIndex].location.street.number} ${allUsers[userIndex].location.street.name} ${allUsers[userIndex].location.state}, ${allUsers[userIndex].nat} ${allUsers[userIndex].location.postcode}</p>
            <p class="modal-text">Birthday: ${birthday}</p>
        </div>
    `
    modalDiv.innerHTML = card;
    modalContainer.style.display = 'block';
}

function showModal() {
    const cards = gallery.querySelectorAll('.card');

    cards.forEach( ( user, index ) => {
        user.addEventListener('click', ()=> {
            console.log('clicked', index)
            randomUserModal(index)
        })
        // console.log('user', user)
    })
}

modalContainer.addEventListener('click', () => {
    console.log('clicked')
})