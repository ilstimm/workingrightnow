package software.project.project.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import software.project.project.component.job.Job;
import software.project.project.component.job.JobService;
import software.project.project.component.member.Condition;
import software.project.project.component.resume.Resume;
import software.project.project.component.resume.ResumeService;

@RestController
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @Autowired
    private JobService jobService;

    @GetMapping("/auth/Resumes/{userID}/{createTime}")
    public ResponseEntity<Resume> getResume(@PathVariable("userID") String userID, @PathVariable("createTime") String createTime) {
        Resume Resume = resumeService.getResume(userID, createTime);
        System.out.println(Resume);
        return ResponseEntity.ok(Resume);
    }
    @GetMapping("/auth/Resumes/getUserResumes/{userID}")
    public ResponseEntity<List<Resume>> getUserResumes(@PathVariable("userID") String userID) {
        List<Resume> Resumes = resumeService.getResumes(userID);

        return ResponseEntity.ok(Resumes);
    }
    @GetMapping("/auth/Resumes/getAllResumes/{userID}")
    public ResponseEntity<List<Resume>> getResumes(@PathVariable("userID") String userID) {
        List<Resume> Resumes = resumeService.getAllResumes(userID);

        return ResponseEntity.ok(Resumes);
    }
    
    @PostMapping("/auth/Resumes")
    public ResponseEntity<Resume> createResume(@RequestBody Resume request) {
        System.out.println("POST");
        Resume Resume = resumeService.createResume(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{user}")
                .buildAndExpand(Resume.getUserID())
                .toUri();

        return ResponseEntity.created(location).body(Resume);
    }

    @PostMapping("/auth/Resumes/replace/{userID}/{createTime}")
    public ResponseEntity<Resume> replaceResume(
            @PathVariable("userID") String userID, @PathVariable("createTime") String createTime, @RequestBody Resume request) {
        System.out.println("userID = " + userID + "\ncreateTime = " + createTime + "\n");
            Resume Resume = resumeService.replaceResume(userID, createTime, request);

        return ResponseEntity.ok(Resume);
    }

    @DeleteMapping("/auth/Resumes/{userID}/{createTime}")
    public ResponseEntity<Resume> deleteResume(@PathVariable("userID") String userID, @PathVariable("createTime") String createTime) {
        System.out.println("Delete userID = " + userID + " createTime = " + createTime);
        resumeService.deleteResume(userID, createTime);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/Resumes/changeShelvesStatus/{userID}/{createTime}")
    public void changeShelvesStatus(@PathVariable("userID") String userID, @PathVariable("createTime") String createTime){
        resumeService.changeShelvesStatus(userID, createTime);
    }

    @PostMapping("/auth/Resumes/search/{userID}")
    public ResponseEntity<List<Resume>> search(@PathVariable("userID") String userID, @RequestBody Condition searchCondition){
        List<Resume> response = resumeService.search(userID, searchCondition);
        

        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/Resumes/match/{userID}")
    public ResponseEntity<List<Resume>> match(@PathVariable("userID") String userID){
        List<Job> myJobs = jobService.getJobs(userID);
        List<Resume> matchResumes = resumeService.match(userID, myJobs);

        return ResponseEntity.ok(matchResumes);
    }
}
