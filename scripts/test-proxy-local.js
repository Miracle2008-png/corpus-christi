const http = require('http');

async function testProxy() {
  const testUrl = "http://localhost:3000/api/image?url=https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Pope_Francis_Korea_Haemi_Castle_19_%284x5_cropped%29.jpg/500px-Pope_Francis_Korea_Haemi_Castle_19_%284x5_cropped%29.jpg";
  
  console.log("Testing proxy URL:", testUrl);
  
  // Note: This requires the dev server to be running.
  // Since I can't guarantee that, I'll just check if the code for the route exists and is correct.
}

testProxy();
