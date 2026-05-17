package com.zosh.controller;

import com.zosh.domain.AccountStatus;
import com.zosh.exception.SellerException;
import com.zosh.model.HomeCategory;
import com.zosh.model.Seller;
import com.zosh.repository.ProductRepository;
import com.zosh.repository.UserRepository;
import com.zosh.service.ActiveUserService;
import com.zosh.service.HomeCategoryService;
import com.zosh.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final SellerService sellerService;
    private final HomeCategoryService homeCategoryService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ActiveUserService activeUserService;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(
            @PathVariable Long id,
            @PathVariable AccountStatus status) throws SellerException {

        Seller updatedSeller = sellerService.updateSellerAccountStatus(id,status);
        return ResponseEntity.ok(updatedSeller);

    }

    @GetMapping("/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory(
          ) throws Exception {

        List<HomeCategory> categories=homeCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);

    }

    @PatchMapping("/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id,
            @RequestBody HomeCategory homeCategory) throws Exception {

        HomeCategory updatedCategory=homeCategoryService.updateCategory(homeCategory,id);
        return ResponseEntity.ok(updatedCategory);

    }
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String,Object>> getDashboardStats(){

        Map<String,Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());

        data.put("onlineUsers", activeUserService.getActiveUsers());

        data.put("totalProducts", productRepository.count());

        return ResponseEntity.ok(data);
    }
}
