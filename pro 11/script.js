// Get DOM Elements
const input = document.querySelector('input');
const filter = document.querySelector('#filter');
const feedContainer = document.querySelector('#news-feed-container');
const loader = document.querySelector('#loader');

let limit = 4;
let pageCount = 1;
let postCount = 1;
let imgCount = 1;


const fetchApi =async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b11f147a5dfc41a09df35e443e1fd96f');
    const data = await response.json();
    const articles = data.articles.slice(0,limit);
    return articles
    
};
const renderPosts =async () => {
    const posts = await fetchApi();
    console.log(posts);
    posts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const htmlData = `
                    <div class="img-div">
                    <img src=${post.urlToImage} alt=${imgCount++}>
                    <h6 class="time">${post.publishedAt}</h6>
                    </div>
                    <h2 class="post-title"><a target="_blank"
                            href=${post.url}>${post.title}</a></h2>
                    <p class="post-body">${post.description}</p>
                    <button class="detail-btn"> <a target="_blank"
                            href=${post.url}>Detail</a>
                    </button> `
                    postDiv.innerHTML = htmlData
        
        feedContainer.appendChild(postDiv);
    });
}
function searchPost(e) {
    const searchText = e.target.value;
    const postsData = document.querySelectorAll('.post');
    // console.log(posts)

    postsData.forEach((post) => {
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;
        // const name = post.querySelector('.user-name').innerText;
        // console.log(name);

        if (title.indexOf(searchText) >= 0 || body.indexOf(searchText) >= 0) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}
function showData() {
    setTimeout(() => {
        loader.classList.remove('show')
        limit++;
        fetchApi();
        renderPosts();
    },1000)
};

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 1) {
        loader.classList.add('show')
        showData();
    } 
})
input.addEventListener('input', searchPost);


renderPosts()
