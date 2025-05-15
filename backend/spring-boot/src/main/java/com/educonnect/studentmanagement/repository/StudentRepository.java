package com.educonnect.studentmanagement.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.educonnect.studentmanagement.model.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
    
    Optional<Student> findByEmail(String email);
    
    Boolean existsByEmail(String email);
}