package JobFinder.repository;

import JobFinder.entity.Otp;
import JobFinder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Otp findByUser(User user);
}
