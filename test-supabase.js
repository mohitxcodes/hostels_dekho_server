const fs = require('fs');
const env = fs.readFileSync('client/.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key) acc[key.trim()] = val.join('=').trim();
  return acc;
}, {});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.storage.from('hostels_dekho').list();
  if (data) {
     const folder = data.find(d => d.name && !d.name.includes('.'))?.name;
     if (folder) {
       const { data: folderData } = await supabase.storage.from('hostels_dekho').list(folder);
       console.log('Folder:', folder, folderData);
     } else {
       console.log('No folder found. Root data:', data);
     }
  } else {
    console.log('Error:', error);
  }
}
test();
