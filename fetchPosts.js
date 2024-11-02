document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.posts');

    // Function to create a post
    function createPost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');

        //Profile picture
        const profilePic = document.createElement('div');
        profilePic.classList.add('profile-pic-post');
        const profileImage = document.createElement('img');
        profileImage.src = "https://i.ibb.co/gdKTh5F/pfp.jpg";
        profileImage.alt = "Profile Picture";
        profileImage.classList.add('profile-icon-header');
        profilePic.appendChild(profileImage);

        //Username
        const usernameElement = document.createElement('span');
        usernameElement.classList.add('author');
        usernameElement.textContent = post.author; 
        postHeader.appendChild(profilePic);
        postHeader.appendChild(usernameElement);

        //Post date
        const postDate = document.createElement('span');
        postDate.classList.add('post-date');
        postDate.textContent = new Date(post.date).toDateString();
        postHeader.appendChild(postDate);
        
        postElement.appendChild(postHeader);

        //Post text
        const postText = document.createElement('p');
        postText.classList.add('post-text');
        postText.textContent = post.content;
        postElement.appendChild(postText);

        //Post image
        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = "Post Image";
            postImage.classList.add('post-image');
            postElement.appendChild(postImage);
        }

        //Like button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.textContent = `👍 Like (${post.likes})`;
        postElement.appendChild(likeButton);

        return postElement;
    }


    
    //Fetch posts from local JSON file
    fetch('posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                const postElement = createPost(post);
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching local data:', error));
    

    /*

    //Fetch posts from the online source

    fetch('https://api.jsonsilo.com/public/739d2ed2-a374-4439-a580-c0d75d0c8a13')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                const postElement = createPost(post);
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching online data:', error));

    */
});
