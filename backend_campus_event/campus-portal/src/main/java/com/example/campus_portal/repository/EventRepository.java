package com.example.campus_portal.repository;

import com.example.campus_portal.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}