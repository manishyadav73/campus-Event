package com.example.campus_portal.controller;

import com.example.campus_portal.entity.Event;
import com.example.campus_portal.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/events")
public class EventController {

    private final EventRepository repo;

    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Event> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Event add(@RequestBody Event e) {
        return repo.save(e);
    }
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        repo.deleteById(id);
    }
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event e) {
        Event existing = repo.findById(id).orElseThrow();

        existing.setTitle(e.getTitle());
        existing.setDescription(e.getDescription());
        existing.setLocation(e.getLocation());
        existing.setEventDate(e.getEventDate());

        return repo.save(existing);
    }
}