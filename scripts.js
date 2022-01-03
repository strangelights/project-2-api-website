// Data fetching
const getTopStories = async () => {
    const topStories = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    console.log(topStories.data);
}

const getNewStories = async () => {
    const newStories = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    console.log(newStories.data);
}

const getBestStories = async () => {
    const bestStories = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    console.log(bestStories.data);
}

getTopStories();
getNewStories();
getBestStories();