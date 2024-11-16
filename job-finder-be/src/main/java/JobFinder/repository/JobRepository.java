package JobFinder.repository;

import JobFinder.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j WHERE "
            + "(:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) "
            + "AND (:nameCompany IS NULL OR LOWER(j.nameCompany) LIKE LOWER(CONCAT('%', :nameCompany, '%'))) "
            + "AND (:tag IS NULL OR LOWER(j.tag) LIKE LOWER(CONCAT('%', :tag, '%'))) "
            + "AND (:level IS NULL OR LOWER(j.level) LIKE LOWER(CONCAT('%', :level, '%'))) "
            + "AND (:employmentType IS NULL OR LOWER(j.employmentType) LIKE LOWER(CONCAT('%', :employmentType, '%'))) "
            + "AND (:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    Page<Job> searchJobs(
            @Param("title") String title,
            @Param("nameCompany") String nameCompany,
            @Param("tag") String tag,
            @Param("level") String level,
            @Param("employmentType") String employmentType,
            @Param("location") String location,
            Pageable pageable
    );

    @Query("SELECT a FROM Job a WHERE a.nameCompany LIKE %:keyword% OR a.location LIKE %:keyword% OR a.title LIKE %:keyword%")
    Page<Job> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT a FROM Job a WHERE a.user.id = :userId")
    Page<Job> findByUserId(@Param("userId") Long userId, Pageable pageable);
}
