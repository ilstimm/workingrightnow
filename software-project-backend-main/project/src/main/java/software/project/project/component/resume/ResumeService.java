package software.project.project.component.resume;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository repository;

    public Resume getResume(String user, String createTime) {
        return repository.findByUserAndCreateTime(user, createTime);
    }

    public List<Resume> getResume(String user) {
        return repository.findByUser(user);
    }

    public List<Resume> getAllResume() {
        System.out.println("YA!");
        return repository.findAll();
    }

    public Resume createResume(Resume request) {
        String time = getLocalTime();
        Resume Resume = new Resume(request.getTitle(),
                request.getName(),
                request.getSex(),
                request.getBirth(),
                request.getPhoneNumber(),
                request.getEmail(),
                request.getSchool(),
                request.getDepartment(),
                request.getStatus(),
                request.getYear(),
                request.getNature(),
                request.getType(),
                request.getTime(),
                request.getSalary(),
                request.getRegion(),
                request.getIntroduction(),
                request.getId(),
                request.getUser(),
                time,
                time);

        return repository.insert(Resume);
    }

    public Resume replaceResume(String user, String createTime, Resume request) {
        Resume oldResume = getResume(user, createTime);

        Resume Resume = new Resume(request.getTitle(),
                request.getName(),
                request.getSex(),
                request.getBirth(),
                request.getPhoneNumber(),
                request.getEmail(),
                request.getSchool(),
                request.getDepartment(),
                request.getStatus(),
                request.getYear(),
                request.getNature(),
                request.getType(),
                request.getTime(),
                request.getSalary(),
                request.getRegion(),
                request.getIntroduction(),
                oldResume.getId(),
                oldResume.getUser(),
                request.getCreateTime(),
                getLocalTime()
        // oldResume.getOrder()
        );

        return repository.save(Resume);
    }

    public void deleteResume(String user, String createTime) {
        repository.deleteByUserAndCreateTime(user, createTime);
        // for (int i = 1; i < 5; ++i) {
        // Resume oldResume = getResume(user, order + i);
        // if (oldResume == null)
        // break;
        // oldResume.setOrder(oldResume.getOrder() - 1);
        // repository.save(oldResume);
        // }
    }

    private String getLocalTime() {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
        Date currentDate = new Date();
        Instant now = currentDate.toInstant();
        ZoneId currentZone = ZoneId.systemDefault();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(now, currentZone);
        System.out.println("Local date: " + localDateTime.format(format));
        String time = localDateTime.format(format);

        return time;
    }
}