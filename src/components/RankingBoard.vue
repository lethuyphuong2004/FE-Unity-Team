<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div v-if="error" class="text-red-600 bg-red-50 p-4 rounded-lg mb-6 shadow-md">
      {{ error }}
    </div>
    
    <div v-else-if="loading" class="text-center py-10">
      <p class="text-gray-900 text-lg font-medium">Đang tải dữ liệu bảng xếp hạng...</p>
    </div>
    
    <div v-else class="my-8 w-full bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
      <div class="p-4 sm:p-6 lg:p-8 overflow-x-auto">
        <div class="max-h-[400px] overflow-y-auto rounded-xl border border-gray-200">
          <table class="min-w-[1000px] w-full border-collapse text-center">
            <thead class="sticky top-0 bg-black text-white z-10">
              <tr>
                <th class="border border-gray-300 p-3 sm:p-4 w-[7%] text-sm sm:text-base font-semibold">Xếp hạng</th>
                <th class="border border-gray-300 p-3 sm:p-4 w-[10%] text-sm sm:text-base font-semibold">Avatar</th>
                <th class="border border-gray-300 p-3 sm:p-4 w-[38%] text-sm sm:text-base font-semibold">Tên</th>
                <th class="border border-gray-300 p-3 sm:p-4 w-[25%] text-sm sm:text-base font-semibold">Level</th>
                <th class="border border-gray-300 p-3 sm:p-4 w-[20%] text-sm sm:text-base font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in displayedRankingData"
                :key="user.memberID"
                :class="[
                  user.memberID === currentUser?.memberID
                    ? 'bg-red-50 border-l-4 border-red-600 font-bold sticky top-12 z-20'
                    : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50'),
                  'hover:bg-red-100 transition-colors duration-200'
                ]"
              >
                <td class="border border-gray-200 p-3 sm:p-4">
                  <div
                    :class="[
                      'rounded-full w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center mx-auto text-sm font-bold',
                      index === 0
                        ? 'bg-red-600 text-white'
                        : index === 1
                        ? 'bg-black text-white'
                        : index === 2
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="border border-gray-200 p-3 sm:p-4 relative">
                  <img
                    :src="user.avtURL"
                    alt="avatar"
                    :class="[
                      'w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-full mx-auto shadow-md transition-transform duration-200 hover:scale-110',
                      user.memberID === currentUser?.memberID
                        ? 'border-3 border-red-600'
                        : 'border-2 border-gray-300'
                    ]"
                    loading="lazy"
                  />
                  <div
                    v-if="user.memberID === currentUser?.memberID"
                    class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </td>
                <td class="border border-gray-200 p-3 sm:p-4 text-left pl-5 sm:pl-6">
                  <div
                    :class="[
                      'font-semibold text-base sm:text-lg',
                      user.memberID === currentUser?.memberID ? 'text-red-600' : 'text-gray-900'
                    ]"
                  >
                    {{ user.name }}
                  </div>
                </td>
                <td class="border border-gray-200 p-3 sm:p-4">
                  <div class="flex flex-col items-center">
                    <div
                      :class="[
                        user.memberID === currentUser?.memberID ? 'text-red-600 font-bold' : 'text-gray-900 font-semibold',
                        'text-base sm:text-lg'
                      ]"
                    >
                      Level {{ user.level }}
                    </div>
                    <div class="text-sm text-gray-600 mt-1">
                      Cần {{ user.pointsToNextLevel }} pts để lên Level {{ user.level + 1 }}
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        class="h-2 rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                        :style="{ width: calculateLevelProgress(user) + '%' }"

                      ></div>
                    </div>
                  </div>
                </td>
                <td
                  class="border border-gray-200 p-3 sm:p-4 font-bold text-base sm:text-lg"
                  :class="user.memberID === currentUser?.memberID ? 'text-red-600' : 'text-gray-900'"
                >
                  {{ user.points }}
                  <span :class="user.memberID === currentUser?.memberID ? 'text-red-500' : 'text-gray-700'" class="text-sm">
                    pts
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const rankingData = ref([]);
const loading = ref(true);
const error = ref(null);
// Giả lập user hiện tại
const currentUserID = 1;

onMounted(async () => {
  try {
    const response = await fetch('https://virtserver.swaggerhub.com/404-Found/API_USER/1.0.0/api/users/alluser');
    if (!response.ok) throw new Error('Không thể tải dữ liệu.');
    const result = await response.json();
    
      if (result.data) {
    rankingData.value = result.data.map(user => ({
      memberID: user.community_member_id,
      name: user.ten_community_members || `${user.first_name} ${user.last_name}`.trim(),
      avtURL: user.avatar_url && user.avatar_url !== 'string' ? user.avatar_url : 'https://i.pravatar.cc/300',
      level: parseInt(user.current_level_name.replace('Level ', '')) || 1,
      points: user.total_points,
      pointsToNextLevel: user.points_to_next_level
      }));
    }
    loading.value = false;
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
    error.value = 'Không thể tải dữ liệu người dùng';
    loading.value = false;
  }
});

const sortedRankingData = computed(() =>
  [...rankingData.value].sort((a, b) => b.points - a.points)
);

const currentUser = computed(() =>
  sortedRankingData.value.find(user => user.memberID === currentUserID) || null
);

const displayedRankingData = computed(() => {
  const index = sortedRankingData.value.findIndex(user => user.memberID === currentUserID);
  if (index === -1) return [];

  const start = Math.max(0, index - 3);
  const end = Math.min(sortedRankingData.value.length, index + 4);
  return sortedRankingData.value.slice(start, end);
});



const calculateLevelProgress = (user) => {
  const gained = user.points;
  const needed = user.pointsToNextLevel;

  if (!gained || !needed || gained >= needed) return 100;
  return Math.floor((gained / needed) * 100);
};


</script>

<style scoped>

</style>