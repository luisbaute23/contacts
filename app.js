const url = "http://localhost:3000/contacts";

const get_contacts = async () => {
    const response = await fetch(url);
    const contacts = await response.json(); 

    const template = contacts => `
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
    `
    const contact_table = document.querySelector('#tbody');
    contact_table.innerHTML = contacts.map(contact => template(contact)).join('');
	
    contacts.forEach(contact =>{
        const contact_node = document.querySelector(`[data-dlt-id="${contact.id}"]`);
        const url_concat = url + "/" + parseInt(contact.id);

        contact_node.onclick = async e => {
            await fetch(url_concat, {
                method: 'DELETE',
            })
            let remove_tr = document.querySelector('#remove_tr');
            remove_tr.remove();
        }
		
		const edit_contact = document.querySelector(`[data-edit-id="${contact.id}"]`);

		edit_contact.onclick = async e => {
			document.querySelector('#name').value = contact.name;
			document.querySelector('#lastname').value = contact.lastname;
			document.querySelector('#number').value = contact.number;
			document.querySelector('#id_contact').value = contact.id;
		}
    })
}

const create_contact = () => {
    const form = document.getElementById('form');
    form.onsubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // convertir number a numero (al crear el objeto lo guarda como string)
        data.number = parseInt(data.number); 
		
		const url_concat = url + "/" + parseInt(data.id);
		// console.log(url_concat);

        try {

			if (document.querySelector('#id_contact').value == 0){
				await fetch(url, {
					method: 'POST',
					body: JSON.stringify(data),
					headers:{'Content-Type': 'application/json'}
				});
			} else {
				await fetch(url_concat, {
					method:'PUT',
					body: JSON.stringify(data),
					headers: {'Content-Type': 'application/json'}
				})
			}
            form.reset();
            get_contacts();
            
        } catch (error) {
            
        }        
    }
}

window.onload = () => {
    create_contact();
    get_contacts();
}