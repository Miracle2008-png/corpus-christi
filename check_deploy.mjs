import https from 'https';

const req = https.get('https://api.github.com/repos/Miracle2008-png/corpus-christi/deployments/5001076455/statuses', {
  headers: { 'User-Agent': 'node', 'Accept': 'application/json' }
}, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const j = JSON.parse(d);
    console.log('State:', j[0]?.state);
    console.log('Target URL:', j[0]?.target_url);
    console.log('Description:', j[0]?.description);
    console.log('Log URL:', j[0]?.log_url);
  });
});
req.end();
