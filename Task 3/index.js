const apiUrl = 'http://localhost:3000/api/items';

document.addEventListener('DOMContentLoaded', fetchItems);

const itemForm = document.getElementById('item-form');
itemForm.addEventListener('submit', addItem);

function fetchItems() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const itemList = document.getElementById('item-list');
      itemList.innerHTML = '';
      data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'item';
        listItem.innerHTML = `
          <span>${item.name} (ID: ${item.id})</span>
          <button onclick="deleteItem('${item.id}')">Delete</button>
        `;
        itemList.appendChild(listItem);
      });
    });
}

function addItem(e) {
  e.preventDefault();
  const itemName = document.getElementById('item-name').value;
  const itemId = document.getElementById('item-id').value;

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: itemName, id: itemId })
  })
    .then(response => response.json())
    .then(() => {
      fetchItems();
      itemForm.reset();
    });
}

function deleteItem(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(() => fetchItems());
}
