(function () {

  let nextId = 0;
  const iconMap = { "edit": "&#xe3c9", "remove": "&#xe14c;", "check": "&#xe876;"}

  function createButton(id, type, cb) {
    let button = document.createElement("div");
    const icon = iconMap[type] || "&#xe145;";

    button.classList.add("btn");
    button.classList.add(type + "-btn");
    button.id = type + "-btn-" + id;
    button.innerHTML = '<span class="material-icons md-36">' + icon + "</span>";
    button.onclick = cb;

    return button;
  }

  function createTodoItem(id, text) {
    let newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar");
    newItemContainer.classList.add("item-bar");
    newItemContainer.id = "item-bar-" + id;

    let newItemCheckBtn = createButton(id, "check", checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);

    let newItemLabel = document.createElement("label");
    newItemLabel.classList.add("item");
    newItemLabel.id = "item-label-" + id;
    newItemLabel.innerText = text;
    newItemContainer.appendChild(newItemLabel);

    let newItemEditBtn = createButton(id, "edit", editItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    let newItemRemoveBtn = createButton(
      id,
      "remove",
      removeItemCallback(id)
    );
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
  }

  function addItem() {
    let newItemInput = document.getElementById("new-item-name");

    if (isVaildItemName(newItemInput.value)) {
      let newItem = createTodoItem(nextId, newItemInput.value);

      nextId++;

      document.getElementById("main-container").appendChild(newItem);
      document.getElementById("new-item-name").value = "";
    }
  }

  function isVaildItemName(name) {
      return name.length > 0;
  }

  function removeItemCallback(id) {
    return function () {
      let elementToRemove = document.getElementById("item-bar-" + id);
      document.getElementById("main-container").removeChild(elementToRemove);
    };
  }

  function checkItemCallback(id) {
    return function () {
      let checkBtn = document.getElementById("check-btn-" + id);

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
    return function () {
      let bar = document.getElementById("item-bar-" + id);
      let input = document.getElementById("item-edit-" + id);
      let confirmBtn = document.getElementById("confirm-btn-" + id);

      if (isVaildItemName(input.value)) {
        let newTextLabel = document.createElement("label");
        newTextLabel.classList.add("item");
        newTextLabel.id = "item-label-" + id;
        newTextLabel.innerText = input.value;
        bar.replaceChild(newTextLabel, input);
  
        let editBtn = createButton(id, "edit", editItemCallback(id));
        bar.replaceChild(editBtn, confirmBtn);
      }
    };
  }

  function editItemCallback(id) {
    return function () {
      let bar = document.getElementById("item-bar-" + id);
      let label = document.getElementById("item-label-" + id);
      let editBtn = document.getElementById("edit-btn-" + id);
      let oldText = label.innerText;

      let newTextInput = document.createElement("input");
      newTextInput.type = "text";
      newTextInput.classList.add("edit");
      newTextInput.id = "item-edit-" + id;
      newTextInput.value = oldText;
      bar.replaceChild(newTextInput, label);

      let confirmBtn = createButton(
        id,
        "confirm",
        confirmItemEditCallback(id)
      );
      bar.replaceChild(confirmBtn, editBtn);
    };
  }

  document.getElementById("add-btn").onclick = addItem;
})();
