package com.educonnect.studentmanagement.model;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "departments")
public class Department {
    
    @Id
    private String id;
    
    private String name;
    
    private String description;
    
    @DBRef
    private Set<Course> courses = new HashSet<>();
    
    // Default constructor
    public Department() {
    }
    
    // Constructor with fields
    public Department(String name, String description) {
        this.name = name;
        this.description = description;
    }
    
    // Helper methods
    public void addCourse(Course course) {
        this.courses.add(course);
    }
    
    public void removeCourse(Course course) {
        this.courses.remove(course);
    }
}