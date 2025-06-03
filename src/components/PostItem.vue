<template>
  <div
    class="border p-4 mb-4 cursor-pointer relative hover:-translate-y-1 active:scale-95 post-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
  >
    <!--Nếu đã tham gia sẽ hiện thị tích xanh -->
    <div v-if="post.joined" class="absolute top-2 right-2 text-green-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Thumbnail -->
    <div v-if="post.thumbnail" class="thumbnail-container h-48 overflow-hidden">
      <img
        :src="post.thumbnail"
        alt="Post thumbnail"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <!-- Nội dung -->
    <div class="p-5">
      <!-- Tiêu đề -->
      <h3 class="title text-xl font-bold text-gray-900 mb-2 line-clamp-2">{{ post.title }}</h3>

      <!-- Điểm thưởng và hạn chót -->
      <div class="challenge-info flex justify-between items-center mb-4">
        <div class="reward-points flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="font-semibold text-gray-800">{{ rewardText }}</span>
        </div>

        <div v-if="post.dueDate" class="due-date flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          <span>Expired: {{ formattedDueDate }}</span>
        </div>
      </div>

      <!-- Mô tả -->
      <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>

      <!-- Tác giả -->
      <div class="author-date flex items-center mb-4">
        <div class="author-avatar w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-3">
          <img :src="post.authorAvatar || 'https://i.pravatar.cc/150?img=3'" alt="Author avatar" class="w-full h-full object-cover" />
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
        v-if="showButton"
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
        status: 'active',
        requiresComment: false,
        commented: false
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

    formattedDueDate() {
      if (!this.post.dueDate) return '';
      const date = new Date(this.post.dueDate);
      return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    },

    buttonText() {
      if (this.post.requiresComment && !this.post.commented) {
        return 'Comment on this post';
      }
      if (this.post.status === 'done') {
        return 'View Details';
      }
      if (!this.post.joined) {
        return 'Join Challenge';
      }
      return 'View Progress';
    },

    buttonClass() {
      if (this.post.requiresComment && !this.post.commented) {
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      }
      if (this.post.status === 'done') {
        return 'bg-green-500 hover:bg-green-600 text-white';
      }
      if (!this.post.joined) {
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      }
      return 'bg-green-400 hover:bg-green-300 text-green-800';
    },

    showButton() {
      // Nếu chưa tham gia
      if (!this.post.joined) return true;

      // Nếu yêu cầu comment nhưng chưa comment
      if (this.post.requiresComment && !this.post.commented) return true;

      // Nếu đã hoàn thành
      if (this.post.status === 'done') return true;

      // Không cần hiện nút
      return false;
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
      if (this.post.requiresComment && !this.post.commented) {
        this.$router.push(`/comment/${this.post.id}`);
      } else if (this.post.status === 'done') {
        this.$router.push(`/post/${this.post.id}/detail`);
      } else if (!this.post.joined) {
      // Đánh dấu là đã tham gia
        this.post.joined = true;
        this.$emit('joined', this.post); // Nếu bạn muốn xử lý ở component cha
      } else {
        this.$emit('action', this.post);
      }
    }
  }
};
</script>

<style scoped>
.post-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
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
