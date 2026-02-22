const API_URL = 'https://www.sim.ai/api/workflows/c63a2d64-d6b1-4b40-9057-f350d5b2b075/run';
const API_KEY = 'sk-sim--9bVDYAWK8w_bOTLguhI3VZ0qsRUGa-n';
exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: event.body
        });
        const data = await response.json();
        return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }
};
