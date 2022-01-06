// Declare these now and use later
const topStories = [];
const newStories = [];
const bestStories = [];

/* Fetch Hacker News Stories */
const getTopStories = async (offset, clearDOM) => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const topStoryIds = response.data; // Top 500 story IDs - 
    
    showStories(topStoryIds, topStories, offset, clearDOM);
}

const getNewStories = async (offset, clearDOM) => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const newStoryIds = response.data; // 500 Newest Story IDs
    
    showStories(newStoryIds, newStories, offset, clearDOM);
}

const getBestStories = async (offset, clearDOM) => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty');
    const bestStoryIds = response.data; // 500 Best story IDs

    showStories(bestStoryIds, bestStories, offset, clearDOM);
}

/* Reusable helper functions */
 const showStories = async (idArray, storyArray, offset = 0, clearDOM = true) => {
    // Loop over array 25 times at the specified offset to retrieve individual stories
    for (let i = offset; i < (offset + 25) ; i++) {
        let id = idArray[i];
        let story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        let title = story.data.title;
        let url = story.data.url;
        storyArray.push([title, url]);
    }

    // Inject story content into the DOM
    buildDOM(storyArray, true);
}

const buildDOM = (array, clearDOM = true) => {
    
    let main = document.body.querySelector('main');
    
    if (clearDOM) {
        main.innerHTML = '';
    }
    
    // Creates necessary dom elements and populates values using function parameter
    array.forEach((story, i) => {

        let article = document.createElement('article');
        
        let rank = document.createElement('span');
        rank.className = "rank";
        rank.innerText = `${i + 1}. `;
        
        let link = document.createElement('a');
        link.innerText = story[0];
        link.setAttribute("href", story[1]);
        link.setAttribute("target", "_blank");

        main.appendChild(article);
        article.appendChild(rank);
        article.appendChild(link);
    });

    // Pagination is a work in progress. 
    let paginate = document.createElement('a');
    paginate.innerText = "Load more";
    main.appendChild(paginate);
    paginate.setAttribute("href", "#");
    paginate.setAttribute("id", "paginate");
    paginate.setAttribute("onClick", "getTopStories(25, true)")
}

/* Collapse header section into navbar on scroll */
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let img = document.getElementById("hero-image")
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementsByTagName('header')[0].style.paddingBottom = "0px"; 
        document.getElementById('hero-image').style.display = "none";
        document.getElementsByTagName('h2')[0].style.display = "none";
    }
}
