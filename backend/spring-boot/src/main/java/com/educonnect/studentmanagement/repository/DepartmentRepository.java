package com.educonnect.studentmanagement.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.educonnect.studentmanagement.model.Department;

public interface DepartmentRepository extends MongoRepository<Department, String> {
    
    Optional<Department> findByName(String name);
    
    Boolean existsByName(String name);
}