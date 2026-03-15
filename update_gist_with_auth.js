const axios = require('axios');

// 从现有 Gist 获取数据
const GITHUB_PAT = process.env.GITHUB_PAT || 'YOUR_GITHUB_PAT_HERE';
const GIST_ID = '6cfe392a7106292cdb6c0f542cd2c23d';

async function updateGistWithAuth() {
  try {
    // 1. 先获取现有数据
    const getResponse = await axios.get(`https://api.github.com/gists/${GIST_ID}`);
    const existingData = JSON.parse(getResponse.data.files['tiktok-data.json'].content);

    // 2. 添加 userinfo 字段
    existingData.userinfo = [
      {
        username: "tangmaokai",
        password: "19125880840"
      }
    ];

    // 3. 更新 Gist
    const headers = {
      'Authorization': `token ${GITHUB_PAT}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    const updateData = {
      description: 'My blog data - works, notes, travel records and user authentication',
      files: {
        'tiktok-data.json': {
          content: JSON.stringify(existingData, null, 2)
        }
      }
    };

    const updateResponse = await axios.patch(`https://api.github.com/gists/${GIST_ID}`, updateData, { headers });
    console.log('Gist 更新成功！');
    console.log('已添加 userinfo 数据结构');

  } catch (error) {
    console.error('更新失败:', error.response?.data || error.message);
  }
}

// 请设置环境变量 GITHUB_PAT 后运行此脚本
if (GITHUB_PAT === 'YOUR_GITHUB_PAT_HERE') {
  console.log('请设置环境变量 GITHUB_PAT 后运行此脚本');
} else {
  updateGistWithAuth();
}