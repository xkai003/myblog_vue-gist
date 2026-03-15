// src/views/composables/useGistData.js
import axios from 'axios';
import { ref, onMounted } from 'vue';

const GIST_ID = '6cfe392a7106292cdb6c0f542cd2c23d';
const GIST_FILENAME = 'myblog-vue.json';
const GIST_RAW_URL = `https://gist.githubusercontent.com/xkai003/${GIST_ID}/raw/${GIST_FILENAME}`;

export default function useGistData() {
  const travellist = ref([]);
  const noteslist = ref([]);
  const workslist = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchGistData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(GIST_RAW_URL);
      travellist.value = response.data.trave || response.data.travel || [];
      noteslist.value = response.data.notes || [];
      workslist.value = response.data.works || [];
    } catch (err) {
      error.value = '读取数据失败，请稍后重试';
      travellist.value = [];
      noteslist.value = [];
      workslist.value = [];
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchGistData();
  });

  return {
    travellist,
    noteslist,
    workslist,
    loading,
    error,
    fetchGistData
  };
}