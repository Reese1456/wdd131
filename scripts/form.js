document.addEventListener('DOMContentLoaded', () => {
    
    const products = [
        { id: "p1", name: "Super Widget 3000" },
        { id: "p2", name: "Mega Gadget X" },
        { id: "p3", name: "Ultra Tool Pro" },
        { id: "p4", name: "Hyper Device Mini" }
    ];

    const productSelect = document.getElementById('productName');

    products.forEach(product => {
        const option = document.createElement('option');
        
        option.value = product.name; 

        option.textContent = product.name;
        
        productSelect.appendChild(option);
    });
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

