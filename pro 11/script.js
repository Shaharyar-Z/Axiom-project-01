// Get DOM Elements
const filter = document.querySelector('#filter');
const feedContainer = document.querySelector('#news-feed-container');
const loader = document.querySelector('#loader');


let limit = 4;
let pageCount = 1;

const getUser = async ()=> {
    const userRes = await fetch(`https://randomuser.me/api`);
    const userData = await userRes.json();
    const user = userData.results[0];
    const userObj = {userImg: user.picture.large, userName: user.name.first}
    return userObj;
}


async function getPost() {
    // const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}$_post=${pageCount}`);
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
    const postData = await postRes.json();
    
    postData.forEach(async (posts) => {
        const post = document.createElement('div');
        post.classList.add('post');

        const getUserObj = getUser().then((userObj) => {
            return userObj
        });
        
        const htmlData = `
                    <div class="post-id">${posts.id}</div>
                    <div class="post-content">
                        <h2 class="post-title">${posts.title}</h2>
                        <p class="post-body">
                            ${posts.body}
                        </p>
                        <div class="user-data">
                            <img src="${await (await getUserObj).userImg}" alt="${await (await getUserObj).userName}">
                            <p>${await (await getUserObj).userName}<p>
                        </div>
                    </div> `
        post.innerHTML = htmlData
        
        feedContainer.appendChild(post);
    });
};
getPost();



// function showData() {
//     setTimeout(() =>{
//         pageCount +1;
//         getPost();
//     },800)
// }

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 1) {
        // console.log('I am at Bottom');
        // loader.classList.add('show')
        // showData();
    } 
})


