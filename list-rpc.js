
const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

async function listRpcFunctions() {
  console.log('Fetching OpenAPI definition from Supabase...');
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const paths = data.paths;
    if (paths) {
      console.log('RPC Functions found:');
      const rpcs = Object.keys(paths).filter(path => path.startsWith('/rpc/')).sort();
      rpcs.forEach(rpc => {
        console.log(`- ${rpc}`);
      });
    } else {
      console.log('No paths found in OpenAPI response.');
    }
  } catch (error) {
    console.error('Error fetching schema:', error.message);
  }
}

listRpcFunctions();
