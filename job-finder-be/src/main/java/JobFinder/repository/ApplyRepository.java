package JobFinder.repository;

import JobFinder.entity.Apply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplyRepository extends JpaRepository<Apply, Long> {
    @Query("SELECT a FROM Apply a WHERE a.fileCV like :fileCV ")
    Page<Apply> findByFileCV(@Param("fileCV") String keyWord, Pageable pageable);

    @Query("SELECT a FROM Apply a WHERE a.user.id = :userId")
    Page<Apply> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT a FROM Apply a WHERE a.job.id = :jobId")
    Page<Apply> findByJobId(@Param("jobId") Long jobId, Pageable pageable);

    @Query("SELECT a.job.id,  a.job.title, COUNT(a.user.id) FROM Apply a GROUP BY a.job.id, a.job.title")
    List<Object[]> countUsersForEachJob();
}
