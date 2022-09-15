// import json from "./pets.json";

// hamburger-menu

const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;

const menu = document.querySelector("#menu").cloneNode(1);

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {

    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    renderPopup();
}

function renderPopup() {
    popup.appendChild(menu);
}

const links = Array.from(menu.children);

links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
}

// popup 

const btn=document.querySelector('.big-popup__close')
const bcgr=document.querySelector('.big-popup__content')
bcgr.addEventListener("mouseover", func1, false); 
bcgr.addEventListener("mouseout", func, false); 
// bcgr.addEventListener("mouseover", func, false);
function func() {  
    btn.classList.add('btn-hover')
} 
function func1()  {   
    btn.classList.remove('btn-hover')
}

// btn.addEventListener("mouseover", func1, false); 
// btn.addEventListener("mouseout", func, false); 


const popupLinks = document.querySelectorAll('.big-popup__link')
const bodyAll = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')
const card=document.querySelectorAll('.card')
// card.addEventListener('click', popupOpen)
let unlock = true

const timeout = 800

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i]
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '')
            const curentPopup = document.getElementById(popupName)
            popupOpen(curentPopup)
            e.preventDefault()
        })
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i]
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.big-popup'))
            e.preventDefault()
        })
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.big-popup.open')
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        curentPopup.classList.add('open')
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.big-popup__content')) {
                popupClose(e.target.closest('.big-popup'))
            }
        })
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - bodyAll.offsetWidth + 'px'
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i]
            el.style.paddingRight = lockPaddingValue
        }
    }
    bodyAll.style.paddingRight = lockPaddingValue
    bodyAll.classList.add('lock')
    console.log(bodyAll.classList)

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        // popupActive.classList.add('inactive')
        popupActive.classList.remove('open')

        if (doUnlock) {
            bodyUnlock()
        }
    }
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i]
                el.style.paddingRight = '0px'
            }
        }
        bodyAll.style.paddingRight = '0px'
        bodyAll.classList.remove('lock')
    }, timeout)

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

// pagination

const data = await fetch("./pets.json")
const petsArr = await data.json()

console.log(petsArr)

const makeShuffledArray = (petsArr) => {
    const random = (a, b) => {
        return Math.floor(a + Math.random() * (b + 1 - a));
    };

    const array = [random(0, 7)];

    while (array.length < 48) {
        let newItem = random(0, 7);
        const pageNumber8 = Math.floor(array.length / 8);
        const pageNumber6 = Math.floor(array.length / 6);
        const pageNumber3 = Math.floor(array.length / 3);
        const page8 = array.slice(pageNumber8 * 8);
        const page6 = array.slice(pageNumber6 * 6);
        const page3 = array.slice(pageNumber3 * 3);
        if (
            !page8.includes(newItem) &&
            !page6.includes(newItem) &&
            !page3.includes(newItem) &&
            array.filter((u) => u === newItem).length < 6
        ) {
            array.push(newItem);
        }
    }

    return array.map(u => petsArr[u]);
};


const screenWidth  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;

const appState = {
    page: 1,
    itemsPerPage: screenWidth<768?3:screenWidth>1280?8:6,
}

const shuffledPets = makeShuffledArray(petsArr);

const renderPets = (pageNumber, itemsPerPage, items) => {
    const minPage = 1;
    const maxPage = Math.ceil(48 / appState.itemsPerPage);
    const target = document.querySelector('.pets__cards');

    target.innerHTML = ``;

    const itemsToRender = items.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

    itemsToRender.forEach(u => {
        const div = document.createElement('div');
        div.className = 'cards__card card'
        div.innerHTML = `
        <img alt="photo" src="${u.img}">
        <p class="cards__name">${u.name}</p>
        <button class="cards__button card__button"><a href="#big-popup" class="big-popup__link">Learn more</a></button>
        `
        target.appendChild(div);

        div.onclick = () => {
            div.querySelector('.big-popup__link').click()
        }
        
        const popupButton=div.querySelector('.card__button');

        popupButton.addEventListener('click',()=>{
            const bigPopup=document.querySelector('#big-popup');
            bodyAll.classList.add('lock')
            bigPopup.classList.add('open');
            const targetDiv=bigPopup.querySelector('.big-popup__info');
            targetDiv.innerHTML=``;
            targetDiv.innerHTML=`
            <img class="big-popup__img" alt="photo" src="${u.img}">
                    <div class="big-popup__text">
                        <h3>${u.name}</h3>
                        <h4>${u.type} - ${u.breed}</h4>
                        <h5>${u.description}</h5>
                        <ul class="big-popup__list">
                            <li><span class="big-popup__list--text-color"><b>Age: </b>${u.age}</span></li>
                            <li><span class="big-popup__list--text-color"><b>Inoculations: </b>${u.inoculations}</span></li>
                            <li><span class="big-popup__list--text-color"><b>Diseases: </b>${u.diseases}</span></li>
                            <li><span class="big-popup__list--text-color"><b>Parasites: </b>${u.parasites}</span></li>
                        </ul>
                    </div>
            `
        })
    })


    const pageButtons = document.querySelectorAll('.pagination__circle-btn');
    pageButtons.forEach(u => {
        
        if (u.innerText === '<' || u.innerText === '<<') {
            if (appState.page === minPage) {
                u.setAttribute("disabled", "disabled");
                u.classList.remove('pagination__circle-btn--active');
                u.classList.add('pagination__circle-btn--inactive');
            } else {
                u.removeAttribute('disabled');
                u.classList.remove('pagination__circle-btn--inactive');
                u.classList.add('pagination__circle-btn--active');
            }
        }
        if (u.innerText === '>' || u.innerText === '>>') {
            if (appState.page === maxPage) {
                u.setAttribute("disabled", "disabled");
                u.classList.remove('pagination__circle-btn--active');
                u.classList.add('pagination__circle-btn--inactive');
            } else {
                u.removeAttribute('disabled');
                u.classList.remove('pagination__circle-btn--inactive');
                u.classList.add('pagination__circle-btn--active');
            }
        }
    })

    const pageNumberButton = document.querySelector('.pagination__circle-btn--middle');
    pageNumberButton.innerText = appState.page;
}

const paginationButtons = document.querySelectorAll('.pagination__circle-btn');

paginationButtons.forEach(u => {
    const minPage = 1;
    const maxPage = Math.ceil(48 / appState.itemsPerPage);
    u.addEventListener('click', () => {
        if (u.innerText === '>') {
            if (appState.page < maxPage) {
                appState.page += 1;
            }
        }
        if (u.innerText === '>>') {
            appState.page = maxPage;
        }
        if (u.innerText === '<<') {
            appState.page = minPage;
        }
        if (u.innerText === '<') {
            if (appState.page > minPage) {
                appState.page -= 1;
            }
        }
        renderPets(appState.page, appState.itemsPerPage, shuffledPets);
    })
})

const bigPopup=document.querySelector('#big-popup');

bigPopup.addEventListener('click',(e)=>{
    const target=e.target;
    if (!target.closest('.big-popup__content')) {
        popupClose(bigPopup);    
    }
})


renderPets(appState.page, appState.itemsPerPage, shuffledPets);


