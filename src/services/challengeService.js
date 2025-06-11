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
    const res = await fetch('https://virtserver.swaggerhub.com/yuu-e71/event-api/1.0.0/events');
    if (!res.ok) throw new Error('Failed to load events');
    const data = await res.json();
    return Array.isArray(data) ? data : data.events || [];
  } catch (error) {
    throw { eventError: error.message };
  }
}
