package JobFinder.dto;

import JobFinder.entity.Job;
import JobFinder.entity.User;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class CommentDto {
    private Long id;
    @NotEmpty(message = "content not empty")
    private String content;
    private LocalDateTime createAt;
    private User user;
    private Job job;
}
