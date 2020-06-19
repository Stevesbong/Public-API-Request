// URL AND GALLERY DIV
const randomUserURL = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');


// MODAL BOX SETTINGS
const modalContainer = document.createElement('div');
const modalDiv = document.createElement('div');
const modalBtn = document.createElement('div');
modalBtn.className = "modal-btn-container";
modalBtn.innerHTML = `
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
`;

// MODAL CARD PURPOSE. SAVE DATA FROM RANDOM USER API
let allUsers = [];

// SEARCH BOX SETTINGS
const searchContainer = document.querySelector('.search-container');
const form = document.createElement('form');
form.setAttribute('action', "#");
form.setAttribute('method', "get");
const inputs = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
`;
searchContainer.appendChild(form);
form.innerHTML = inputs;


// FETCHING API USING ASYNC / AWAIT
async function fetching(url) {
    try {
        const res = await fetch(url);
        const jsonRes = await res.json();
        return await jsonRes.results;
    } catch(error) {
        throw error;
    }
}


// USER LAYOUT FUNCTION
function randomUserCards(users) {
    allUsers = users.map( user => {
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

    showModal();
    searchUsers();
}


// MODAL LAYOUT FUNCTION
function randomUserModal(userIndex) {
    const birthday = new Date(Date.parse(allUsers[userIndex].dob.date)).toLocaleDateString();

    modalContainer.className = "modal-container";
    modalDiv.className = "modal";
    modalContainer.appendChild(modalDiv);
    modalContainer.appendChild(modalBtn);
    document.body.appendChild(modalContainer);

    const card = `
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${allUsers[userIndex].picture.large}" alt="profile picture">
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


// DISPLAY MODAL WHEN USER CLICKED CARD DIV
function showModal() {

    const cards = gallery.querySelectorAll('.card');

    cards.forEach( ( user, index ) => {
        user.addEventListener('click', ()=> {
            randomUserModal(index);
            prevNextModal(index);
        })
    })
}


// PREVIOUS AND NEXT BUTTON EVENT LISTNER
function prevNextModal(userIndex) {
    
    // IF CLICKED PREVIOUS BUTTON, SUBTRACT 1 TO INDEX
    // IF CLICKED NEXT BUTTON, ADD 1 TO INDEX
    document.querySelector('.modal-btn-container').addEventListener('click', e => {
        if(e.target.id === "modal-prev") {
            if( userIndex > 0 ) {
                userIndex--;
                randomUserModal(userIndex);
            }
        } else if(e.target.id === "modal-next") {
            if( userIndex < 11 ) {
                userIndex++;
                randomUserModal(userIndex);
            }
        }
    })
}


// SEARCH INPUT EVENT LISTNER. FILTERED BY USER NAME
function searchUsers() {
    document.getElementById('search-input').addEventListener('input', e => {
        const cards = gallery.querySelectorAll('.card');
        const names = gallery.querySelectorAll('.card #name');
        let inputValue = e.target.value.toLowerCase();

        // IF INPUT VALUES MATCHES NAME IN THE EACH CARD, THEN DISPLAY.
        // OTHER CARD WILL DISAPPEAR
        names.forEach( ( name, index ) => {

            const nameValue = name.textContent.toLowerCase();
            if(nameValue.includes(inputValue)) {
                cards[index].style.display = 'inherit';
            } else {
                cards[index].style.display = 'none';
            }

        })

    })
}


// FETCHING RANDOM USER AND DISPLAY
fetching(randomUserURL)
    .then(randomUserCards);


// MODAL OVERLAY CLOSE EVENT LISTNER
modalContainer.addEventListener('click', e => {
    if(e.target.tagName === "STRONG" || e.target.className === "modal-container") {
        modalContainer.style.display = "none";
    }
})