package JobFinder.repository;

import JobFinder.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT a FROM User a WHERE a.username like :username ")
    Page<User> findByUsername(@Param("username") String keyWord, Pageable pageable);

    Optional<User> findByUsername(String username);

    User findByEmail(String email);

    Page<User> findAll(Pageable pageable);
}
