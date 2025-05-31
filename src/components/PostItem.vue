<template>
  <div class="border p-4 mb-4  cursor-pointer relative hover:-translate-y-1 active:scale-95 post-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
    <!-- Thumbnail -->
    <div v-if="post.thumbnail" class="thumbnail-container h-48 overflow-hidden">
      <img 
        :src="post.thumbnail" 
        alt="Post thumbnail"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105 "
      />
    </div>
    
    <!-- Content -->
    <div class=" p-5">
      <!-- Tiêu đề -->
      <h3 class="title text-xl font-bold text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h3>
     
      <!-- Thông tin điểm thưởng và hạn chót -->
      <div class="challenge-info flex justify-between items-center mb-4">
        <!-- Điểm thưởng -->
        <div class="reward-points flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="font-semibold text-gray-800">{{ rewardText }}</span>
        </div>
        
        <!-- Hạn chót -->
        <div v-if="post.dueDate" class="due-date flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          <span>Expired: {{ formattedDueDate }}</span>
        </div>
      </div>
      
      <!-- Mô tả ngắn -->
      <p class=" text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
      
      <!-- Tác giả & thời gian -->
      <div class="author-date flex items-center mb-4">
        <div class="author-avatar w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-3">
          <img 
            :src="post.authorAvatar || 'https://i.pravatar.cc/150?img=3'" 
            alt="Author avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <div class="author-name font-medium text-gray-900">{{ post.author }}</div>
          <div class="post-date text-xs text-gray-500">{{ formatDate(post.createdAt) }}</div>
        </div>
      </div>
      
      <!-- Tags -->
      <div class="tags flex flex-wrap gap-2 mb-4">
        <span 
          v-for="(tag, index) in post.tags" 
          :key="index"
          class="tag bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
        >
          #{{ tag }}
        </span>
      </div>
      
      <!-- Nút hành động -->
      <button 
        class="action-button w-full py-2 px-4 rounded-lg font-medium transition"
        :class="buttonClass"
        @click.stop="handleAction"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        title: 'Post Title',
        excerpt: 'Post excerpt goes here...',
        author: 'Author Name',
        authorAvatar: '',
        createdAt: new Date().toISOString(),
        tags: ['design', 'mindset'],
        thumbnail: '',
        reward: { type: 'points', value: 100 },
        joined: false,
        status: 'active' // active, done
      })
    }
  },
  computed: {
    rewardText() {
      if (this.post.reward?.type === 'points') {
        return `${this.post.reward.value} Point`;
      }
      return this.post.reward?.type === 'voucher' ? 'Voucher' : '';
    },

    buttonText() {
      if (this.post.status === 'done') return 'View Details';
      return this.post.joined ? 'View Progress' : 'Join Challenge';
    },
    buttonClass() {
      if (this.post.status === 'done') {
        return 'bg-green-500 hover:bg-green-600 text-white';
      }
      return this.post.joined 
        ? 'bg-green-400 hover:bg-green-300 text-green-800' 
        : 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    },
    handleAction() {
      if (this.post.status === 'done') {
        this.$router.push(`/post/${this.post.id}/detail`);
      } else {
        this.$emit('action', this.post);
      }
    }
  }
}
</script>

<style scoped>
.post-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
}

.thumbnail-container {
  border-bottom: 1px solid #f0f0f0;
}

.title {
  min-height: 3rem;
}

.excerpt {
  min-height: 4.5rem;
}

.tags {
  min-height: 1.75rem;
}

.action-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>