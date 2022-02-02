
let list = [];
let nextId = 0;

window.addEventListener('load', (event) => {
    function addItem() {
        let newItemInput = document.getElementById("new-item-name");
    
        let newItemContainer = document.createElement("div");
        newItemContainer.classList.add("bar");
        newItemContainer.classList.add("item-bar");
        newItemContainer.id = "item-bar-"+nextId;
    
        let newItemCheckbox = document.createElement("input");
        newItemCheckbox.type = "checkbox";
        newItemCheckbox.id = "item-checkbox-"+nextId;
        newItemContainer.appendChild(newItemCheckbox);
    
        let newItemLabel = document.createElement("label");
        newItemLabel.classList.add("item");
        newItemLabel.id = "item-label-"+nextId;
        newItemLabel.innerText = newItemInput.value;
        newItemContainer.appendChild(newItemLabel);
    
        let newItemEditBtn = document.createElement("div");
        newItemEditBtn.classList.add("btn");
        newItemEditBtn.classList.add("edit-btn");
        newItemEditBtn.id = "add-btn-"+nextId;
        newItemEditBtn.innerHTML = "<span class=\"material-icons md-36\">&#xe3c9;</span>";
        newItemContainer.appendChild(newItemEditBtn);
    
        let newItemRemoveBtn = document.createElement("div");
        newItemRemoveBtn.classList.add("btn");
        newItemRemoveBtn.classList.add("remove-btn");
        newItemRemoveBtn.id = "add-btn-"+nextId;
        newItemRemoveBtn.innerHTML = "<span class=\"material-icons md-36\">&#xe14c;</span>";
        newItemContainer.appendChild(newItemRemoveBtn);
    
        document.getElementById("main-container").appendChild(newItemContainer);
    }
    
    document.getElementById("add-btn").onclick = addItem;
        
});