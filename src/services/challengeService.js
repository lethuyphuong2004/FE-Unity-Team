const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCommentChallenges() {
  try {
    const res = await fetch('https://virtserver.swaggerhub.com/copilothub/challenges123456789/1.0.0/api/challenges');
    if (!res.ok) throw new Error('Failed to load comment challenges');
    const data = await res.json();
    return (data.data || []).filter(ch => ch.type === 'comment');
  } catch (error) {
    throw { commentError: error.message };
  }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${BASE_URL}/events`);
    if (!res.ok) throw new Error('Failed to load events');
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    throw { eventError: error.message };
  }
}
