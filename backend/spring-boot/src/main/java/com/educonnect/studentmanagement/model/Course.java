package com.educonnect.studentmanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "courses")
public class Course {
    
    @Id
    private String id;
    
    private String title;
    
    private String description;
    
    private String courseCode;
    
    private int credits;
    
    @DBRef
    private Department department;
    
    // Default constructor
    public Course() {
    }
    
    // Constructor with fields
    public Course(String title, String description, String courseCode, int credits) {
        this.title = title;
        this.description = description;
        this.courseCode = courseCode;
        this.credits = credits;
    }
}