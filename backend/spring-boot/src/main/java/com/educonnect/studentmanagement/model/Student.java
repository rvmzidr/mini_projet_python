package com.educonnect.studentmanagement.model;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "students")
public class Student {
    
    @Id
    private String id;
    
    private String firstName;
    
    private String lastName;
    
    private String email;
    
    private String password;
    
    @DBRef
    private Department department; // يمكن أن يبقى كما هو، فقط لا ترسله من الـ frontend
    
    @DBRef
    private Set<Course> enrolledCourses = new HashSet<>();
    
    private Set<String> roles = new HashSet<>();
    
    // Default constructor
    public Student() {
    }
    
    // Constructor with fields
    public Student(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    
    // Helper methods
    public void enrollInCourse(Course course) {
        this.enrolledCourses.add(course);
    }
    
    public void withdrawFromCourse(Course course) {
        this.enrolledCourses.remove(course);
    }
}