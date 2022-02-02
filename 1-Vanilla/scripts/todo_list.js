let nextId = 0;

function createButton(id, type, cb) {
    let button = document.createElement("div");
    let icon = "&#xe145;"

    switch (type) {
        case "edit":
            icon = "&#xe3c9;"
            break;
        case "remove":
            icon = "&#xe14c;";
            break;
        default:
            break;
    }

    button.classList.add("btn");
    button.classList.add(type + "-btn");
    button.id = type + "-btn-" + id;
    button.innerHTML = "<span class=\"material-icons md-36\">" + icon + "</span>";
    button.onclick = cb;

    return button;
}

function createTodoItem(id, text) {
    let newItemContainer = document.createElement("div");
    newItemContainer.classList.add("bar");
    newItemContainer.classList.add("item-bar");
    newItemContainer.id = "item-bar-"+id;

    let newItemCheckbox = document.createElement("input");
    newItemCheckbox.type = "checkbox";
    newItemCheckbox.id = "item-checkbox-"+id;
    newItemContainer.appendChild(newItemCheckbox);

    let newItemLabel = document.createElement("label");
    newItemLabel.classList.add("item");
    newItemLabel.id = "item-label-"+id;
    newItemLabel.innerText = text;
    newItemContainer.appendChild(newItemLabel);

    let newItemEditBtn = createButton(id, "edit", getEditItemCallback(id));
    newItemContainer.appendChild(newItemEditBtn);

    let newItemRemoveBtn = createButton(id, "remove", getRemoveItemCallback(id));
    newItemContainer.appendChild(newItemRemoveBtn);

    return newItemContainer;
}

function addItem() {
    let newItemInput = document.getElementById("new-item-name");
    let newItem = createTodoItem(nextId, newItemInput.value);

    nextId++;

    document.getElementById("main-container").appendChild(newItem);
    document.getElementById("new-item-name").value = "";
}

function getRemoveItemCallback(id) {
    return function() {
        let elementToRemove = document.getElementById("item-bar-"+id);
        document.getElementById("main-container").removeChild(elementToRemove);
    }
}

function getConfirmItemEditCallback(id) {
    return function() {
        let bar = document.getElementById("item-bar-"+id);
        let input = document.getElementById("item-edit-"+id);
        let confirmBtn = document.getElementById("confirm-btn-"+id);

        let newTextLabel = document.createElement("label");
        newTextLabel.classList.add("item");
        newTextLabel.id = "item-label-"+id;
        newTextLabel.innerText = input.value;
        bar.replaceChild(newTextLabel, input);

        let editBtn = createButton(id, "edit", getEditItemCallback(id));
        bar.replaceChild(editBtn, confirmBtn);
    }
}

function getEditItemCallback(id) {
    return function() {
        let bar = document.getElementById("item-bar-"+id);
        let label = document.getElementById("item-label-"+id);
        let editBtn = document.getElementById("edit-btn-"+id);
        let oldText = label.innerText;
        
        let newTextInput = document.createElement("input");
        newTextInput.type = "text";
        newTextInput.classList.add("edit");
        newTextInput.id = "item-edit-"+id;
        newTextInput.value = oldText;
        bar.replaceChild(newTextInput, label);

        let confirmBtn = createButton(id, "confirm", getConfirmItemEditCallback(id));
        bar.replaceChild(confirmBtn, editBtn);
    }
}

window.addEventListener('load', (event) => {    
    document.getElementById("add-btn").onclick = addItem;
});