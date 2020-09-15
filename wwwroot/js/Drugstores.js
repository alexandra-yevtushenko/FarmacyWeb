
const uri = 'api/Drugstores';
let categories = [];

function getDrugstores()
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayDrugstores(data))
        .catch(error => console.error('Unable to get Drugstores.', error));
}
function addDrugstore()
{
    const addNameTextbox = document.getElementById('add-name');
    const AddAdressTextBox = document.getElementById('add-address');
    const addTelTextBox = document.getElementById('add-tel');
    const drugstore = {
        name: addNameTextbox.value.trim(),
        address: AddAdressTextBox.value.trim(),
        tel: addTelTextBox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(drugstore)
    })
        .then(response => response.json())
        .then(() =>
        {
            getDrugstores();
            addNameTextbox.value = '';
            AddAdressTextBox.value = '';
            addTelTextBox.value = '';
        })
        .catch(error => console.error('Unable to add drugstore.', error));
}

function deleteDrugstore(id)
{
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getDrugstores())
        .catch(error => console.error('Unable to delete category.', error));
}

function displayEditForm(id)
{
    const drugstore = drugstores.find(drugstore => drugstore.id === id);

    document.getElementById('edit-id').value = drugstore.id;
    document.getElementById('edit-name').value = drugstore.name;
    document.getElementById('edit-address').value = drugstore.address;
    document.getElementById('edit-tel').value = drugstore.tel;
    document.getElementById('editForm').style.display = 'block';
}

function updateDrugstore()
{
    const drugstoreId = document.getElementById('edit-id').value;
    const drugstore = {
        id: parseInt(drugstoreId, 10),
        name: document.getElementById('edit-name').value.trim(),
        address: document.getElementById('edit-address').value.trim(),
        tel: document.getElementById('edit-tel').value.trim(),
    };

    fetch(`${uri}/${drugstoreId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(drugstore)
    })
        .then(() => getDrugstores())
        .catch(error => console.error('Unable to update drugstore.', error));

    closeInput();

    return false;
}

function closeInput()
{
    document.getElementById('editForm').style.display = 'none';
}


function _displayDrugstores(data)
{
    const tBody = document.getElementById('drugstores');
    tBody.innerHTML = '';


    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-secondary');

    data.forEach(drugstore =>
    {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${drugstore.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteDrugstore(${drugstore.id})`);
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(drugstore.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeAddress = document.createTextNode(drugstore.address);
        td2.appendChild(textNodeAddress);

        let td3 = tr.insertCell(2);
        let textNodeTel = document.createTextNode(drugstore.tel);
        td3.appendChild(textNodeTel);

        let td5 = tr.insertCell(3);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(4);
        td6.appendChild(deleteButton);
    });

    drugstores = data;
}
