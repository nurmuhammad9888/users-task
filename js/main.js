const elListUser = document.querySelector(".list-user");
const elListPost = document.querySelector(".list-post");
const elListCommit = document.querySelector(".commit-list");

const templateUser = document.querySelector(".template-user").content;
const templatePost = document.querySelector(".template-post").content;
const templateCommit = document.querySelector(".template-commit").content;
const fragmentUser= document.createDocumentFragment();

// USER 
async function mainFuncUser(){
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        renderFunc(data)
    } catch (error) {
        console.log(error);
    }
}
mainFuncUser()

function renderFunc(arr){
    arr.forEach(el => {
        const temUserClone = templateUser.cloneNode(true);
        temUserClone.querySelector(".user-id").textContent = el.id;
        temUserClone.querySelector(".btn-user").dataset.id = el.id;
        temUserClone.querySelector(".user-title").textContent = el.name
        temUserClone.querySelector(".user-text").textContent = el.username
        temUserClone.querySelector(".user-email").href = el.email
        temUserClone.querySelector(".user-email").textContent = el.email
        temUserClone.querySelector(".user-email").href = `mailto:${el.email}`
        temUserClone.querySelector(".user-maps").href = `https://www.google.com/maps/place/${el.address.geo.lat},${el.address.geo.lng}`
        temUserClone.querySelector(".user-phone").href = `tel:${el.phone}`
        temUserClone.querySelector(".user-site").href = el.website
        temUserClone.querySelector(".user-site").textContent = el.website
        temUserClone.querySelector(".user-compny-title").textContent = el.company.name
        temUserClone.querySelector(".user-compny-text").textContent = el.company.catchPhrase
        temUserClone.querySelector(".user-compane-time").textContent = el.company.bs
        fragmentUser.appendChild(temUserClone)
    });
    elListUser.appendChild(fragmentUser)
}

elListUser.addEventListener("click" , evt =>{
    if(evt.target.matches(".btn-user")){
        const id = evt.target.dataset.id;
        console.log(id);
        mainFuncPost(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        elListCommit.innerHTML ="";
    }
})


// POST 
async function mainFuncPost(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderFuncPost(data)
    } catch (error) {
        console.log(error);
    }
}

function renderFuncPost(arr){
    elListPost.innerHTML = "";
    arr.forEach(el => {
        const temUserClonePost = templatePost.cloneNode(true);
        temUserClonePost.querySelector(".post-id").textContent = el.id
        temUserClonePost.querySelector(".btn-post").dataset.id = el.id
        temUserClonePost.querySelector(".post-title").textContent = el.title
        temUserClonePost.querySelector(".post-text").textContent = el.body
        fragmentUser.appendChild(temUserClonePost)
    });
    elListPost.appendChild(fragmentUser)
}

elListPost.addEventListener("click" , evt =>{
    if(evt.target.matches(".btn-post")){
        const id = evt.target.dataset.id;
        console.log(id);
        mainFuncCommit(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    }
})

// COMMIT
async function mainFuncCommit(url){
    try {
        const res = await fetch(url);
        const data = await res.json();
        renderFuncCommit(data.slice(0, 10))
    } catch (error) {
        console.log(error);
    }
}


function renderFuncCommit(arr){
    elListCommit.innerHTML ="";
    arr.forEach(el => {
        const temUserCloneCommit = templateCommit.cloneNode(true);
        temUserCloneCommit.querySelector(".commit-id").textContent = el.id;
        temUserCloneCommit.querySelector(".commit-title").textContent = el.name;
        temUserCloneCommit.querySelector(".commit-text").textContent = el.body;
        fragmentUser.appendChild(temUserCloneCommit)
    });
    elListCommit.appendChild(fragmentUser)
}