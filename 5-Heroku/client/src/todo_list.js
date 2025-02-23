import {
  createItemData,
  editItemData,
  removeItemData,
  getItems,
} from "./todo_api";
import { v4 as uuidv4 } from "uuid";
import { classes } from "./style_jss";

(function () {
  const TYPE_ITEM_INPUT = "item-input";
  const TYPE_ITEM_LABEL = "item-label";
  const TYPE_EDIT_BTN = "edit";
  const TYPE_REMOVE_BTN = "remove";
  const TYPE_CHECK_BTN = "check";
  const TYPE_CONFIRM_BTN = "confirm";

  const KEY_CODE_ENTER = 13;

  const iconMap = { edit: "&#xe3c9", remove: "&#xe14c;", check: "&#xe876;" };
  const newItemInput = document.getElementById("new-item-name");
  const addBtn = document.getElementById("add-btn");

  function createButton(type, cb) {
    const button = document.createElement("div");
    const icon = iconMap[type] || "&#xe145;";

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons", "md-36");
    iconSpan.innerHTML = icon;

    button.classList.add("btn", classes[type + "Btn"]);
    button.dataset.type = type;
    button.appendChild(iconSpan);
    button.addEventListener("click", cb);

    return button;
  }

  function createItemLabel(id, text) {
    const label = document.createElement("label");
    label.classList.add(classes.item);
    label.dataset.type = TYPE_ITEM_LABEL;
    label.innerText = text;
    label.addEventListener("dblclick", editItemCallback(id));

    return label;
  }

  function createItemInput(id, text) {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("edit");
    input.dataset.type = TYPE_ITEM_INPUT;
    input.value = text;
    input.addEventListener("keyup", confirmItemEditCallback(id));

    return input;
  }

  function createTodoItem(id, text, check) {
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar", "item-bar");
    newItemContainer.dataset.id = id;

    const newItemCheckBtn = createButton(TYPE_CHECK_BTN, checkItemCallback(id));
    newItemContainer.appendChild(newItemCheckBtn);
    setCheckButtonState(newItemCheckBtn, check);

    const newItemLabel = createItemLabel(id, text);
    newItemContainer.appendChild(newItemLabel);

    const newItemEditBtn = createButton(TYPE_EDIT_BTN, editItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    const newItemRemoveBtn = createButton(
      TYPE_REMOVE_BTN,
      removeItemCallback(id)
    );
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
  }

  function addItemCallback(event) {
    if (
      event.type === "click" ||
      (event.type === "keyup" && event.keyCode === KEY_CODE_ENTER)
    ) {
      if (isVaildItemName(newItemInput.value)) {
        const uniqueId = uuidv4();
        const newItem = createTodoItem(uniqueId, newItemInput.value, false);

        document.getElementById("main-container").appendChild(newItem);
        saveToServer(uniqueId, true);

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

  function getItemElement(id, type) {
    let element = document.querySelector(`[data-id='${id}']`);

    if (type) {
      element = element.querySelector(`[data-type='${type}']`);
    }

    return element;
  }

  const isInEditMode = (id) => getItemElement(id, TYPE_ITEM_INPUT) !== null;

  function setCheckButtonState(element, checked) {
    if (checked) {
      element.dataset.checked = "true";
      element.classList.add("checked");
    } else {
      element.dataset.checked = "false";
      element.classList.remove("checked");
    }
  }

  const getCheckButtonState = (element) => element.dataset.checked === "true";

  function removeItemCallback(id) {
    return async function () {
      if (!isInEditMode(id)) {
        const todoItem = getItemElement(id);

        document.getElementById("main-container").removeChild(todoItem);
        try {
          await removeItemData(id);
        } catch (e) {
          console.log(`error removing item on the server`, e);
          alert("Ooops, could not remove the item on the server :(");
        }
      }
    };
  }

  function checkItemCallback(id) {
    return function () {
      if (!isInEditMode(id)) {
        const checkBtn = getItemElement(id, TYPE_CHECK_BTN);

        setCheckButtonState(checkBtn, !getCheckButtonState(checkBtn));

        saveToServer(id, false);
      }
    };
  }

  function confirmItemEditCallback(id) {
    return function (event) {
      if (
        event.type === "click" ||
        (event.type === "keyup" && event.keyCode === KEY_CODE_ENTER)
      ) {
        const todoItem = getItemElement(id);
        const input = getItemElement(id, TYPE_ITEM_INPUT);
        const confirmBtn = getItemElement(id, TYPE_CONFIRM_BTN);
        const checkBtn = getItemElement(id, TYPE_CHECK_BTN);
        const removeBtn = getItemElement(id, TYPE_REMOVE_BTN);

        if (isVaildItemName(input.value)) {
          const newTextLabel = createItemLabel(id, input.value);
          todoItem.replaceChild(newTextLabel, input);

          checkBtn.classList.remove("disabled");
          removeBtn.classList.remove("disabled");

          const editBtn = createButton(TYPE_EDIT_BTN, editItemCallback(id));
          todoItem.replaceChild(editBtn, confirmBtn);

          saveToServer(id, false);
        }
      }
    };
  }

  function editItemCallback(id) {
    return function () {
      const todoItem = getItemElement(id);
      const label = getItemElement(id, TYPE_ITEM_LABEL);
      const editBtn = getItemElement(id, TYPE_EDIT_BTN);
      const checkBtn = getItemElement(id, TYPE_CHECK_BTN);
      const removeBtn = getItemElement(id, TYPE_REMOVE_BTN);
      const oldText = label.innerText;

      const newTextInput = createItemInput(id, oldText);
      todoItem.replaceChild(newTextInput, label);
      newTextInput.focus();

      checkBtn.classList.add("disabled");
      removeBtn.classList.add("disabled");

      const confirmBtn = createButton(
        TYPE_CONFIRM_BTN,
        confirmItemEditCallback(id)
      );
      todoItem.replaceChild(confirmBtn, editBtn);
    };
  }

  async function saveToServer(id, shouldCreate = true) {
    const label = getItemElement(id, TYPE_ITEM_LABEL);
    const checkBtn = getItemElement(id, TYPE_CHECK_BTN);

    const item = {
      id: id,
      text: label.innerText,
      check: getCheckButtonState(checkBtn),
    };

    if (shouldCreate) {
      try {
        await createItemData(item);
      } catch (e) {
        console.log(`error creating item on the server`, e);
        alert("Ooops, could not add the item on the server :(");
      }
    } else {
      try {
        await editItemData(item);
      } catch (e) {
        console.log(`error updating item on the server`, e);
        alert("Ooops, could not update the item on the server :(");
      }
    }
  }

  async function loadFromServer() {
    try {
      const items = await getItems();
      items.forEach((item) => {
        const newItem = createTodoItem(item["id"], item["text"], item["check"]);
        document.getElementById("main-container").appendChild(newItem);
      });
    } catch (e) {
      console.log(`error loading items from the server`, e);
      alert("Ooops, could not load items from the server :(");
    }
  }

  addBtn.addEventListener("click", addItemCallback);
  newItemInput.addEventListener("keyup", addItemCallback);

  loadFromServer();
})();
