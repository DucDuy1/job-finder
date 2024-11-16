package JobFinder.repository;

import JobFinder.entity.Apply;
import JobFinder.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT a FROM Comment a WHERE a.content like :content ")
    Page<Comment> findByContent(@Param("content") String keyWord, Pageable pageable);

    @Query("SELECT a FROM Comment a WHERE a.job.id = :jobId")
    Page<Comment> findByJobId(@Param("jobId") Long jobId, Pageable pageable);
}
