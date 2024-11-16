package JobFinder.service;

import JobFinder.entity.User;

public interface MailService {
    void sendEmail(String to, String subject, String body);

    void sendPasswordResetCode(User user, String code);
}
