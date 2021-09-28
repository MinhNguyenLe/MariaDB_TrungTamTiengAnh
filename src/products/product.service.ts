import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    insertProduct(title: string, desc: string, price: number) {
        const prodID = Math.random().toString();
        const newProduct = new Product(prodID, title, desc, price);
        this.products.push(newProduct);
        return prodID;
    }
    getProducts() {
        return [...this.products];
    }
    getSingleProduct(productID: string) {
        const product = this.findProduct(productID)[0];
        return { ...product };
    }
    updateProduct(productID: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productID);
        const updateProduct = { ...product };
        if (title) {
            updateProduct.title = title;
        }
        if (desc) {
            updateProduct.description = desc;
        }
        if (price) {
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;
    }

    deteleProduct(prodID: string) {
        const index = this.findProduct(prodID)[1];
        this.products.splice(index, 1);
    }


    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id = id)
        const product = this.products[productIndex];
        if (product == null) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}