import {createStore} from 'vuex';
import postsData from '@/data/posts.json';
import axios from 'axios'; // We'll use axios to send HTTP requests

export default createStore({
        state: {
            posts: postsData.Posts,   // Current post data
            user: null,                // Store user data after signup
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
            SET_USER(state, user) {
                state.user = user;  // Save user data to the store after signup
            },
            CLEAR_USER(state) {
                state.user = null; // Clear user data
            }
        },
        actions: {

            logout({ commit }) {
                // Clear user data from Vuex store
                commit('CLEAR_USER');
                // Remove token from localStorage
                localStorage.removeItem('userToken');
                // Optionally send a logout request to the server
                axios.post('http://localhost:3000/logout').catch(err => console.error(err));
                // Redirect to login page
                window.location.href = '/login';
            },


            // Methods for retrieving posts and resetting likes
            async fetchPosts() {
                // Add your logic to fetch posts from an API if needed
            },
            resetLikes({commit}) {
                commit('resetLikes');
            },

            // Action for handling user signup
            async signup({commit}, {email, password}) {
                try {
                    // Send a POST request to the backend to create a new user
                    const response = await axios.post('http://localhost:3000/signup', {
                        email,
                        password,
                    });

                    // If the signup is successful, save the user info to Vuex store
                    commit('SET_USER', response.data.user);
                    alert('Signup successful!');
                } catch (error) {
                    console.error('Error during signup:', error);
                    alert('Signup failed. Please try again.');
                }
            },

            async login({commit}, {email, password}) {
                console.log(email, password);
                try {
                    // Sending a POST request to the backend to authenticate the user
                    const response = await axios.post('http://localhost:3000/login', {email, password});
                    //console.log(response.data);
                    // Ensure the response contains the user data (validate the response structure)
                    if (response && response.data && response.data.user) {
                        // Commit the user data to the Vuex store
                        commit('SET_USER', response.data.user);
                        // You can also store the token in localStorage or cookies if needed
                        localStorage.setItem('userToken', response.data.token); // Example
                        alert('Login successful!');
                        window.location.href = response.data.redirectTo || '/';
                        console.log('User logged in:', response.data.user);
                        // Optionally, redirect the user to another page after login
                    } else {
                        throw new Error('Invalid response structure from server');
                    }
                } catch (error) {
                    // Handle login error (e.g., incorrect credentials, server issues)
                    console.error('Error during login:', error);
                    alert('Login failed. Please check your credentials and try again.');
                }
            },
        },
        modules: {},
    }
);
