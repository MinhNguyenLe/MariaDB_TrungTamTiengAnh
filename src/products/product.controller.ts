import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./product.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        const generatedID = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedID };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }
    @Get(':id')
    getProducts(@Param('id') prodID: string) {
        return this.productsService.getSingleProduct(prodID);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodID: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        this.productsService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return { success: true };
    }

    @Delete(':id')
    removeProduct(@Param('id') prodID: string){
        this.productsService.deteleProduct(prodID);
        return { success: true };
    }
}