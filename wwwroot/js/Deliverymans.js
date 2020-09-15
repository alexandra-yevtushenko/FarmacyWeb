
const uri = 'api/Deliverymans';
let deliverymans = [];
function getDeliverymans()
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayDeliverymans(data))
        .catch(error => console.error('Unable to get Deliverymans.', error));
}

function addDeliveryman()
{
    const addNameTextbox = document.getElementById('add-name');
    const addAgeTextbox = document.getElementById('add-age');
    const addTelephoneTextBox = document.getElementById('add-telephone');
    const addTransportTextBox = document.getElementById('add-transport');
    const medicine = {
        name: addNameTextbox.value.trim(),
        age: parseInt(addAgeTextbox.value.trim()),
        telephone: addTelephoneTextBox.value.trim(),
        transport: addTransportTextBox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    })
        .then(response => response.json())
        .then(() =>
        {
            getDeliverymans();
            addNameTextbox.value = '';
            addAgeTextbox.value = '';
            addTelephoneTextBox.value = '';
            addTransportTextBox.value = '';
        })
        .catch(error => console.error('Unable to add deliveryman.', error));
}

function deleteDeliveryman(id)
{
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getDeliverymans())
        .catch(error => console.error('Unable to delete deliveryman.', error));
}

function displayEditForm(id)
{
    const deliveryman = deliverymans.find(deliveryman => deliveryman.id === id);

    document.getElementById('edit-id').value = deliveryman.id;
    document.getElementById('edit-name').value = deliveryman.name;
    document.getElementById('edit-age').value = deliveryman.age;
    document.getElementById('edit-telephone').value = deliveryman.telephone;
    document.getElementById('edit-transport').value = deliveryman.transport;
    document.getElementById('editForm').style.display = 'block';
}

function updateDeliveryman()
{
    const deliverymanId = document.getElementById('edit-id').value;
    const category = {
        id: parseInt(deliverymanId, 10),
        name: document.getElementById('edit-name').value.trim(),
        age: parseInt(document.getElementById('edit-age').value.trim()),
        telephone: document.getElementById('edit-telephone').value.trim(),
        transport: document.getElementById('edit-transport').value.trim(),
    };

    fetch(`${uri}/${deliverymanId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(() => getDeliverymans())
        .catch(error => console.error('Unable to update deliveryman.', error));

    closeInput();

    return false;
}

function closeInput()
{
    document.getElementById('editForm').style.display = 'none';
}


function _displayDeliverymans(data)
{
    const tBody = document.getElementById('deliverymans');
    tBody.innerHTML = '';


    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-secondary');

    data.forEach(deliveryman =>
    {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${deliveryman.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteDeliveryman(${deliveryman.id})`);
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(deliveryman.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeCountry = document.createTextNode(deliveryman.age);
        td2.appendChild(textNodeCountry);

        let td3 = tr.insertCell(2);
        let textNodePrescription = document.createTextNode(deliveryman.telephone);
        td3.appendChild(textNodePrescription);


        let td4 = tr.insertCell(3);
        let textNodePrice = document.createTextNode(deliveryman.transport);
        td4.appendChild(textNodePrice);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    deliverymans = data;
}
