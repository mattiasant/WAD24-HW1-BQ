const profilePic = document.getElementById('profilePic');
const dropdownMenu = document.getElementById('dropdownMenu');

function toggleDropdown() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function(event) {
    if (!profilePic.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

profilePic.addEventListener('click', toggleDropdown);