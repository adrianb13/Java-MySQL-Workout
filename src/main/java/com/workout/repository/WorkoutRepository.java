package com.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workout.entity.Step;

public interface WorkoutRepository extends JpaRepository<Step, Integer>{

}
