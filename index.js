document.addEventListener("DOMContentLoaded", function () {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const clearListButton = document.getElementById("clearListButton");
    const shoppingList = document.getElementById("shoppingList");
  
    let items = JSON.parse(localStorage.getItem("shoppingListItems")) || [];
  
    function renderList() {
      shoppingList.innerHTML = '';
      items.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.text;
        if (item.purchased) {
          listItem.classList.add("purchased");
        }
        listItem.addEventListener("click", () => togglePurchased(index));
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", (e) => editItem(e, index));
        listItem.appendChild(editButton);
        shoppingList.appendChild(listItem);
      });
    }
  
    function addItem() {
      const newItem = itemInput.value.trim();
      if (newItem) {
        items.push({ text: newItem, purchased: false });
        itemInput.value = '';
        updateLocalStorage();
        renderList();
      }
    }
  
    function togglePurchased(index) {
      items[index].purchased = !items[index].purchased;
      updateLocalStorage();
      renderList();
    }
  
    function clearList() {
      items = [];
      updateLocalStorage();
      renderList();
    }
  
    function editItem(event, index) {
      event.stopPropagation();
      const newText = prompt("Edit item:", items[index].text);
      if (newText !== null) {
        items[index].text = newText.trim();
        updateLocalStorage();
        renderList();
      }
    }
  
    function updateLocalStorage() {
      localStorage.setItem("shoppingListItems", JSON.stringify(items));
    }
  
    addItemButton.addEventListener("click", addItem);
    clearListButton.addEventListener("click", clearList);
    itemInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addItem();
      }
    });
  
    renderList();
  });
  