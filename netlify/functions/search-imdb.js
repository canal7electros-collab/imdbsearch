const GOOGLE_API_KEY = 'AIzaSyD0UcPisJOdp9rz7-53W5f8QEz9zn3HT6I';
const GOOGLE_SEARCH_ENGINE_ID = 'a3ae42e8c4b144df8';
const APIFY_API_KEY = 'apify_api_aqUPfgOWbEaGSjRo9AtjZtwz2b8zf01y5nZ4';

exports.handler = async (event) => {
    const headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};
    if (event.httpMethod === 'OPTIONS') return {statusCode: 200, headers};
    if (event.httpMethod !== 'POST') return {statusCode: 405, headers, body: JSON.stringify({error: 'Method not allowed'})};

    try {
        const {action, query, personId} = JSON.parse(event.body);
        
        if (action === 'search') {
            const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query + ' site:imdb.com/name')}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}`;
            const res = await fetch(searchUrl);
            const data = await res.json();
            if (!data.items) return {statusCode: 404, headers, body: JSON.stringify({error: 'Not found'})};
            const match = data.items[0].link.match(/\/name\/(nm\d+)/);
            return {statusCode: 200, headers, body: JSON.stringify({id: match[1]})};
        } 
        else if (action === 'filmography') {
            const res = await fetch('https://api.apify.com/v2/acts/logiover~imdb-scraper/run-sync-get-dataset-items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: APIFY_API_KEY, mode: 'name', nameIds: [personId], maxResults: 500})
            });
            const data = await res.json();
            const films = [];
            data.forEach(item => {
                if (item.filmography) item.filmography.forEach(f => films.push({id: f.id, title: f.title||f.name, year: f.year}));
                if (item.knownFor) item.knownFor.forEach(f => !films.find(x => x.id === f.id) && films.push({id: f.id, title: f.title||f.name, year: f.year}));
            });
            return {statusCode: 200, headers, body: JSON.stringify(films)};
        }
    } catch (e) {
        return {statusCode: 500, headers, body: JSON.stringify({error: e.message})};
    }
};
