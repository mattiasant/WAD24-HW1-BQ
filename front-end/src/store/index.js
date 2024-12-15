import { createStore } from 'vuex';
import postsData from '@/data/posts.json';

export default createStore({
    state: {
        posts: postsData.Posts,
    },
    mutations: {
        incrementLikes(state, postId) {
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.likes += 1;
            }
        },
        resetLikes(state) {
            state.posts.forEach((post) => {
                post.likes = 0;
            });
        },
    },
    actions: {
        //Methods for retrieving posts and resetting likes
        async fetchPosts() {
            
        },
        
        resetLikes({ commit }) {
            commit('resetLikes');
        },
    },
    modules: {},
});
