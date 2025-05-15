package com.educonnect.studentmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.educonnect.studentmanagement.model.Course;
import com.educonnect.studentmanagement.model.Department;

public interface CourseRepository extends MongoRepository<Course, String> {
    
    Optional<Course> findByCourseCode(String courseCode);
    
    List<Course> findByDepartment(Department department);
    
    Boolean existsByCourseCode(String courseCode);
}