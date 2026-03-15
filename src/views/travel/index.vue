<template>
    <div class="body">
        <div class="travel-container">
        <div class="header">
            <h1>旅行足迹</h1>
            <p>世界那么大，我想去看看</p>
        </div>

        <div class="travel-stats">
            <div class="stat-item">
                <span class="stat-number">12</span>
                <span class="stat-label">城市</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">8</span>
                <span class="stat-label">省份</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">3</span>
                <span class="stat-label">国家</span>
            </div>
        </div>

        <div class="travel-grid">
            <div class="travel-card" v-for="place in travellist" :key="place.id">
                <div class="place-image">
                    <img :src="place.image" :alt="place.name">
                </div>
                <div class="place-info">
                    <h3>{{ place.name }}</h3>
                    <p class="location">{{ place.location }}</p>
                    <p class="date">{{ place.date }}</p>
                    <p class="description">{{ place.description }}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
// 1. 导入创建的 mixin 共享功能配置文件
import gistDataMixin from '../../mixins/index'; 
// 1. 必须导入 axios
import axios from 'axios';
export default {
    data() {
        return {
            travellist: [], // 存储 Gist 读取的 travel 数据
            itemsPerPage: 4, // 一页显示4条
            vueCurrentPage: 1, // 当前页码
            staticCurrentPage: 1,
            searchQuery: '', // 搜索关键词
            StaticWebList: [], // 兼容原有静态数据逻辑
        }
    },
    created() {
        this.fetchGistData();
    },
    computed: {
        // 搜索数据
        filteredVueWebList() {
            if (!this.travellist || !Array.isArray(this.travellist)) {
                return [];
            }
            const query = this.searchQuery.toLowerCase();
            return this.travellist.filter(item => {
                return (
                    item.title.toLowerCase().includes(query) ||
                    item.technology.toLowerCase().includes(query) ||
                    (item.api && item.api.toLowerCase().includes(query)) || // Check if api exists before using includes
                    (item.wb_p1 && item.wb_p1.toLowerCase().includes(query)) ||
                    (item.wb_p2 && item.wb_p2.toLowerCase().includes(query)) ||
                    (item.wb_p3 && item.wb_p3.toLowerCase().includes(query)) ||
                    (item.wb_p4 && item.wb_p4.toLowerCase().includes(query)) ||
                    (item.wb_p5 && item.wb_p5.toLowerCase().includes(query)) ||
                    (item.wb_p6 && item.wb_p6.toLowerCase().includes(query)) ||
                    (item.wb_p7 && item.wb_p7.toLowerCase().includes(query))||
                    (item.wb_p8 && item.wb_p8.toLowerCase().includes(query))||
                    (item.wb_p9 && item.wb_p9.toLowerCase().includes(query))
                );
            });
        },
        // vueTotalPages：计算属性的名称，表示 "Vue 总页数"
        // this.VueWebList.length：获取 Vue 项目列表的数组长度（即有多少个项目）
        // this.itemsPerPage：每页显示的项目数量（在你的代码中是 4）
        // Math.ceil()：JavaScript 内置函数，向上取整
        // 计算示例
        // 假设你的 Vue 项目列表有：

        // 5 个项目 (VueWebList.length = 5)
        // 每页显示 4 个 (itemsPerPage = 4)
        // 计算过程：

        // <JAVASCRIPT>
        // 5 / 4 = 1.25
        // Math.ceil(1.25) = 2
        // 结果：需要 2 页
        vueTotalPages() {
            return Math.ceil(this.filteredVueWebList.length  / this.itemsPerPage);
        },
        
        staticTotalPages() {
            return Math.ceil(this.StaticWebList.length / this.itemsPerPage);
        },
        displayedVueWebList() {
            const start = (this.vueCurrentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredVueWebList.slice(start, end); // Use filtered list
        },
    },
    methods: {
         async fetchGistData() {
            try {
                // Gist 公开原始地址
                const gistUrl = 'https://gist.githubusercontent.com/xkai003/6cfe392a7106292cdb6c0f542cd2c23d/raw/96baaceae54de33cad687065d36fc136ea878946/myblog-vue';
                const response = await axios.get(gistUrl);
                console.log("读取到的数据是：", response.data.travel);
                // 赋值到 travellist（与计算属性中的变量名匹配）
                this.travellist = response.data.travel || [];
            } catch (error) {
                console.error('读取 Gist 失败:', error);
                this.travellist = []; // 出错时重置数据
            }
        },
        // 上下页切换动作
        changeVuePage(page) {
            this.vueCurrentPage = page;
            // 最小只能翻到第一页
            if(this.vueCurrentPage < 1){
                alert("已经是第一页了")
                return this.vueCurrentPage = 1
            }
            // 最大只能翻到最后一页
            if(this.vueCurrentPage > this.vueTotalPages){
                alert("已经是最后一页了")
                this.vueCurrentPage = this.vueTotalPages
            }
        },
    }
}
</script>

<style scoped>
.body{
    width: 100%;
    /* 方格背景 */
    background: linear-gradient(90deg, rgba(200, 200, 200, 0.1) 3%, transparent 0),
    linear-gradient(rgba(200, 200, 200, 0.1) 3%, transparent 0);
    background-size: 20px 20px;
}
.travel-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header h1 {
    color: #333;
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.header p {
    color: #666;
    font-size: 1.2rem;
}

.travel-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-bottom: 40px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: bold;
    color: #1976d2;
}

.stat-label {
    font-size: 1rem;
    color: #666;
}

.travel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.travel-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.travel-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.place-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.place-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.travel-card:hover .place-image img {
    transform: scale(1.05);
}

.place-info {
    padding: 20px;
}

.place-info h3 {
    color: #333;
    font-size: 1.5rem;
    margin: 0 0 5px 0;
}

.location {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 5px 0;
}

.date {
    color: #888;
    font-size: 0.8rem;
    margin: 0 0 15px 0;
}

.description {
    color: #555;
    line-height: 1.6;
    margin: 0;
}
</style>