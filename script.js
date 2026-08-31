const raw = 'https://raw.githubusercontent.com/noirstrands/noir-strands/main/';

const products = [
  ['Pixie Cut','Pixie Cut',191,'Natural Black','8 inch','HD Lace','pixie-cut.jpg'],
  ['Pixie Curls','Pixie Curls',222,'Espresso','12 inch','Transparent Lace','pixie-curls.jpg'],
  ['Bone Straight','Bone Straight',253,'Honey Blonde','16 inch','4x4 Closure','bone-straight.jpg'],
  ['Body Wave','Body Wave',283,'Burgundy','20 inch','5x5 Closure','body-wave.jpg'],
  ['Deep Wave','Deep Wave',314,'Pink','24 inch','13x4 Lace Front','deep-wave.jpg'],
  ['Water Wave','Water Wave',344,'Blonde','30 inch','HD Lace','water-wave.jpg'],
  ['Loose Deep Waves','Loose Deep Waves',497,'Burgundy','20 inch','HD Lace','loose-deep-1.jpg'],
  ['Straight Bob','Straight Bob',500,'Pink','24 inch','Transparent Lace','straight-bob.jpg'],
  ['Curly Bob','Curly Bob',245,'Blonde','30 inch','4x4 Closure','curly-bob.jpg'],
  ['Burmese Curly','Burmese Curly',229,'Espresso','12 inch','HD Lace','burmese-curly.jpg'],
  ['Deep Curly','Deep Curly',337,'Pink','24 inch','5x5 Closure','deep-wave-alt.jpg'],
  ['Afro Kinky','Afro Kinky',150,'Blonde','30 inch','13x4 Lace Front','water-wave.jpg'],
  ['Layered Straight','Layered Straight',245,'Natural Black','20 inch','HD Lace','deep-wave.jpg'],
  ['Layered Body Wave','Layered Body Wave',339,'Natural Black','20 inch','Transparent Lace','layered-body-wave.jpg']
];

const cats = [
  'All styles',
  'Pixie Cut',
  'Pixie Curls',
  'Bone Straight',
  'Body Wave',
  'Deep Wave',
  'Water Wave',
  'Loose Wave',
  'Kinky Curly',
  'Kinky Straight',
  'Jerry Curl',
  'Loose Deep Waves',
  'Straight Bob',
  'Curly Bob',
  'Burmese Curly',
  'Bob Wig',
  'Jerry Straight',
  'Deep Curly',
  'Afro Kinky'
];

let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let saved = JSON.parse(localStorage.getItem('saved') || '[]');

const chips = document.querySelector('#chips');

cats.forEach((category, index) => {
  const button = document.createElement('button');

  button.className = 'chip' + (index === 0 ? ' active' : '');
  button.textContent = category;

  button.onclick = () => {
    document.querySelectorAll('.chip').forEach(item => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    render(category === 'All styles' ? '' : category);
  };

  chips.appendChild(button);
});

function currentList(filter = '') {
  const searchInput = document.querySelector('#search');
  const query = (searchInput ? searchInput.value : '').toLowerCase();

  return products.filter(product =>
    (!filter || product[0] === filter) &&
    (!query || product[0].toLowerCase().includes(query))
  );
}

function render(filter = '') {
  const list = currentList(filter);
  const productsContainer = document.querySelector('#products');

  if (!productsContainer) return;

  productsContainer.innerHTML = list.map((product, index) => `
    <article class="product">

      <img
        class="product-img"
        src="${raw + (product[6] || 'deep-wave.jpg')}"
        onerror="this.src='${raw}deep-wave.jpg'"
        alt="${product[1]}">

      <span class="badge">${product[5]}</span>

      <small>${product[5].toUpperCase()}</small>

      <h3>${product[1]}</h3>

      <div class="meta">
        ${product[1]}<br>
        ● ${product[3]} · ${product[4]}
      </div>

      <div class="price">$${product[2]}</div>

      <select>
        <option>${product[3]}</option>
      </select>

      <select>
        <option>${product[4]}</option>
      </select>

      <button
        class="add"
        onclick="addCart(${index}, '${filter}')">
        ADD TO CART
      </button>

    </article>
  `).join('');
}

window.addCart = function(index, filter) {
  const product = currentList(filter)[index];

  if (!product) return;

  cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));

  update();
};

function update() {

  const cartCount = document.querySelector('#cartCount');
  const savedCount = document.querySelector('#savedCount');
  const cartItems = document.querySelector('#cartItems');
  const cartTotal = document.querySelector('#cartTotal');

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (savedCount) {
    savedCount.textContent = saved.length;
  }

  if (cartItems) {
    cartItems.innerHTML =
      cart.map(product => `
        <div class="cart-row">
          <span>${product[1]}</span>
          <b>$${product[2]}</b>
        </div>
      `).join('') || '<p>Your bag is empty.</p>';
  }

  if (cartTotal) {
    cartTotal.textContent =
      cart.length ? 'Items selected: ' + cart.length : '';
  }
}

function openDrawer(id) {
  const drawer = document.querySelector(id);

  if (drawer) {
    drawer.classList.add('open');
  }
}

function closeAll() {
  document
    .querySelectorAll('.drawer')
    .forEach(drawer => drawer.classList.remove('open'));
}

const cartButton = document.querySelector('#cartBtn');
const savedButton = document.querySelector('#savedBtn');
const searchInput = document.querySelector('#search');
const filterToggle = document.querySelector('#filterToggle');

if (cartButton) {
  cartButton.onclick = () => openDrawer('#cartDrawer');
}

if (savedButton) {
  savedButton.onclick = () => openDrawer('#savedDrawer');
}

document.querySelectorAll('.close').forEach(button => {
  button.onclick = closeAll;
});

if (searchInput) {
  searchInput.oninput = () => render();
}

if (filterToggle) {
  filterToggle.onclick = () => {

    document
      .querySelectorAll('.chip')
      .forEach(item => item.classList.remove('active'));

    const firstChip = document.querySelector('.chip');

    if (firstChip) {
      firstChip.classList.add('active');
    }

    render();
  };
}

render();
update();