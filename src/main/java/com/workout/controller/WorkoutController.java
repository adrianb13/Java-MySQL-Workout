package com.workout.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workout.entity.Step;
import com.workout.repository.WorkoutRepository;

import javassist.tools.web.BadHttpRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class WorkoutController {

	@Autowired
	WorkoutRepository workoutRepository;
	
	@GetMapping(path = "/steps")
	public List<Step> getAllSteps(){
		List<Step> steps = new ArrayList();
		workoutRepository.findAll().forEach(steps :: add);
		return steps;
	}
	
	@PostMapping(path = "/steps")
	public Step addStep(@RequestBody Step step) {
		workoutRepository.save(step);
		return step;
	}
	
	@PutMapping(path = "/steps/{id}")
  public Step update(@PathVariable int id, @RequestBody Step step) throws BadHttpRequest {
      if (workoutRepository.existsById(id)) {
          return workoutRepository.save(step);
      } else {
          throw new BadHttpRequest();
      }
  }
	
	@DeleteMapping(path = "steps/{id}")
	public void deleteStep(@PathVariable int id) {
		workoutRepository.deleteById(id);
	}
}
