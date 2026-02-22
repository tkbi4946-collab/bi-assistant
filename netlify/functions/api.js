const API_URL = 'https://sim.ai/api/workflows/c63a2d64-d6b1-4b40-9057-f350d5b2b075/execute';
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
                'x-api-key': API_KEY
            },
            body: event.body
        });
        const text = await response.text();
        // Log for debugging
        console.log('API Response Status:', response.status);
        console.log('API Response:', text.substring(0, 500));
        // Try to parse as JSON, return error if HTML
        try {
            const data = JSON.parse(text);
            return { statusCode: 200, headers, body: JSON.stringify(data) };
        } catch (parseError) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'Invalid response from API',
                    details: text.substring(0, 200)
                })
            };
        }
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }
};
