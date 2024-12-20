import { createStore } from 'vuex';
import axios from 'axios'; // For HTTP requests

export default createStore({
    state: {
        posts: [],       // Initially empty, populated by fetchPosts
        user: null,      // Store user data after login/signup
    },
    mutations: {
        incrementLikes(state, postId) {
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.likes += 1;
            }
        },
        resetLikes(state) {
            state.posts.forEach((post) => (post.likes = 0));
        },
        SET_USER(state, user) {
            state.user = user;  // Save user data
        },
        CLEAR_USER(state) {
            state.user = null;  // Clear user data
        },
        SET_POSTS(state, posts) {
            state.posts = posts;  // Set posts from backend
        },
    },
    actions: {
        async fetchPosts({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/posts');
                if (response && response.data) {
                    commit('SET_POSTS', response.data.posts);
                    console.log('Posts fetched successfully:', response.data.posts);
                } else {
                    console.error('Failed to fetch posts: Invalid response structure');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        resetLikes({ commit }) {
            commit('resetLikes');
        },
        incrementLikes({ commit }, postId) {
            commit('incrementLikes', postId);
        },
        async signup({ commit }, { email, password }) {
            try {
                const response = await axios.post('http://localhost:3000/signup', { email, password });
                if (response && response.data && response.data.user) {
                    commit('SET_USER', response.data.user);
                    alert('Signup successful!');
                } else {
                    throw new Error('Signup failed: Invalid response structure');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('Signup failed. Please try again.');
            }
        },
        async login({ commit }, { email, password }) {
            try {
                const response = await axios.post('http://localhost:3000/login', { email, password });
                if (response && response.data && response.data.user) {
                    commit('SET_USER', response.data.user);
                    localStorage.setItem('userToken', response.data.token); // Store token
                    alert('Login successful!');
                    // Redirect using Vue Router
                    this.$router.push(response.data.redirectTo || '/');
                    console.log('User logged in:', response.data.user);
                } else {
                    throw new Error('Login failed: Invalid response structure');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Login failed. Please check your credentials.');
            }
        },
        logout({ commit }) {
            commit('CLEAR_USER');
            localStorage.removeItem('userToken');
            axios.post('http://localhost:3000/logout').catch(err => console.error(err));
            this.$router.push('/login'); // Navigate to login
        },
    },
    modules: {},
});
