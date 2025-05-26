<template>
  <!-- Skeleton loading khi chờ dữ liệu -->
  <div v-if="loading" class="border border-gray-200 rounded-xl p-4 mb-4 bg-white">
    <div class="h-3 bg-gray-200 rounded mb-2 w-[70%] animate-pulse"></div>
    <div class="h-3 bg-gray-200 rounded mb-2 w-[50%] animate-pulse"></div>
    <div class="h-3 bg-gray-200 rounded w-[60%] animate-pulse"></div>
  </div>

  <!-- Component chính khi có dữ liệu -->
  <div
    v-else
    class="border rounded-xl p-4 mb-4 bg-white transition-all duration-300 cursor-pointer relative overflow-hidden hover:shadow-lg hover:-translate-y-1 active:scale-95"
    :class="{
      'opacity-80 bg-gray-100': status === 'done',
      'border-l-4 border-green-500': joined
    }"
    @click="handleItemClick"
  >
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
      <h3 class="text-gray-800 font-semibold text-base sm:text-lg leading-snug">{{ title }}</h3>
      <div class="flex items-center text-sm">
        <span v-if="status === 'done'" class="text-green-600 flex items-center">
          <i class="icon-check mr-1"></i> Completed
        </span>
        <span v-else-if="dueDate" class="text-red-600 flex items-center">
          <i class="icon-clock mr-1"></i> Expired: {{ formattedDueDate }}
        </span>
      </div>
    </div>

    <div class="flex justify-between items-center text-sm sm:text-base">
      <!-- Phần thưởng -->
      <div class="text-orange-600 flex items-center px-2 py-1 bg-orange-50 rounded">
        <i :class="rewardType === 'points' ? 'icon-star' : 'icon-gift'" class="mr-1"></i>
        <span>{{ rewardType === 'points' ? rewardValue + ' Point' : 'Voucher' }}</span>
      </div>

      <!-- Trạng thái tham gia -->
      <div v-if="joined !== undefined">
        <span v-if="joined" class="text-green-600 flex items-center">
          <i class="fas fa-check mr-1 text-green-600"></i> Participated
        </span>
        <span v-else class="text-gray-400">Not Participated</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    title: { type: String, required: true },
    reward: {
      type: Object,
      required: true,
      validator: value => {
        return (
          'type' in value &&
          ['points', 'voucher'].includes(value.type) &&
          (value.type !== 'points' || 'value' in value)
        )
      }
    },
    dueDate: { type: [String, Date], default: null },
    status: {
      type: String,
      default: 'pending',
      validator: value => ['pending', 'done'].includes(value)
    },
    joined: { type: Boolean, default: undefined },
    postId: { type: [String, Number], default: null },
    loading: { type: Boolean, default: false }
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
