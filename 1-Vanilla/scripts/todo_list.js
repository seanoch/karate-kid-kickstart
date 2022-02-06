(function () {
  let nextId = 0;
  const iconMap = { edit: "&#xe3c9", remove: "&#xe14c;", check: "&#xe876;" };
  const newItemInput = document.getElementById("new-item-name");
  const addBtn = document.getElementById("add-btn");

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

  function createTodoItem(id, text) {
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar");
    newItemContainer.classList.add("item-bar");
    newItemContainer.id = "item-bar-" + id;

    const newItemCheckBtn = createButton(id, "check", checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);

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
        const newItem = createTodoItem(nextId, newItemInput.value);

        document.getElementById("main-container").appendChild(newItem);
        localStorage.setItem(nextId, newItemInput.value);

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
      localStorage.removeItem(id);
    };
  }

  function checkItemCallback(id) {
    return function () {
      const checkBtn = document.getElementById("check-btn-" + id);

      if (checkBtn.dataset.checked == "yes") {
        checkBtn.dataset.checked = "no";
        checkBtn.classList.remove("checked");
      } else {
        checkBtn.dataset.checked = "yes";
        checkBtn.classList.add("checked");
      }
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

          localStorage.setItem(id, input.value);

          const editBtn = createButton(id, "edit", editItemCallback(id));
          bar.replaceChild(editBtn, confirmBtn);
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

  function loadLocalStorage() {
    if (typeof Storage !== "undefined") {
      let numericIds = [];

      for (var i = 0; i < localStorage.length; i++) {
        numericIds.push(parseInt(localStorage.key(i)));
      }

      numericIds.sort();

      for (var i = 0; i < numericIds.length; i++) {
        let id = numericIds[i];
        let text = localStorage.getItem(id);
        const newItem = createTodoItem(id, text);
        document.getElementById("main-container").appendChild(newItem);
      }

      if (numericIds.length > 0) {
        nextId = numericIds[numericIds.length - 1] + 1;
      }
    }
  }

  addBtn.onclick = addItemCallback;
  newItemInput.onkeyup = addItemCallback;

  loadLocalStorage();
})();
