package com.educonnect.studentmanagement.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.educonnect.studentmanagement.model.Bookmark;
import com.educonnect.studentmanagement.model.Course;
import com.educonnect.studentmanagement.model.Student;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
    
    List<Bookmark> findByStudent(Student student);
    
    List<Bookmark> findByStudentAndType(Student student, String type);
    
    List<Bookmark> findByStudentAndCourse(Student student, Course course);
    
    void deleteByStudentAndId(Student student, String id);
}