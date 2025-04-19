// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Initialize cart

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCount = document.querySelector('.cart-count');

    

    // Book animation

    const heroSection = document.querySelector('.hero');

    const books = document.querySelectorAll('.book-display img');

    

    // Cart modal elements

    const cartBtn = document.querySelector('.cart-btn');

    const cartModal = document.getElementById('cart-modal');

    const closeModal = document.querySelector('.close-modal');

    const cartItemsContainer = document.querySelector('.cart-items');

    const cartTotal = document.querySelector('.cart-total span');

    const checkoutBtn = document.querySelector('.checkout-btn');

    

    // Update cart count

    function updateCartCount() {

        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        cartCount.textContent = totalItems;

        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

        localStorage.setItem('cart', JSON.stringify(cart));

    }

    

    // Add to cart functionality

    document.querySelectorAll('.add-to-cart').forEach(button => {

        button.addEventListener('click', function() {

            const bookCard = this.closest('.book-card');

            const bookId = bookCard.dataset.bookId;

            const bookTitle = bookCard.querySelector('h3').textContent;

            const bookPrice = parseFloat(bookCard.querySelector('.current-price').textContent.replace('$', ''));

            const bookImage = bookCard.querySelector('img').src;

            

            // Check if book already in cart

            const existingItem = cart.find(item => item.id === bookId);

            

            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                cart.push({

                    id: bookId,

                    title: bookTitle,

                    price: bookPrice,

                    image: bookImage,

                    quantity: 1

                });

            }

            

            updateCartCount();

            showToast(`${bookTitle} added to cart`);

        });

    });

    

    // Show toast notification

    function showToast(message) {

        const toast = document.createElement('div');

        toast.className = 'toast';

        toast.textContent = message;

        document.body.appendChild(toast);

        

        setTimeout(() => {

            toast.classList.add('show');

        }, 10);

        

        setTimeout(() => {

            toast.classList.remove('show');

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    

    // Cart modal functionality

    cartBtn.addEventListener('click', function() {

        updateCartModal();

        cartModal.style.display = 'block';

        document.body.style.overflow = 'hidden';

    });

    

    closeModal.addEventListener('click', function() {

        cartModal.style.display = 'none';

        document.body.style.overflow = 'auto';

    });

    

    window.addEventListener('click', function(event) {

        if (event.target === cartModal) {

            cartModal.style.display = 'none';

            document.body.style.overflow = 'auto';

        }

    });

    

    // Update cart modal content

    function updateCartModal() {

        cartItemsContainer.innerHTML = '';

        

        if (cart.length === 0) {

            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';

            cartTotal.textContent = '$0.00';

            return;

        }

        

        let total = 0;

        

        cart.forEach(item => {

            const cartItem = document.createElement('div');

            cartItem.className = 'cart-item';

            cartItem.innerHTML = `

                <img src="${item.image}" alt="${item.title}">

                <div class="cart-item-info">

                    <h4>${item.title}</h4>

                    <p>$${item.price.toFixed(2)} × ${item.quantity}</p>

                </div>

                <div class="cart-item-total">

                    $${(item.price * item.quantity).toFixed(2)}

                </div>

                <button class="remove-item" data-id="${item.id}">

                    <i class="fas fa-times"></i>

                </button>

            `;

            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;

        });

        

        cartTotal.textContent = `$${total.toFixed(2)}`;

        

        // Add event listeners to remove buttons

        document.querySelectorAll('.remove-item').forEach(button => {

            button.addEventListener('click', function() {

                const itemId = this.dataset.id;

                cart = cart.filter(item => item.id !== itemId);

                updateCartCount();

                updateCartModal();

                showToast('Item removed from cart');

            });

        });

    }

    

    // Checkout button

    checkoutBtn.addEventListener('click', function() {

        alert('Checkout functionality would be implemented here');

    });

    

    // Book animation on mouse move

    if (window.matchMedia("(pointer: fine)").matches) {

        heroSection.addEventListener('mousemove', (e) => {

            const x = e.clientX / window.innerWidth;

            const y = e.clientY / window.innerHeight;

            

            books[0].style.transform = `rotate(${5 + x * 2}deg)`;

            books[1].style.transform = `rotate(${-3 - y * 2}deg)`;

            books[2].style.transform = `rotate(${2 + x * 2}deg)`;

        });

        

        heroSection.addEventListener('mouseleave', () => {

            books[0].style.transform = 'rotate(5deg)';

            books[1].style.transform = 'rotate(-3deg)';

            books[2].style.transform = 'rotate(2deg)';

        });

    }

    

    // Smooth scroll for anchor links

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function(e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {

                target.scrollIntoView({

                    behavior: 'smooth'

                });

            }

        });

    });

    

    // Initialize cart count

    updateCartCount();

});

// Add toast styles dynamically

const toastStyles = document.createElement('style');

toastStyles.textContent = `

    .toast {

        position: fixed;

        bottom: 20px;

        left: 50%;

        transform: translateX(-50%);

        background-color: #333;

        color: white;

        padding: 12px 24px;

        border-radius: 4px;

        opacity: 0;

        transition: opacity 0.3s;

        z-index: 1000;

    }

    

    .toast.show {

        opacity: 1;

    }

`;

document.head.appendChild(toastStyles);