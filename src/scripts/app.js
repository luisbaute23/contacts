export const url = 'http://localhost:3000/contacts';

export async function get_data (url) {
    if (typeof url != 'string')
        throw Error('url not found');
    const response = await fetch(url);
    const data = await response.json();

    return data; // retorno la promesa, esta la tomara el render
};
export const post_data = (url) => {
    const form = document.getElementById('form');

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        data.number = parseInt(data.number);
        try {
            if (document.querySelector('#id_contact').value == 0) {
                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{'Content-Type': 'application/json'}
                });
            } else {
                await put_data(url, data);   
            }
            form.reset();
            render_data();
        } catch (error) {
            console.log(error);
        }   
    };
};

export const put_data = async (url, data) => {
    if (typeof data != 'object' || typeof url != 'string')
        throw Error('not is a object');
    const url_concat = url + '/' + parseInt(data.id);

    await fetch(url_concat, {
        method:'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
};

const delete_data = async (data) => {
    data.forEach(contact => {
        const data_node = document.querySelector(`[data-dlt-id="${contact.id}"]`);
        const url_concat = url + '/' + parseInt(contact.id);

        data_node.onclick = async () => {
            await fetch(url_concat, {
                method: 'DELETE',
            });
            let remove_tr = document.querySelector('#remove_tr');
            remove_tr.remove();
        };
        const edit_data = document.querySelector(`[data-edit-id="${contact.id}"]`);

        edit_data.onclick = async () => {
            document.querySelector('#name').value = contact.name;
            document.querySelector('#lastname').value = contact.lastname;
            document.querySelector('#number').value = contact.number;
            document.querySelector('#id_contact').value = contact.id;
        };
    });
};

export async function render_data() {
    const data = await get_data(url); //tomo los datos del fectch

    const template = (contacts) => `
        <tr id="remove_tr">
            <td> ${contacts.name} </td>
            <td> ${contacts.lastname}</td>
            <td> ${contacts.number} </td>
            <td>
                <button data-edit-id="${contacts.id}">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button data-dlt-id="${contacts.id}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `;
    const contact_table = document.querySelector('#tbody');

    contact_table.innerHTML = data.map(contact => template(contact)).join('');
    delete_data(data);
};

