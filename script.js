let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
}

let searchIcon = document.querySelector('#search-icon');
let searchForm = document.querySelector('.search-form');

searchIcon.onclick = () =>{
  searchIcon.classList.toggle('fa-times');
  searchForm.classList.toggle('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
}




let storage = {};

function localStorageSet(obj) {
  window.localStorage.setItem("blogData", JSON.stringify(obj));
}

function localStorageGet() {
  let blogdata = window.localStorage.getItem("blogData");
  return JSON.parse(blogdata);
}

let delKeys;

let addBtn = document.getElementsByClassName("addBtn")[0];

function reRender() {
  let blog = document.getElementsByClassName("blog")[0];

  blog.innerHTML = "";

  for (let i in storage) {
    let EachBlog = document.createElement("div");
    EachBlog.className = "EachBlog";
    EachBlog.innerHTML = `
        <div class="EachBlogTop">
          <h1 class="bHead">${i}</h1> 
          <div class="buttonContainer">
            <span class="material-icons-outlined updatekey">
              edit
            </span>
            <span class="material-icons-outlined delkey">
              delete
            </span>    
          </div>
        </div>
        <p>${storage[i]}</p>
      
      `;
    blog.appendChild(EachBlog);
  }
  delKeys = document.querySelectorAll(".delkey");

  let bhead = document.querySelectorAll(".bHead");

  delKeys.forEach((del, index) => {
    del.addEventListener("click", () => {
      delete storage[bhead[index].innerText];
      reRender();
    });
  });

  let updatekey = document.querySelectorAll(".updatekey");

  updatekey.forEach((update, index) => {
    update.addEventListener("click", () => {
      let headingInput = document.getElementById("headingInput");

      let blogDesc = document.getElementById("blogDesc");

      headingInput.value = bhead[index].innerText;

      blogDesc.value = storage[bhead[index].innerText];
    });
  });
}

addBtn.addEventListener("click", () => {
  let headingInput = document.getElementById("headingInput");
  let blogDesc = document.getElementById("blogDesc");
  storage[headingInput.value] = blogDesc.value;

  reRender();
  blogDesc.value = "";
  headingInput.value = "";
});
