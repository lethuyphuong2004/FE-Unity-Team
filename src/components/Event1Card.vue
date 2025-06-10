<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-start">
        <div class="bg-gray-100 rounded-lg p-3 text-center mr-4 min-w-[60px]">
          <div class="text-2xl font-bold text-gray-800">{{ day }}</div>
          <div class="text-sm text-gray-600 uppercase">{{ month }}</div>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
          <p class="text-gray-600">{{ time }}</p>
          <p class="text-sm text-gray-500 mt-1">Organized by: {{ organizer }}</p>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-lg font-semibold text-gray-700 mb-2">{{ formatPrice(price) }}</span>
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          :disabled="status !== 'open'"
          :class="{ 'opacity-50 cursor-not-allowed': status !== 'open' }"
        >
          {{ status === 'open' ? 'RSVP' : 'Closed' }}
        </button>
        <p class="text-sm text-gray-500 mt-2">
          {{ currentParticipants }}/{{ maxParticipants }} participants
        </p>
      </div>
    </div>

    <div class="mt-4">
      <div class="flex items-start">
        <div class="w-48 h-32 mr-4">
          <iframe
            :src="embedMapUrl"
            class="w-full h-full rounded shadow"
            frameborder="0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <h4 class="font-semibold text-gray-800 mb-2">{{ location }}</h4>
          <p class="text-gray-600">{{ address }}</p>
          <p class="text-gray-600 mt-2">{{ description }}</p>
          <a
            :href="mapUrl"
            target="_blank"
            class="text-blue-500 hover:text-blue-600 mt-2 inline-block transition-colors duration-300"
          >
            View Map
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

function formatPrice(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

const props = defineProps({
  id: Number,
  day: String,
  month: String,
  title: String,
  time: String,
  price: Number,
  location: String,
  address: String,
    mapUrl: {
    type: String,
    default: ''
  },
  organizer: String,
  description: String,
  maxParticipants: Number,
  currentParticipants: Number,
  status: {
    type: String,
    validator: (value) => ['open', 'closed'].includes(value),
    required: true
  }
});

// 👉 Tạo embed URL từ mapUrl (chứa link Google Maps dạng share)
const embedMapUrl = computed(() => {
  if (!props.mapUrl) return ''; // kiểm tra mapUrl có tồn tại
  const match = props.mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    const lat = match[1];
    const lng = match[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }
  return '';
});
</script>
