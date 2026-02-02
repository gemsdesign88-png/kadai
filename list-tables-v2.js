const axios = require('axios');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

async function listTables() {
  console.log('Fetching OpenAPI definition from Supabase...');
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });

    const definitions = response.data.definitions;
    if (definitions) {
      console.log('Tables found in public schema:');
      Object.keys(definitions).forEach(table => {
        console.log(`- ${table}`);
      });
    } else {
      console.log('No definitions found in OpenAPI response.');
      // Fallback: try to check specific common names
    }
  } catch (error) {
    console.error('Error fetching schema:', error.message);
    if (error.response) {
       console.error('Response data:', error.response.data);
    }
  }
}

listTables();
