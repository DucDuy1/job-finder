package JobFinder.dto;

import JobFinder.entity.Job;
import JobFinder.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class CommentDto {
    private Long id;
    @NotEmpty(message = "content not empty")
    private String content;
    private boolean deleted;
    private LocalDateTime createAt;
    private User user;
    private Job job;
}
