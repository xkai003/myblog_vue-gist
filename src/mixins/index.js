// src/composables/useGistData.js 共享功能
import axios from 'axios';
import { ref, onMounted } from 'vue'; // Vue3 组合式API必备

// -------------------------------------------------配置项（仅保留公开访问的配置）-------------------------------------------------
const GIST_ID = '6cfe392a7106292cdb6c0f542cd2c23d';            // 我的Gist ID
const GIST_FILENAME = 'myblog-vue.json';              // Gist 中 JSON 文件的名字

// Gist 公开原始文件地址（无需令牌即可访问）
const GIST_RAW_URL = `https://gist.githubusercontent.com/xkai003/${GIST_ID}/raw/${GIST_FILENAME}`;
// -------------------------------------------------配置项结束-------------------------------------------------

// Vue3 composables 必须导出函数（而非 Vue2 选项式对象）
export default function useGistData() {
  // 用 ref 定义响应式数据
  const travellist = ref([]);
  const noteslist = ref([]);
  const workslist = ref([]);
  const loading = ref(false); // 可选：添加加载状态
  const error = ref(null);    // 可选：添加错误状态

  // 1. 从 Gist 读取数据 (核心方法，仅访问公开地址)
  const fetchGistData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(GIST_RAW_URL);
      console.log("读取到的数据是：", response.data);
      
      // 赋值到响应式数组（兼容字段名：trave/travel）
      travellist.value = response.data.trave || response.data.travel || [];
      noteslist.value = response.data.notes || [];
      workslist.value = response.data.works || [];
    } catch (err) {
      console.error('读取 Gist 失败:', err);
      error.value = '读取数据失败，请稍后重试';
      // 重置为空数组
      travellist.value = [];
      noteslist.value = [];
      workslist.value = [];
    } finally {
      loading.value = false;
    }
  };

  // 组件挂载时自动加载数据
  onMounted(() => {
    fetchGistData();
  });

  // 暴露需要在组件中使用的变量和方法
  return {
    travellist,
    noteslist,
    workslist,
    loading,
    error,
    fetchGistData // 暴露方法，方便组件手动刷新数据
  };
}