package com.educonnect.studentmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.educonnect.studentmanagement.model.Bookmark;
import com.educonnect.studentmanagement.model.Course;
import com.educonnect.studentmanagement.model.Student;
import com.educonnect.studentmanagement.repository.BookmarkRepository;
import com.educonnect.studentmanagement.repository.CourseRepository;
import com.educonnect.studentmanagement.repository.StudentRepository;

@Service
public class BookmarkService {
    
    @Autowired
    private BookmarkRepository bookmarkRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    /**
     * Get all bookmarks for a student
     * Uses Redis cache to optimize read access
     */
    @Cacheable(value = "bookmarks", key = "#studentId")
    public List<Bookmark> getBookmarksByStudent(String studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (!studentOpt.isPresent()) {
            throw new RuntimeException("Student not found");
        }
        return bookmarkRepository.findByStudent(studentOpt.get());
    }
    
    /**
     * Get bookmarks by type for a student
     */
    @Cacheable(value = "bookmarksByType", key = "{#studentId, #type}")
    public List<Bookmark> getBookmarksByStudentAndType(String studentId, String type) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (!studentOpt.isPresent()) {
            throw new RuntimeException("Student not found");
        }
        return bookmarkRepository.findByStudentAndType(studentOpt.get(), type);
    }
    
    /**
     * Get bookmarks for a specific course for a student
     */
    @Cacheable(value = "bookmarksByCourse", key = "{#studentId, #courseId}")
    public List<Bookmark> getBookmarksByStudentAndCourse(String studentId, String courseId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (!studentOpt.isPresent()) {
            throw new RuntimeException("Student not found");
        }
        
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            throw new RuntimeException("Course not found");
        }
        
        return bookmarkRepository.findByStudentAndCourse(studentOpt.get(), courseOpt.get());
    }
    
    /**
     * Create a new bookmark
     * Evicts the cache to ensure data consistency
     */
    @CacheEvict(value = {"bookmarks", "bookmarksByType", "bookmarksByCourse"}, key = "#studentId")
    public Bookmark createBookmark(String studentId, String courseId, Bookmark bookmark) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (!studentOpt.isPresent()) {
            throw new RuntimeException("Student not found");
        }
        
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            throw new RuntimeException("Course not found");
        }
        
        bookmark.setStudent(studentOpt.get());
        bookmark.setCourse(courseOpt.get());
        
        return bookmarkRepository.save(bookmark);
    }
    
    /**
     * Delete a bookmark
     * Evicts the cache to ensure data consistency
     */
    @CacheEvict(value = {"bookmarks", "bookmarksByType", "bookmarksByCourse"}, key = "#studentId")
    public void deleteBookmark(String studentId, String bookmarkId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (!studentOpt.isPresent()) {
            throw new RuntimeException("Student not found");
        }
        
        Optional<Bookmark> bookmarkOpt = bookmarkRepository.findById(bookmarkId);
        if (!bookmarkOpt.isPresent()) {
            throw new RuntimeException("Bookmark not found");
        }
        
        // Ensure the bookmark belongs to the student
        if (!bookmarkOpt.get().getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized access to bookmark");
        }
        
        bookmarkRepository.deleteById(bookmarkId);
    }
}