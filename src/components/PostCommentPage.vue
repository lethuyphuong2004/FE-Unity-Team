<template>
  <div class="post-comment-page">
    <!-- Header -->
    <div class="post-header">
      <button @click="goBack" class="back-button">
        &larr; Quay lại
      </button>
      <h2>Bình luận bài viết #{{ postId }}</h2>
    </div>

    <!-- Post Content -->
    <div class="post-content" v-if="!loading">
      <EventItem
        :title="post.title"
        :reward="post.reward"
        :dueDate="post.dueDate"
        :status="post.status"
        :joined="post.joined"
        :loading="false"
      />
    </div>

    <!-- Loading Skeleton -->
    <div v-else class="loading-skeleton">
      <div class="skeleton-post"></div>
    </div>

    <!-- Comment Section -->
    <div class="comment-section">
      <h3>Bình luận ({{ comments.length }})</h3>
      
      <!-- Comment List -->
      <div class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-avatar">
            <img :src="comment.avatar" alt="Avatar" />
          </div>
          <div class="comment-content">
            <div class="comment-author">{{ comment.author }}</div>
            <div class="comment-text">{{ comment.text }}</div>
            <div class="comment-time">{{ formatTime(comment.time) }}</div>
          </div>
        </div>
      </div>

      <!-- Add Comment -->
      <div class="add-comment">
        <textarea
          v-model="newComment"
          placeholder="Viết bình luận..."
          rows="3"
        ></textarea>
        <button @click="submitComment" class="submit-button">
          Gửi bình luận
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/EventItem.vue'

export default {
  name: 'PostComment',
  components: {
    EventItem
  },
  props: {
    postId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: true,
      post: {},
      comments: [],
      newComment: '',
      // Mock data
      mockPosts: {
        1: {
          id: 1,
          title: "Sự kiện tháng 6 - Đăng bài hàng tuần",
          reward: { type: 'points', value: 100 },
          dueDate: '2024-06-30T23:59:59',
          status: 'pending',
          joined: true
        },
        2: {
          id: 2,
          title: "Thử thách comment tích cực",
          reward: { type: 'voucher' },
          dueDate: '2024-06-15T18:00:00',
          status: 'done',
          joined: false
        }
      },
      mockComments: {
        1: [
          {
            id: 1,
            author: "Nguyễn Văn A",
            avatar: "https://i.pravatar.cc/150?img=1",
            text: "Sự kiện này rất thú vị, mình đã tham gia!",
            time: "2024-05-20T10:30:00"
          },
          {
            id: 2,
            author: "Trần Thị B",
            avatar: "https://i.pravatar.cc/150?img=2",
            text: "Khi nào có kết quả vậy mọi người?",
            time: "2024-05-20T11:45:00"
          }
        ],
        2: [
          {
            id: 3,
            author: "Lê Văn C",
            avatar: "https://i.pravatar.cc/150?img=3",
            text: "Thử thách này dễ quá!",
            time: "2024-05-18T09:15:00"
          }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // Mock API fetch
    fetchData() {
      this.loading = true
      
      // Simulate API call
      setTimeout(() => {
        this.post = this.mockPosts[this.postId] || {}
        this.comments = this.mockComments[this.postId] || []
        this.loading = false
      }, 800)
    },
    
    // Format time
    formatTime(timeString) {
      const date = new Date(timeString)
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    // Submit new comment
    submitComment() {
      if (this.newComment.trim()) {
        const newComment = {
          id: Date.now(),
          author: "Bạn",
          avatar: "https://i.pravatar.cc/150?img=5",
          text: this.newComment,
          time: new Date().toISOString()
        }
        
        this.comments.unshift(newComment)
        this.newComment = ''
        
        // call API thuc tế ở đây
        // 
      }
    },
    
    // Navigation
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.post-comment-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
}

.post-header h2 {
  flex: 1;
  text-align: center;
}

.back-button {
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  position: absolute;
  left: 0;
}

.post-content {
  margin-bottom: 32px;
}

.comment-section {
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
}

.comment-section h3 {
  margin-bottom: 16px;
  font-size: 18px;
}

.comment-list {
  margin-bottom: 24px;
}

.comment-item {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #edf2f7;
}

.comment-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-author {
  font-weight: 600;
  margin-bottom: 4px;
}

.comment-text {
  margin-bottom: 4px;
  line-height: 1.5;
}

.comment-time {
  font-size: 12px;
  color: #718096;
}

.add-comment {
  margin-top: 24px;
}

.add-comment textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
  resize: vertical;
}

.submit-button {
  background-color: #4299e1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #3182ce;
}

/* Loading Skeleton */
.loading-skeleton {
  margin-bottom: 32px;
}

.skeleton-post {
  height: 120px;
  background-color: #edf2f7;
  border-radius: 12px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 600px) {
  .post-comment-page {
    padding: 15px;
  }
  
  .post-header h2 {
    font-size: 18px;
    padding-right: 60px;
  }
}
</style>