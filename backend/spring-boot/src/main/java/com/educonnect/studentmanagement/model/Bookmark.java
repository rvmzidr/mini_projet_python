package com.educonnect.studentmanagement.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "bookmarks")
public class Bookmark {
    
    @Id
    private String id;
    
    private String title;
    
    private String url;
    
    private String type; // "course" or "material"
    
    @DBRef
    private Student student;
    
    @DBRef
    private Course course;
    
    private LocalDateTime createdAt;
    
    // Default constructor
    public Bookmark() {
        this.createdAt = LocalDateTime.now();
    }
    
    // Constructor with fields
    public Bookmark(String title, String url, String type, Student student, Course course) {
        this.title = title;
        this.url = url;
        this.type = type;
        this.student = student;
        this.course = course;
        this.createdAt = LocalDateTime.now();
    }
}