<template>
  <div>
    <div class="my-6 w-full bg-white rounded-xl shadow-lg">

      <div class="p-3 sm:p-4 lg:p-5 overflow-x-auto">
        <div class="max-h-[360px] overflow-y-auto rounded-b-xl border border-gray-200">
          <table class="min-w-[1000px] w-full border-collapse border border-gray-200 text-center">
            <thead class="sticky top-0 bg-gray-900 text-white z-10">
              <tr>
                <th class="border border-gray-300 p-2 sm:p-3 w-auto sm:w-[7%] text-sm sm:text-base">Xếp hạng</th>
                <th class="border border-gray-300 p-2 sm:p-3 w-auto sm:w-[10%] text-sm sm:text-base">Avatar</th>
                <th class="border border-gray-300 p-2 sm:p-3 w-auto sm:w-[38%] text-sm sm:text-base">Tên</th>
                <th class="border border-gray-300 p-2 sm:p-3 w-auto sm:w-[25%] text-sm sm:text-base">Level</th>
                <th class="border border-gray-300 p-2 sm:p-3 w-auto sm:w-[25%] text-sm sm:text-base">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in sortedRankingData"
                :key="user.memberID"
                :class="[
                  user.memberID === currentUser?.memberID
                    ? 'bg-red-50 border-l-4 border-red-600 font-bold sticky top-12 z-20'
                    : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50'),
                  'hover:bg-red-50 transition-colors'
                ]"
              >
                <td class="border border-gray-200 p-2 sm:p-3">
                  <div
                    :class="[
                      'rounded-full w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center mx-auto',
                      index === 0
                        ? 'bg-red-600 text-white'
                        : index === 1
                        ? 'bg-gray-900 text-white'
                        : index === 2
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="border border-gray-200 p-2 sm:p-3 relative">
                  <img
                    :src="user.avtURL"
                    alt="avatar"
                    :class="[
                      'w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full mx-auto shadow-sm',
                      user.memberID === currentUser?.memberID
                        ? 'border-3 border-red-600'
                        : 'border-2 border-gray-300'
                    ]"
                    loading="lazy"
                  />
                  <div
                    v-if="user.memberID === currentUser?.memberID"
                    class="absolute -top-1 -right-1 bg-red-600 text-white text-xs sm:text-sm rounded-full w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </td>
                <td class="border border-gray-200 p-2 sm:p-3 text-left pl-4 sm:pl-5">
                  <div
                    :class="[
                      'font-semibold text-sm sm:text-base',
                      user.memberID === currentUser?.memberID ? 'text-red-600' : 'text-gray-900'
                    ]"
                  >
                    {{ user.name }}
                  </div>
                </td>
                <td class="border border-gray-200 p-2 sm:p-3">
                  <div class="flex flex-col items-center">
                    <div
                      :class="[
                        user.memberID === currentUser?.memberID ? 'text-red-600 font-bold' : 'text-gray-900 font-semibold',
                        'text-sm sm:text-base'
                      ]"
                    >
                      Level {{ user.level }}
                    </div>
                    <div class="text-xs sm:text-sm text-gray-600 mt-1">
                      Cần {{ calculateNextLevelPoints(user.level) }} pts để lên Level {{ user.level + 1 }}
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        class="h-1.5 rounded-full"
                        :class="user.memberID === currentUser?.memberID ? 'bg-red-600' : 'bg-gray-900'"
                        :style="{ width: calculateLevelProgress(user.points, user.level) + '%' }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td
                  class="border border-gray-200 p-2 sm:p-3 font-bold text-sm sm:text-base"
                  :class="user.memberID === currentUser?.memberID ? 'text-red-600' : 'text-gray-900'"
                >
                  {{ user.points }}
                  <span :class="user.memberID === currentUser?.memberID ? 'text-red-500' : 'text-gray-700'" class="text-xs sm:text-sm">
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

onMounted(async () => {
  try {
    const response = await fetch('/about.json');
    if (!response.ok) throw new Error('Không thể tải dữ liệu.');
    rankingData.value = await response.json();
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
  }
});

const sortedRankingData = computed(() =>
  [...rankingData.value].sort((a, b) => b.points - a.points)
);

const currentUser = computed(() => {
  return sortedRankingData.value.length > 1 ? sortedRankingData.value[1] : null;
});

const calculateNextLevelPoints = (currentLevel) => {
  return (currentLevel + 1) * 100;
};

const calculateLevelProgress = (currentPoints, currentLevel) => {
  const nextLevelPoints = calculateNextLevelPoints(currentLevel);
  const currentLevelPoints = currentLevel * 100;
  const pointsNeeded = nextLevelPoints - currentLevelPoints;
  const pointsGained = currentPoints - currentLevelPoints;
  const percentage = Math.min(Math.floor((pointsGained / pointsNeeded) * 100), 100);
  return percentage;
};
</script>

<style scoped>

</style>
