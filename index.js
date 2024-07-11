document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');
    let itemsArray = JSON.parse(localStorage.getItem('items')) || [];

    // Function to render the list
    function renderList() {
        shoppingList.innerHTML = '';
        itemsArray.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            li.className = item.purchased ? 'purchased' : '';
            li.addEventListener('click', () => {
                itemsArray[index].purchased = !itemsArray[index].purchased;
                updateLocalStorage();
                renderList();
            });
            li.addEventListener('dblclick', () => {
                const editedText = prompt('Edit item:', item.text);
                if (editedText) {
                    itemsArray[index].text = editedText;
                    updateLocalStorage();
                    renderList();
                }
            });
            shoppingList.appendChild(li);
        });
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem('items', JSON.stringify(itemsArray));
    }

    // Add item event
    addButton.addEventListener('click', () => {
        const newItemText = itemInput.value.trim();
        if (newItemText) {
            itemsArray.push({ text: newItemText, purchased: false });
            itemInput.value = '';
            updateLocalStorage();
            renderList();
        }
    });

    // Clear list event
    clearButton.addEventListener('click', () => {
        itemsArray = [];
        updateLocalStorage();
        renderList();
    });

    // Initial render
    renderList();
});