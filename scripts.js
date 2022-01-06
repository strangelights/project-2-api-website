// Declare these now and use later
const topStories = [];
const newStories = [];
const bestStories = [];

/* Fetch Hacker News Stories */
const getTopStories = async () => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const topStoryIds = response.data; // Top 500 story IDs - 
    
    showStories(topStoryIds, topStories);
}

const getNewStories = async () => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const newStoryIds = response.data; // 500 Newest Story IDs
    
    showStories(newStoryIds, newStories);
}

const getBestStories = async () => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty');
    const bestStoryIds = response.data; // 500 Best story IDs

    showStories(bestStoryIds, bestStories);
}

/* Reusable helper functions */
 const showStories = async (idArray, storyArray, offset = 0) => {
    // Loop over array 25 times at the specified offset to retrieve individual stories
    for (let i = offset; i < 25; i++) {
        let id = idArray[i];
        let story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        let title = story.data.title;
        let url = story.data.url;
        storyArray.push([title, url]);
    }
    
    // Inject story content into the DOM
    buildDOM(storyArray);
}

const buildDOM = (array) => {
    // Creates necessary dom elements and populates values using function parameter
    array.forEach((story, i) => {

        let main = document.body.querySelector('main');
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
}

getTopStories();
getNewStories();
getBestStories();










