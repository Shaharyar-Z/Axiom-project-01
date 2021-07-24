// Get DOM Elements
const input = document.querySelector('input');
const filter = document.querySelector('#filter');
const feedContainer = document.querySelector('#news-feed-container');
const loader = document.querySelector('#loader');


let limit = 5;
let pageCount = 1;
let postCount = 1;
let setUserData = [];

const getUser = async () => {
    const userRes = await fetch(`https://randomuser.me/api`);
    const userData = await userRes.json();
    const user = userData.results[0];
    const userObj = { userImg: user.picture.large, userName: user.name.first }
    return userObj;
};


async function getPost() {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}$_post=${pageCount}`);
    // const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    // const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
    const postData = await postRes.json();
    
    postData.forEach(async (posts) => {

        const getUserObj = getUser().then((userObj) => { return userObj });

        const userPost = {title:posts.title, body:posts.body,img:await (await getUserObj).userImg,name:await (await getUserObj).userName} 
        
        setUserData.push(userPost)
        
        populateUI();
    });
};

function populateUI() {
    setUserData.forEach((userPost) => {
        const post = document.createElement('div');
        post.classList.add('post');
        const htmlData = `
                    <div class="post-id">${postCount++}</div>
                    <div class="post-content">
                        <h2 class="post-title">${userPost.title}</h2>
                        <p class="post-body">
                            ${userPost.body}
                        </p>
                        <div class="user-data">
                            <img class='user-image' src="${userPost.img}" alt="${userPost.name}">
                            <p class='user-name'>${userPost.name}<p>
                        </div>
                    </div> `
        post.innerHTML = htmlData
        
        feedContainer.appendChild(post);
        
    })
};

function showData() {
    setTimeout(() => {
        loader.classList.remove('show')
        pageCount++;
        getPost();
    },1000)
};

function searchPost(e) {
    const searchText = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    // console.log(posts)

    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;
        const name = post.querySelector('.user-name').innerText;
        // console.log(name);

        if (title.indexOf(searchText) >= 0 || body.indexOf(searchText) >= 0 || name.indexOf(searchText) >= 0) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
    
    populateUI()
};


getPost();


window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 1) {
        // console.log('I am at Bottom');
        loader.classList.add('show')
        showData();
    } 
})

input.addEventListener('input',searchPost)


