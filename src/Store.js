import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: JSON.parse(localStorage.getItem('posts')) || [
      {
        id: 1,
        author: "Alice Johnson",
        date: "2024-09-22T10:45:00",
        content: "#Tartu2024",
        image: "https://i.ibb.co/mcN18LY/Tartu2024.jpg",
        likes: 12
      },
      {
        id: 2,
        author: "Ethan Williams",
        date: "2024-09-15T15:30:00",
        content: "Anyone knows in which room is the lab today?",
        image: null,
        likes: 5
      },
      {
        id: 3,
        author: "Sophia Miller",
        date: "2024-09-03T09:10:00",
        content: "The weather is just perfect today! Feels like a great day for a walk in the park.",
        image: null,
        likes: 8
    },
    {
        id: 4,
        author: "Alice Johnson",
        date: "2024-08-27T18:00:00",
        content: "Saw one of the most beautiful sunsets today by the lake.",
        image: "https://i.ibb.co/rwJCgMW/sunset.jpg",
        likes: 15
    },
    {
        id: 5,
        author: "Liam Davis",
        date: "2024-08-19T13:00:00",
        content: "Had a great lunch with friends today!",
        image: null,
        likes: 7
    },
    {
        id: 6,
        author: "Alice Johnson",
        date: "2024-08-10T20:00:00",
        content: "Looking forward to the concert this weekend!",
        image: "https://i.ibb.co/6ZqRQPw/concert.jpg",
        likes: 20
    },
    {
        id: 7,
        author: "Mason Smith",
        date: "2024-07-25T07:45:00",
        content: "Just finished a marathon! Feeling accomplished. 💪",
        image: null,
        likes: 18
    },
    {
        id: 8,
        author: "Ava Rodriguez",
        date: "2024-07-20T08:00:00",
        content: "Is anyone going to the art gallery opening tomorrow?",
        image: null,
        likes: 4
    },
    {
        id: 9,
        author: "Ethan Williams",
        date: "2024-06-15T12:00:00",
        content: "Just got a new pet! Meet my dog, Max!",
        image: "https://i.ibb.co/qpDTFsc/dog.jpg",
        likes: 22
    },
    {
        id: 10,
        author: "Emily Wilson",
        date: "2024-06-10T11:00:00",
        content: "Celebrating my birthday today! 🎉",
        image: null,
        likes: 30
    }
    ]
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.likes++;
        // Update the localStorage when a like count is changed
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => post.likes = 0);
      // Reset the likes in localStorage
      localStorage.setItem('posts', JSON.stringify(state.posts));
    }
  }
});
