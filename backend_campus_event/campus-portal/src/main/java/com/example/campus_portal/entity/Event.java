package com.example.campus_portal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private String eventDate;
    private String imageUrl;

    public Event() {}

    public Event(String title, String description, String location, String eventDate, String imageUrl) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.eventDate = eventDate;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public String getEventDate() { return eventDate; }
    public String getImageUrl() { return imageUrl; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setLocation(String location) { this.location = location; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}