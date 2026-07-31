const APIFY_API_KEY = process.env.APIFY_API_KEY || 'apify_api_aqUPfgOWbEaGSjRo9AtjZtwz2b8zf01y5nZ4';
const APIFY_API_URL = 'https://api.apify.com/v2/acts/logiover~imdb-scraper/run-sync-get-dataset-items';

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { mode, query, searchType, nameIds, maxResults } = JSON.parse(event.body);

        const payload = {
            token: APIFY_API_KEY,
            mode: mode,
            maxResults: maxResults || 100
        };

        if (query) payload.query = query;
        if (searchType) payload.searchType = searchType;
        if (nameIds) payload.nameIds = nameIds;

        const response = await fetch(APIFY_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Apify API error: ${response.statusCode}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
