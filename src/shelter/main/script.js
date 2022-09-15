// hamburger-menu

const data = await fetch("./pets.json")
const petsArr = await data.json()

const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const popupAreaa=document.querySelector("#popupArea")
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

popupAreaa.addEventListener('click', closeOnClick)


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

const popupLinks = document.querySelectorAll('.big-popup__link')
const bodyAll = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

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

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
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

const appState = {
    currentSlide: 1,
    itemsPerSlide: 3,
    currentItems: [],
    coreItems:[]
}

const innerWrapper=document.querySelector('#slider__container').querySelector('.inner');

innerWrapper.addEventListener('transitionend', ()=>{
    const coreItems=appState.coreItems;
    const prevItems=appState.currentItems;
    const newItemsToRender=makeItemsToRender(coreItems);

    const sideToKeep=prevItems.slice(0,3).filter(u=>coreItems.includes(u)).length===3
    ? 'left'
    :prevItems.slice(6,9).filter(u=>coreItems.includes(u)).length===3
        ? 'right' : 'none';
    console.log(sideToKeep)
    renderPets(newItemsToRender, sideToKeep);
})


const sliderButtons = document.querySelectorAll('.slider__circle-btn');
sliderButtons.forEach(u => {
    u.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('.left')) {
            appState.coreItems=appState.currentItems.slice(0,appState.itemsPerSlide);
            const innerWrapper=target.closest('.pets__slider').querySelector('.inner');
            innerWrapper.classList.add('translate-left');

            // coreItems = appState.currentItems.slice(-appState.itemsPerSlide)
            // document.querySelector('#slider__container').classList.add('transition-left')
            // document.querySelector('#slider__container').addEventListener("animationEnd", ()=> {
            //     document.querySelector('#slider__container').classList.remove('transition-left')
            // })
        } else if (target.closest('.right')) {
            appState.coreItems=appState.currentItems.slice(-3);
            const innerWrapper=target.closest('.pets__slider').querySelector('.inner');
            innerWrapper.classList.add('translate-right');
            // coreItems = appState.currentItems.slice(0, appState.itemsPerSlide)
            // document.querySelector('#slider__container').classList.add('transition-right')
            // document.querySelector('#slider__container').addEventListener("animationEnd", ()=> {
            //     document.querySelector('#slider__container').classList.remove('transition-right')
            // })
        }
        
    })
})




const random = (a, b) => {
    return Math.floor(a + Math.random() * (b + 1 - a));
};

const makeItemsToRender = (incItems) => {
    const coreItems = incItems || []
    const leftItems = [];
    const rightItems = [];
    while (coreItems.length < appState.itemsPerSlide) {
        const randomItem = petsArr[random(0, 7)]
        if (!coreItems.includes(randomItem)) {
            coreItems.push(randomItem);
        }
    }
    while (leftItems.length < appState.itemsPerSlide) {
        const randomItem = petsArr[random(0, 7)];
        if (!coreItems.includes(randomItem) && !leftItems.includes(randomItem)) {
            leftItems.push(randomItem);
        }
    }
    while (rightItems.length < appState.itemsPerSlide) {
        const randomItem = petsArr[random(0, 7)];
        if (!coreItems.includes(randomItem) && !rightItems.includes(randomItem)) {
            rightItems.push(randomItem);
        }
    }

    const res = leftItems.concat(...coreItems, ...rightItems);
    appState.currentItems = res;

    return res;
}


const renderPets = (itemsToRender,sideToKeep='none') => {
    console.log(itemsToRender)

    const container = document.querySelector('.slider__container');

    const innerWrapper=container.querySelector('.inner');
    innerWrapper.classList.remove('translate-left');
    innerWrapper.classList.remove('translate-right');

    let leftContainer=container.querySelector('.slider__container__left');
    let coreContainer=container.querySelector('.slider__container__core');
    let rightContainer=container.querySelector('.slider__container__right');

    coreContainer.remove();
    if (sideToKeep==='left') {
        rightContainer.remove();
        leftContainer.className='slider__container__core';
    } else if (sideToKeep==='right') {
        leftContainer.remove();
        rightContainer.className='slider__container__core';
    } else {
        rightContainer.remove();
        leftContainer.remove();
       
    }

    leftContainer=document.createElement('div');
    leftContainer.className='slider__container__left'
    rightContainer=document.createElement('div');
    rightContainer.className='slider__container__right'


    innerWrapper.prepend(leftContainer)
    

    coreContainer=container.querySelector('.slider__container__core');
    if (!coreContainer) {
        coreContainer=document.createElement('div');
        coreContainer.className='slider__container__core'
        innerWrapper.append(coreContainer);
    }

    innerWrapper.append(rightContainer)

    

    itemsToRender.forEach((u,i) => {
        const div = document.createElement('div');
        div.className = 'slider__card card';
        div.innerHTML = `
        <img class="card__photo" alt="photo"
        src="${u.img}">
        <p>${u.name}</p>
        <button class="card__button slider__button-secondary button">
        <a href="#big-popup" class="big-popup__link">Learn more</a>
        </button>
        `

        if (i<3) {
                leftContainer.append(div);
        } else if (i>=3&&i<6&&sideToKeep==='none') {
            coreContainer.append(div);
        } else if (i>=6) {
                rightContainer.append(div);
        }

        

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
        <img class="big-popup__img" alt="щенок Jennifer" src="${u.img}">
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

    
}

const initItems = makeItemsToRender();
renderPets(initItems);

const bigPopup=document.querySelector('#big-popup');

bigPopup.addEventListener('click',(e)=>{
    const target=e.target;
    if (!target.closest('.big-popup__content')) {
        popupClose(bigPopup);    
    }
})
// const BTN_LEFT=document.querySelector('.left')
// const BTN_RIGHT=document.querySelector('.right')


