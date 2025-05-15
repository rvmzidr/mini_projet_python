package com.educonnect.studentmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.educonnect.studentmanagement.model.Bookmark;
import com.educonnect.studentmanagement.payload.request.BookmarkRequest;
import com.educonnect.studentmanagement.service.BookmarkService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {
    
    @Autowired
    private BookmarkService bookmarkService;
    
    /**
     * Get all bookmarks for the authenticated student
     */
    @GetMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Bookmark>> getBookmarks(@RequestParam String studentId) {
        List<Bookmark> bookmarks = bookmarkService.getBookmarksByStudent(studentId);
        return ResponseEntity.ok(bookmarks);
    }
    
    /**
     * Get bookmarks by type for the authenticated student
     */
    @GetMapping("/type/{type}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Bookmark>> getBookmarksByType(
            @RequestParam String studentId,
            @PathVariable String type) {
        List<Bookmark> bookmarks = bookmarkService.getBookmarksByStudentAndType(studentId, type);
        return ResponseEntity.ok(bookmarks);
    }
    
    /**
     * Get bookmarks for a specific course for the authenticated student
     */
    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Bookmark>> getBookmarksByCourse(
            @RequestParam String studentId,
            @PathVariable String courseId) {
        List<Bookmark> bookmarks = bookmarkService.getBookmarksByStudentAndCourse(studentId, courseId);
        return ResponseEntity.ok(bookmarks);
    }
    
    /**
     * Create a new bookmark
     */
    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Bookmark> createBookmark(
            @RequestParam String studentId,
            @RequestParam String courseId,
            @RequestBody BookmarkRequest bookmarkRequest) {
        
        Bookmark bookmark = new Bookmark();
        bookmark.setTitle(bookmarkRequest.getTitle());
        bookmark.setUrl(bookmarkRequest.getUrl());
        bookmark.setType(bookmarkRequest.getType());
        
        Bookmark savedBookmark = bookmarkService.createBookmark(studentId, courseId, bookmark);
        return new ResponseEntity<>(savedBookmark, HttpStatus.CREATED);
    }
    
    /**
     * Delete a bookmark
     */
    @DeleteMapping("/{bookmarkId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<HttpStatus> deleteBookmark(
            @RequestParam String studentId,
            @PathVariable String bookmarkId) {
        
        bookmarkService.deleteBookmark(studentId, bookmarkId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}