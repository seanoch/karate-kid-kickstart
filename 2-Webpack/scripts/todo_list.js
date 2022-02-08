import { LocalStorageManager } from "./localstorage_manager";
const { v4: uuidv4 } = require("uuid");

(function () {
  const iconMap = { edit: "&#xe3c9", remove: "&#xe14c;", check: "&#xe876;" };
  const newItemInput = document.getElementById("new-item-name");
  const addBtn = document.getElementById("add-btn");
  let localStorageManager = new LocalStorageManager();

  function createButton(type, cb) {
    const button = document.createElement("div");
    const icon = iconMap[type] || "&#xe145;";

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons");
    iconSpan.classList.add("md-36");
    iconSpan.innerHTML = icon;

    button.classList.add("btn");
    button.classList.add(type + "-btn");
    button.dataset.type = type;
    button.appendChild(iconSpan);
    button.onclick = cb;

    return button;
  }

  function createTodoItem(id, text, check) {
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar");
    newItemContainer.classList.add("item-bar");
    newItemContainer.dataset.id = id;

    const newItemCheckBtn = createButton("check", checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);

    if (check) {
      newItemCheckBtn.dataset.checked = "true";
      newItemCheckBtn.classList.add("checked");
    }

    const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("item");
    newItemLabel.dataset.type = "item-label";
    newItemLabel.innerText = text;
    newItemLabel.ondblclick = editItemCallback(id);
    newItemContainer.appendChild(newItemLabel);

    const newItemEditBtn = createButton("edit", editItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    const newItemRemoveBtn = createButton("remove", removeItemCallback(id));
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
  }

  function addItemCallback(event) {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.keyCode === 13)
    ) {
      if (isVaildItemName(newItemInput.value)) {
        const uniqueId = uuidv4();
        const newItem = createTodoItem(uniqueId, newItemInput.value, false);

        document.getElementById("main-container").appendChild(newItem);
        saveToLocalStorage(uniqueId);

        newItemInput.value = "";
      }
    }
  }

  function isVaildItemName(name) {
    let valid = name.length > 0;

    if (!valid) {
      alert("Invalid item name!");
    }

    return valid;
  }

  function removeItemCallback(id) {
    return function () {
      const todoItem = document.querySelector("[data-id='" + id + "']");

      document.getElementById("main-container").removeChild(todoItem);
      removeFromLocalStorage(id);
    };
  }

  function checkItemCallback(id) {
    return function () {
      const todoItem = document.querySelector("[data-id='" + id + "']");
      const checkBtn = todoItem.querySelector("[data-type='check']");

      if (checkBtn.dataset.checked == "true") {
        checkBtn.dataset.checked = "false";
        checkBtn.classList.remove("checked");
      } else {
        checkBtn.dataset.checked = "true";
        checkBtn.classList.add("checked");
      }

      saveToLocalStorage(id);
    };
  }

  function confirmItemEditCallback(id) {
    return function (event) {
      if (
        event.type === "click" ||
        (event.type === "keyup" && event.keyCode === 13)
      ) {
        const todoItem = document.querySelector("[data-id='" + id + "']");
        const input = todoItem.querySelector("[data-type='item-input']");
        const confirmBtn = todoItem.querySelector("[data-type='confirm']");

        if (isVaildItemName(input.value)) {
          const newTextLabel = document.createElement("label");
          newTextLabel.classList.add("item");
          newTextLabel.dataset.type = "item-label";
          newTextLabel.innerText = input.value;
          newTextLabel.ondblclick = editItemCallback(id);
          todoItem.replaceChild(newTextLabel, input);

          const editBtn = createButton("edit", editItemCallback(id));
          todoItem.replaceChild(editBtn, confirmBtn);

          saveToLocalStorage(id);
        }
      }
    };
  }

  function editItemCallback(id) {
    return function () {
      const todoItem = document.querySelector("[data-id='" + id + "']");
      const label = todoItem.querySelector("[data-type='item-label']");
      const editBtn = todoItem.querySelector("[data-type='edit']");
      const oldText = label.innerText;

      const newTextInput = document.createElement("input");
      newTextInput.type = "text";
      newTextInput.classList.add("edit");
      newTextInput.dataset.type = "item-input";
      newTextInput.value = oldText;
      newTextInput.onkeyup = confirmItemEditCallback(id);
      todoItem.replaceChild(newTextInput, label);
      newTextInput.focus();

      const confirmBtn = createButton("confirm", confirmItemEditCallback(id));
      todoItem.replaceChild(confirmBtn, editBtn);
    };
  }

  function saveToLocalStorage(id) {
    if (localStorageManager.canUseLocalStorage()) {
      const todoItem = document.querySelector("[data-id='" + id + "']");
      const label = todoItem.querySelector("[data-type='item-label']");
      const checkBtn = todoItem.querySelector("[data-type='check']");
      let isChecked = checkBtn.dataset.checked === "true";
      let isEditMode = label === null;

      if (!isEditMode) {
        localStorageManager.addOrUpdateItem(id, {
          text: label.innerText,
          check: isChecked,
        });
      }
    }
  }

  function removeFromLocalStorage(id) {
    if (localStorageManager.canUseLocalStorage()) {
      localStorageManager.removeItem(id);
    }
  }

  function loadLocalStorage() {
    if (localStorageManager.canUseLocalStorage()) {
      let numericIds = [];
      let map = localStorageManager.getItems();

      for (const [id, value] of map) {
        const newItem = createTodoItem(id, value.text, value.check);
        document.getElementById("main-container").appendChild(newItem);
      }
    }
  }

  addBtn.onclick = addItemCallback;
  newItemInput.onkeyup = addItemCallback;

  loadLocalStorage();
})();
