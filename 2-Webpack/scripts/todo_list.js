(function () {
  let nextId = 0;
  const iconMap = { edit: "&#xe3c9", remove: "&#xe14c;", check: "&#xe876;" };
  const newItemInput = document.getElementById("new-item-name");
  const addBtn = document.getElementById("add-btn");
  const LOCAL_STORAGE_KEY = "myChecklist";

  function createButton(id, type, cb) {
    const button = document.createElement("div");
    const icon = iconMap[type] || "&#xe145;";

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons");
    iconSpan.classList.add("md-36");
    iconSpan.innerHTML = icon;

    button.classList.add("btn");
    button.classList.add(type + "-btn");
    button.id = type + "-btn-" + id;
    button.appendChild(iconSpan);
    button.onclick = cb;

    return button;
  }

  function createTodoItem(id, text, check) {
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar");
    newItemContainer.classList.add("item-bar");
    newItemContainer.id = "item-bar-" + id;

    const newItemCheckBtn = createButton(id, "check", checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);

    if (check) {
      newItemCheckBtn.dataset.checked = "true";
      newItemCheckBtn.classList.add("checked");
    }

    const newItemLabel = document.createElement("label");
    newItemLabel.classList.add("item");
    newItemLabel.id = "item-label-" + id;
    newItemLabel.innerText = text;
    newItemLabel.ondblclick = editItemCallback(id);
    newItemContainer.appendChild(newItemLabel);

    const newItemEditBtn = createButton(id, "edit", editItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    const newItemRemoveBtn = createButton(id, "remove", removeItemCallback(id));
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
  }

  function addItemCallback(event) {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.keyCode === 13)
    ) {
      if (isVaildItemName(newItemInput.value)) {
        const newItem = createTodoItem(nextId, newItemInput.value, false);

        document.getElementById("main-container").appendChild(newItem);
        saveToLocalStorage(nextId);

        newItemInput.value = "";
        nextId++;
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
      const elementToRemove = document.getElementById("item-bar-" + id);

      document.getElementById("main-container").removeChild(elementToRemove);
      removeFromLocalStorage(id);
    };
  }

  function checkItemCallback(id) {
    return function () {
      const checkBtn = document.getElementById("check-btn-" + id);

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
        const bar = document.getElementById("item-bar-" + id);
        const input = document.getElementById("item-edit-" + id);
        const confirmBtn = document.getElementById("confirm-btn-" + id);

        if (isVaildItemName(input.value)) {
          const newTextLabel = document.createElement("label");
          newTextLabel.classList.add("item");
          newTextLabel.id = "item-label-" + id;
          newTextLabel.innerText = input.value;
          newTextLabel.ondblclick = editItemCallback(id);
          bar.replaceChild(newTextLabel, input);

          const editBtn = createButton(id, "edit", editItemCallback(id));
          bar.replaceChild(editBtn, confirmBtn);

          saveToLocalStorage(id);
        }
      }
    };
  }

  function editItemCallback(id) {
    return function () {
      const bar = document.getElementById("item-bar-" + id);
      const label = document.getElementById("item-label-" + id);
      const editBtn = document.getElementById("edit-btn-" + id);
      const oldText = label.innerText;

      const newTextInput = document.createElement("input");
      newTextInput.type = "text";
      newTextInput.classList.add("edit");
      newTextInput.id = "item-edit-" + id;
      newTextInput.value = oldText;
      newTextInput.onkeyup = confirmItemEditCallback(id);
      bar.replaceChild(newTextInput, label);
      newTextInput.focus();

      const confirmBtn = createButton(
        id,
        "confirm",
        confirmItemEditCallback(id)
      );
      bar.replaceChild(confirmBtn, editBtn);
    };
  }

  function saveToLocalStorage(id) {
    if (typeof Storage !== "undefined") {
      const label = document.getElementById("item-label-" + id);
      const checkBtn = document.getElementById("check-btn-" + id);
      let isChecked = checkBtn.dataset.checked === "true";
      let map = getMapFromLocalStorage();

      map.set(id, { text: label.innerText, check: isChecked });

      setMapToLocalStorage(map);
    }
  }

  function removeFromLocalStorage(id) {
    if (typeof Storage !== "undefined") {
      let map = getMapFromLocalStorage();

      map.delete(id);
      setMapToLocalStorage(map);
    }
  }

  function setMapToLocalStorage(map) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(map.entries())));
  }

  function getMapFromLocalStorage() {
    let jsonObject = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    let map = jsonObject!=null ? new Map(jsonObject) : new Map();

    return map;
  }

  function loadLocalStorage() {
    if (typeof Storage !== "undefined") {
      let numericIds = [];
      let map = getMapFromLocalStorage();

      for (const [id, value] of map) {
        const newItem = createTodoItem(id, value.text, value.check);
        document.getElementById("main-container").appendChild(newItem);

        if (id >= nextId) {
          nextId = id + 1;
        }
      }
    }
  }

  addBtn.onclick = addItemCallback;
  newItemInput.onkeyup = addItemCallback;

  loadLocalStorage();
})();
