package JobFinder.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileCV;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
