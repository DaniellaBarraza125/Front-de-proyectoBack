//DIVS

const homeDiv = document.getElementById("homeDiv");
const shopDiv = document.getElementById("shopDiv");
const registerDiv = document.getElementById("registerDiv");
const loginDiv = document.getElementById("loginDiv");
const categoriesDiv = document.getElementById("categoriesDiv");
const ordersDiv = document.getElementById("ordersDiv");
const cartDiv = document.getElementById("cartDiv");
const productsDiv = document.getElementById("productsDiv");
const communityDiv = document.getElementById("communityDiv");
const alertDiv = document.getElementById("alertDiv");
const loginErrorDiv = document.getElementById("loginErrorDiv");
const sortDiv = document.getElementById("sortDiv");

//FORMS
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const sortAscButtom = document.getElementById("sortAscButtom");
const sortDescButtom = document.getElementById("sortDescButtom");

//NAVS
const userZone = document.getElementById("userZone");
const shopNav = document.getElementById("shopNav");
const communityNav = document.getElementById("communityNav");
const categoriesDropdown = document.getElementById("categoriesDropdown");

//API
const PORT = "http://localhost:3002/";
const API_products = "http://localhost:3002/products";
const API_users = "http://localhost:3002/users";

//INPUTS
const registerInputPassword = document.getElementById("registerInputPassword");
const registerInputEmail = document.getElementById("registerInputEmail");
const registerInputName = document.getElementById("registerInputName");
const loginInputPassword = document.getElementById("loginInputPassword");
const loginInputEmail = document.getElementById("loginInputEmail");

let products = [];
let categories = [];

const hideViews = () => {
    communityDiv.classList.add("d-none");
    registerDiv.classList.add("d-none");
    homeDiv.classList.add("d-none");
    loginDiv.classList.add("d-none");
    shopDiv.classList.add("d-none");
    sortDiv.classList.add("d-none");
    categoriesDiv.classList.add("d-none");
};

hideViews();
const showCategoriesDiv = () => {
    hideViews();
    categoriesDiv.classList.remove("d-none");
};

const showShop = () => {
    hideViews();
    sortDiv.classList.remove("d-none");
    shopDiv.classList.remove("d-none");
};

const showRegisterForm = () => {
    hideViews();

    registerDiv.classList.remove("d-none");
};

const showLoginForm = () => {
    hideViews();
    loginDiv.classList.remove("d-none");
};
const showCommunity = () => {
    hideViews();
    communityDiv.classList.remove("d-none");
};

//AXIOS

axios
    .get(API_products)
    .then((response) => {
        const products = response.data;
        console.log(products);
        printProducts(products);
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3002/users/", {
            name: registerInputName.value,
            password: registerInputPassword.value,
            email: registerInputEmail.value,
        });
        alertDiv.innerHTML = `<div class="alert alert-danger" role="alert"> ${res.data.message}</div>`;
        console.log(res.data.message);
        registerInputName.value = "";
        registerInputPassword.value = "";
        registerInputEmail.value = "";
    } catch (err) {
        alertDiv.innerHTML = `<div class="alert alert-ligth" role="alert"> ${err.response.data.msg}</div>`;
        console.error(err.response.data);
    }
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3002/users/login/", {
            password: loginInputPassword.value,
            email: loginInputEmail.value,
        });

        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);

        loginInputPassword.value = "";
        loginInputEmail.value = "";
        loginErrorDiv.innerHTML = `<div class="alert alert-danger" role="alert">${res.data.message}</div>`;
    } catch (err) {
        console.log(err.response.data.message);
        loginErrorDiv.innerHTML = `<div class="alert alert-danger" role="alert">${err.response.data.message}</div>`;
        console.error(err);
    }
});

axios
    .get(API_users)
    .then((response) => {
        const users = response.data.users;
        console.log(users);
        printUsers(users);
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });

const printProducts = (products) => {
    const productHTML = products
        .map((product) => {
            return `<div class="card col-3 d-flex wrap m-0" >
            <img src="${PORT}${product.filePath}" class="card-img-top fixed-height-img" alt="Img_product">
            <div class="card-body mh-50 d-inline-block>
            <h5 class="card-title">${product.name}</h5>
            <div> ${product.price}  </div> 
            </div>

            </div> `;
        })
        .join("");

    productsDiv.innerHTML = productHTML;
};

const printUsers = (users) => {
    const communityHtML = users
        .map((user) => {
            return `<div class="card col-3 d-flex wrap m-0" >
            <img src="${PORT}${user.filePath}" class="card-img-top fixed-height-img" alt="Img_product">
            <div class="card-body mh-50 d-inline-block>
            <h5 class="card-title">${user.name}</h5>
            <div> ${user.email}  </div>
            </div>

            </div> `;
        })
        .join("");

    communityDiv.innerHTML = communityHtML;
};
axios
    .get("http://localhost:3002/categories/")
    .then((response) => {
        const categories = response.data;
        showCategories(categories);
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });
const showCategories = (categories) => {
    categoriesDropdown.innerHTML = categories
        .map(
            (category) =>
                `<li><a class="dropdown-item" href="#" data-value="${category.value}">${category.name}</a></li>`,
        )
        .join("");
};
const findCategory = (categoryText) => {
    axios
        .get(`http://localhost:3002/categories/category/${categoryText} `)
        .then((response) => {
            const categories = response.data[0].Products;
            console.log(categories);

            printCategories(categories);
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
};
const choosingCategory = (e) => {
    e.preventDefault();
    const categoryText = e.target.textContent || e.target.innerText;
    console.log(categoryText);
    findCategory(categoryText);
    showCategoriesDiv();
};

const printCategories = (categories) => {
    const categoryHtML = categories.map((category) => {
        console.log(category);
        return `<div class="card col-3 d-flex wrap m-0"> <img src="${PORT}${category.filePath}" class="card-img-top fixed-height-img" alt="Img_product"> <div class="card-body mh-50 d-inline-block>     <h5 class="card-title">${category.name}</h5><div> ${category.price} </div></div></div>`;
    });
    categoriesDiv.innerHTML = categoryHtML;
};

sortDescButtom.addEventListener("click", async (e) => {
    e.preventDefault();
    hideViews();
    sortDiv.classList.remove("d-none");

    try {
        const res = await axios.get(
            "http://localhost:3002/products/orderDesc/",
        );
        const products = res.data;

        let productsHTML = "";

        products.forEach((product) => {
            productsHTML += `<div class="card col-3 d-flex wrap m-0">
                <img src="${PORT}${product.filePath}" class="card-img-top fixed-height-img" alt="Img_product">
                <div class="card-body mh-50 d-inline-block">
                    <h5 class="card-title">${product.name}</h5>
                    <div>${product.price}</div>
                </div>
            </div>`;
        });

        productsDiv.innerHTML = productsHTML;

        showShop();
    } catch (err) {
        console.error(err);
    }
});

sortAscButtom.addEventListener("click", async (e) => {
    e.preventDefault();
    hideViews();
    sortDiv.classList.remove("d-none");

    try {
        const res = await axios.get("http://localhost:3002/products/orderAsc/");
        const products = res.data;

        let productsHTML = "";

        products.forEach((product) => {
            productsHTML += `<div class="card col-3 d-flex wrap m-0">
                <img src="${PORT}${product.filePath}" class="card-img-top fixed-height-img" alt="Img_product">
                <div class="card-body mh-50 d-inline-block">
                    <h5 class="card-title">${product.name}</h5>
                    <div>${product.price}</div>
                </div>
            </div>`;
        });

        productsDiv.innerHTML = productsHTML;

        showShop();

        console.log(res);
    } catch (err) {
        console.error(err);
    }
});

const checkAuthToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        console.log("bienvenido:", token);
    } else {
        console.log("No se encontró ningún token en el localStorage");
    }
};
checkAuthToken();

window.addEventListener("DOMContentLoaded", checkAuthToken);

//EVENTLISTENERS

categoriesDropdown.addEventListener("click", choosingCategory);

communityNav.addEventListener("click", (e) => {
    e.preventDefault();
    showCommunity();
});

shopNav.addEventListener("click", (e) => {
    e.preventDefault();
    showShop();
});

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginForm();
});

registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterForm();
});

userNav.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginForm();
});
