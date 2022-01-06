// Declare these now and use later
const main = document.body.querySelector('main');
const topStories = [];
const newStories = [];
const bestStories = [];

// Data fetching
const getTopStories = async () => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    
    const topStoryIds = response.data;
    // Loop over array i # of times of ids and make individual API calls to retrieve data for each and add to new multidimensional array
    for (let i = 0; i < 25; i++) {
        let id = topStoryIds[i];
        let story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        let title = story.data.title;
        let url = story.data.url;
        topStories.push([title, url]);
    }

    // Inject story content into DOM
    topStories.forEach((story, i) => {
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

const getNewStories = async () => {
    const newStories = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    return newStories.data;
}

const getBestStories = async () => {
    const bestStories = await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty');
    return bestStories.data;
}







