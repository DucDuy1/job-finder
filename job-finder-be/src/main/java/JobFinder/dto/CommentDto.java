package JobFinder.dto;

import JobFinder.entity.Job;
import JobFinder.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
@Data
@Where(clause = "is_deleted = false")
public class CommentDto {
    private Long id;
    @NotEmpty(message = "content not empty")
    private String content;
    private LocalDateTime createAt;
    private User user;
    private Job job;
}
