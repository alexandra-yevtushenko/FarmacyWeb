
const uri = 'api/Orders';
let orders = [];

function getOrders()
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayOrders(data))
        .catch(error => console.error('Unable to get Medcines.', error));
}
/*{
    "id": 1, "medcinesInDrugstoresId": 3, "amount": 1,
        "name": "Viktoria", "tel": "380951344678",
        "email": "vk@gmail.com", "deliverymansId": 2, "date": "2020-04-22T00:00:00",
            "medcinesInDrugstores": null, "deliverymans": null
}*/
function addOrder()
{
    const addmedcinesInDrugstoresIdTextbox = document.getElementById('add-medcinesInDrugstoresId');
    const addAmountTextbox = document.getElementById('add-amount');
    const addNameTextBox = document.getElementById('add-name');
    const addTelTextBox = document.getElementById('add-tel');
    const addEmailTextBox = document.getElementById('add-email');
    const adddeliverymansIdTextBox = document.getElementById('add-deliverymansId');
    const addDateTextbox = document.getElementById('add-date');

    const order = {
        medcinesInDrugstoresId: parseInt(addmedcinesInDrugstoresIdTextbox.value.trim()),
        amount: parseInt(addAmountTextbox.value.trim()),
        name: addNameTextBox.value.trim(),
        tel: addTelTextBox.value.trim(),
        email: addEmailTextBox.value.trim(),
        deliverymansId: parseInt(adddeliverymansIdTextBox.value.trim()),
        date: addDateTextbox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(() =>
        {
            getOrders();
            addmedcinesInDrugstoresIdTextbox.value = '';
            addAmountTextbox.value = '';
            addNameTextBox.value = '';
            addTelTextBox.value = '';
            addEmailTextBox.value = '';
            adddeliverymansIdTextBox.value = '';
            addDateTextbox.value = '';
        })
        .catch(error => console.error('Unable to add order.', error));
}

function deleteOrder(id)
{
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getOrders())
        .catch(error => console.error('Unable to delete order.', error));
}

function displayEditForm(id)
{
    const order = orders.find(order => order.id === id);

    document.getElementById('edit-medcinesInDrugstoresId').value = order.medcinesInDrugstoresId;
    document.getElementById('edit-amount').value = order.amount;
    document.getElementById('edit-name').value = order.name;
    document.getElementById('edit-tel').value = order.tel;
    document.getElementById('edit-id').value = order.id;
    document.getElementById('edit-email').value = order.email;
    document.getElementById('edit-deliverymansId').value = order.deliverymansId;
    document.getElementById('edit-date').value = order.date;
    document.getElementById('editForm').style.display = 'block';
}

function updateOrder()
{
    const orderId = document.getElementById('edit-id').value;
    const category = {
        id: parseInt(orderId, 10),
        medcinesInDrugstoresId: parseInt(document.getElementById('edit-medcinesInDrugstoresId').value.trim()),
        amount: parseInt(document.getElementById('edit-amount').value.trim()),
        name: document.getElementById('edit-name').value.trim(),
        tel: document.getElementById('edit-tel').value.trim(),
        email: document.getElementById('edit-email').value.trim(),
        deliverymansId: parseInt(document.getElementById('edit-deliverymansId').value.trim()),
        date: document.getElementById('edit-date').value.trim(),
    };

    fetch(`${uri}/${orderId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(() => getOrders())
        .catch(error => console.error('Unable to update order.', error));

    closeInput();

    return false;
}

function closeInput()
{
    document.getElementById('editForm').style.display = 'none';
}


function _displayOrders(data)
{
    const tBody = document.getElementById('orders');
    tBody.innerHTML = '';


    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-secondary');

    data.forEach(order =>
    {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${order.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteOrder(${order.id})`);
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(order.medcinesInDrugstoresId);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeCountry = document.createTextNode(order.amount);
        td2.appendChild(textNodeCountry);

        let td3 = tr.insertCell(2);
        let textNodePrescription = document.createTextNode(order.name);
        td3.appendChild(textNodePrescription);


        let td4 = tr.insertCell(3);
        let textNodePrice = document.createTextNode(order.tel);
        td4.appendChild(textNodePrice);

        let td5 = tr.insertCell(4);
        let textNodePrice1 = document.createTextNode(order.email);
        td5.appendChild(textNodePrice1);

        let td6 = tr.insertCell(5);
        let textNodePrice2 = document.createTextNode(order.deliverymansId);
        td6.appendChild(textNodePrice2);

        let td7 = tr.insertCell(6);
        let textNodePrice3 = document.createTextNode(order.date);
        td7.appendChild(textNodePrice3);

        let td8 = tr.insertCell(7);
        td8.appendChild(editButton);

        let td9 = tr.insertCell(8);
        td9.appendChild(deleteButton);
    });
    console.log(data);
    orders = data;
}
