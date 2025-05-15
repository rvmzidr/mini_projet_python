package com.educonnect.studentmanagement.controller;

import com.educonnect.studentmanagement.model.Student;
import com.educonnect.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
      
        if (studentRepository.existsByEmail(student.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
        }
        Student saved = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
