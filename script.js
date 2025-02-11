document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        let countEl = document.getElementById("cart-count");
        if (countEl) countEl.textContent = cart.length;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Добавление товара в корзину
    document.querySelectorAll(".product-card__button").forEach((button) => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let productId = productCard.getAttribute("data-id");
            let productTitle = productCard.querySelector(".product-card__title").textContent;
            let productImage = productCard.querySelector(".product-card__image").src;

            cart.push({ id: productId, title: productTitle, image: productImage });
            saveCart();

            this.textContent = "Добавлено!";
            setTimeout(() => (this.textContent = "Добавить в корзину"), 1000);
        });
    });

    // Отображение товаров в корзине
    if (document.getElementById("cart-items")) {
        let cartItemsContainer = document.getElementById("cart-items");
        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("product-card");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="product-card__image">
                <h2 class="product-card__title">${item.title}</h2>
                <button class="button button--danger cart__remove" data-index="${index}">Удалить</button>
            `;
            cartItemsContainer.appendChild(div);
        });

        document.querySelectorAll(".cart__remove").forEach((button) => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                location.reload();
            });
        });

        document.getElementById("clear-cart").addEventListener("click", function () {
            cart = [];
            saveCart();
            location.reload();
        });
    }

    updateCartCount();
});