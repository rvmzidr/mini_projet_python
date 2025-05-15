package com.educonnect.studentmanagement.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookmarkRequest {
    
    @NotBlank
    @Size(max = 100)
    private String title;
    
    @NotBlank
    private String url;
    
    @NotBlank
    private String type; // "course" or "material"
}