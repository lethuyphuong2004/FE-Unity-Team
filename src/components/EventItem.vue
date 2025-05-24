<template>
  <!-- Skeleton loading khi chờ dữ liệu -->
  <div v-if="loading" class="event-item-skeleton">
    <div class="skeleton-line" style="width: 70%"></div>
    <div class="skeleton-line" style="width: 50%"></div>
    <div class="skeleton-line" style="width: 60%"></div>
  </div>

  <!-- Component chính khi có dữ liệu -->
  <div 
    v-else
    class="event-item" 
    :class="{ 
      'completed': status === 'done',
      'joined': joined
    }"
    @click="handleItemClick"
  >
    <div class="event-header">
      <h3 class="event-title">{{ title }}</h3>
      <div class="event-meta">
        <!-- Trạng thái hoàn thành -->
        <span class="event-status" v-if="status === 'done'">
          <i class="icon-check"></i> Đã hoàn thành
        </span>
        <span class="event-due-date" v-else-if="dueDate">
          <i class="icon-clock"></i> Hạn: {{ formattedDueDate }}
        </span>
      </div>
    </div>
    
    <div class="event-content">
      <!-- Phần thưởng -->
      <div class="event-reward">
        <span v-if="rewardType === 'points'">
          <i class="icon-star"></i> {{ rewardValue }} điểm
        </span>
        <span v-else>
          <i class="icon-gift"></i> Voucher
        </span>
      </div>

      <!-- Trạng thái tham gia event -->
      <div class="event-joined" v-if="joined !== undefined">
        <span v-if="joined">✅ Đã tham gia</span>
        <span v-else class="not-joined">Chưa tham gia</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    title: {
      type: String,
      required: true
    },
    reward: {
      type: Object,
      required: true,
      validator: value => {
        return ('type' in value && ['points', 'voucher'].includes(value.type)) && 
               (value.type !== 'points' || 'value' in value)
      }
    },
    dueDate: {
      type: [String, Date],
      default: null
    },
    status: {
      type: String,
      default: 'pending',
      validator: value => ['pending', 'done'].includes(value)
    },
    joined: {
      type: Boolean,
      default: undefined
    },
    postId: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rewardType() {
      return this.reward.type
    },
    rewardValue() {
      return this.reward.value || 0
    },
    formattedDueDate() {
      if (!this.dueDate) return ''
      const date = new Date(this.dueDate)
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  methods: {
    handleItemClick() {
      if (this.postId) {
        this.$router.push(`/post/${this.postId}/comment`)
      }
    }
  }
}
</script>

<style scoped>
/* Base styles */
.event-item {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.event-item:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
  border-color: #cbd5e0;
}

.event-item:active {
  transform: scale(0.98);
}

.event-item.completed {
  opacity: 0.8;
  background-color: #f8f9fa;
}

.event-item.joined {
  border-left: 4px solid #38a169;
}

.event-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.event-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
}

.event-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-meta {
  display: flex;
  align-items: center;
}

.event-status,
.event-due-date {
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
}

.event-status {
  color: #38a169;
}

.event-due-date {
  color: #e53e3e;
}

.event-reward {
  font-size: 0.875rem;
  color: #dd6b20;
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background-color: #fffaf0;
  border-radius: 4px;
}

.event-joined {
  font-size: 0.875rem;
  color: #38a169;
}

.event-joined .not-joined {
  color: #a0aec0;
}

/* Icons */
.icon-check,
.icon-clock,
.icon-star,
.icon-gift {
  margin-right: 6px;
  font-size: 0.9rem;
}

/* Skeleton loading */
.event-item-skeleton {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #ffffff;
}

.skeleton-line {
  height: 14px;
  background-color: #edf2f7;
  border-radius: 4px;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive styles */
@media (min-width: 640px) {
  .event-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .event-title {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
}

@media (min-width: 768px) {
  .event-item {
    padding: 20px;
  }
  
  .event-title {
    font-size: 1.2rem;
  }
  
  .event-status,
  .event-due-date,
  .event-reward,
  .event-joined {
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .event-item {
    padding: 24px;
    margin-bottom: 20px;
  }
}
</style>