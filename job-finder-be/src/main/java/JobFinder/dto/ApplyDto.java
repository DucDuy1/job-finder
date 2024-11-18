package JobFinder.dto;

import JobFinder.entity.Job;
import JobFinder.entity.User;
import lombok.Data;

@Data
public class ApplyDto {
    private Long id;
    private String fileCV;
    private boolean deleted;
    private User user;
    private Job job;
}
