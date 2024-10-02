class Product {
    constructor(nombre, precio, anio){
        this.nombre = nombre;
        this.precio = precio;
        this.anio = anio;
    }
}

class UI {
    addProduct(product){
        const productlist = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
         <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Producto</strong>: ${product.nombre}
                <strong>Año</strong>: ${product.anio}
                <strong>Precio: Q.</strong> ${product.precio}
                <a href="#" class="btn btn-danger" name="x">x</a>
            </div>
         </div>
        `;
        productlist.appendChild(element);  
    }

    resetForm(){
        document.getElementById('product-id').reset();
    }

    deleteProduct(element){
        if(element.name === 'x'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto Eliminado Correctamente', 'info');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 5000);
    }
}


document.getElementById('product-id')
    .addEventListener('submit', function (e) {
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const anio = document.getElementById('anio').value;

        const product = new Product(nombre, precio, anio)
        const ui = new UI();

        if(nombre === '' || precio === '' || anio === ''){
            return ui.showMessage('Complete todos los campos, Por favor', 'danger');
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Producto agregado correctamente', 'success');

        e.preventDefault();
    });

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
});