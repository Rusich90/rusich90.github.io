const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('modal');

// Open modal on button click
openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// Close modal on button click
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
