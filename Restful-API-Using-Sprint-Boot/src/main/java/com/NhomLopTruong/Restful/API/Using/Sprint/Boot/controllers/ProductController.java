/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.NhomLopTruong.Restful.API.Using.Sprint.Boot.controllers;

import com.NhomLopTruong.Restful.API.Using.Sprint.Boot.entities.Product;
import com.NhomLopTruong.Restful.API.Using.Sprint.Boot.exceptions.ResourceNotFoundException;
import com.NhomLopTruong.Restful.API.Using.Sprint.Boot.repositories.ProductRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    /**
     * Get all products List.
     *
     * @return the list
     */
    @GetMapping("/list")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Gets product by id.
     *
     * @productId the product id
     * @return the users by id
     * @throws ResourceNotFoundException
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getUserById(@PathVariable(value = "id") Long productId) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found on " + productId));
        return ResponseEntity.ok().body(product);
    }

    @PostMapping("/add")
    public Product create(@Validated @RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> update(@PathVariable(value = "id") Long productId,
            @Validated @RequestBody Product productDetails) throws ResourceNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found on " + productId));
        
        product.setCategory(productDetails.getCategory());
        product.setCondition(productDetails.getCondition());
        product.setDescription(productDetails.getDescription());
        product.setImageUrl(productDetails.getImageUrl());
        product.setManufacturer(productDetails.getManufacturer());
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        
        
        final Product updatedProduct = productRepository.save(product);
        
        return ResponseEntity.ok(updatedProduct);
        
    }
    
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> delete (@PathVariable(value = "id") Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(("Product not found on" + productId)));
        
        productRepository.delete(product);
        
        Map<String, Boolean> response = new HashMap<>();
        
        response.put("deleted", Boolean.TRUE);
        
        return response;
    }
    
   
}