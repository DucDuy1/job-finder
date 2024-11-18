package JobFinder.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Table
@Data
@Where(clause = "is_deleted = false")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @Column(nullable = false)
    private boolean isDeleted;
    private LocalDateTime createAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
