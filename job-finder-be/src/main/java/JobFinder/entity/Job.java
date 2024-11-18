package JobFinder.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Where;

import java.util.Date;

@Entity
@Table
@Data
@Where(clause = "is_deleted = false")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameCompany;
    private String level;
    private String employmentType;
    private String title;
    @Column(length = 2000)
    private String description;
    private String imageUrl;
    @Column(nullable = false)
    private boolean isDeleted;
    private Date applicationDeadline;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    private String tag;
    private String location;
}
