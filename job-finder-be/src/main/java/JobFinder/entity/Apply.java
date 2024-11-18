package JobFinder.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

@Entity
@Table
@Data
@Where(clause = "is_deleted = false")
@Setter
@Getter
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileCV;
    @Column(nullable = false)
    private boolean isDeleted;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
